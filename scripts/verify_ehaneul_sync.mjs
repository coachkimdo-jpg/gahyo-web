/**
 * e하늘 JSONL ↔ 가효상조 DB 일치 검증 스크립트
 * 실행: node scripts/verify_ehaneul_sync.mjs
 * 결과: scripts/verify_report.json 생성
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── 경로 설정 ──────────────────────────────────────────────
const PATHS = {
  ossuary: {
    jsonl:      'C:\\Users\\PC\\Documents\\봉안당\\ehaneul_ossuary_facilities.jsonl',
    priceJsonl: 'C:\\Users\\PC\\Documents\\봉안당\\ehaneul_ossuary_price_items.jsonl',
    json:       path.join(ROOT, 'src', 'lib', 'ossuaries.json'),
    label:      '봉안시설',
    idExtract:  (item) => String(item.id),             // JSON id = facilitycd 그대로
    phoneField: (item) => item.phone,
  },
  graveyard: {
    jsonl:      'C:\\Users\\PC\\Documents\\묘지\\ehaneul_cemetery_facilities.jsonl',
    priceJsonl: 'C:\\Users\\PC\\Documents\\묘지\\ehaneul_cemetery_price_items.jsonl',
    json:       path.join(ROOT, 'src', 'lib', 'graveyards.json'),
    label:      '묘지',
    idExtract:  (item) => String(item.id),
    phoneField: (item) => item.phone,
  },
  natural: {
    jsonl:      'C:\\Users\\PC\\Documents\\자연장지\\ehaneul_natural_burial_facilities.jsonl',
    priceJsonl: 'C:\\Users\\PC\\Documents\\자연장지\\ehaneul_natural_burial_price_items.jsonl',
    json:       path.join(ROOT, 'src', 'lib', 'naturalBurials.json'),
    label:      '자연장지',
    idExtract:  (item) => String(item.id),
    phoneField: (item) => item.phone,
  },
  hall: {
    jsonl:      'C:\\Users\\PC\\Documents\\ehaneul_funeral_facilities_fixed.jsonl',
    priceJsonl: 'C:\\Users\\PC\\Documents\\ehaneul_funeral_price_items.jsonl',
    json:       path.join(ROOT, 'src', 'lib', 'realData.json'),
    label:      '장례식장',
    // realData id 형태: "slug-7000001011" → 마지막 숫자 추출
    idExtract:  (item) => { const m = String(item.id).match(/(\d+)$/); return m ? m[1] : String(item.id); },
    phoneField: (item) => item.contact,
  },
};

const report = { generatedAt: new Date().toISOString(), results: {} };

// ── 가격 JSONL 읽기 ───────────────────────────────────────
function loadPriceMap(jsonlPath) {
  const priceMap = {};
  if (!fs.existsSync(jsonlPath)) return priceMap;
  const lines = fs.readFileSync(jsonlPath, 'utf8').split('\n').filter(Boolean);
  for (const line of lines) {
    try {
      const d = JSON.parse(line);
      const fcd = String(d.facilitycd);
      if (!priceMap[fcd]) priceMap[fcd] = [];
      const price = parseInt(String(d.price).replace(/,/g, ''), 10);
      if (d.item_type && price > 0) {
        priceMap[fcd].push({ location: d.item_type.trim(), price });
      }
    } catch { /* skip */ }
  }
  return priceMap;
}

for (const [key, cfg] of Object.entries(PATHS)) {
  console.log(`\n🔍 ${cfg.label} 검증 중...`);

  if (!fs.existsSync(cfg.jsonl)) {
    console.log(`  ⚠️  JSONL 없음: ${cfg.jsonl}`);
    report.results[key] = { error: 'JSONL 파일 없음' };
    continue;
  }

  // JSONL 파싱
  const jsonlLines = fs.readFileSync(cfg.jsonl, 'utf8').split('\n').filter(Boolean);
  const jsonlMap = {};
  for (const line of jsonlLines) {
    try {
      const d = JSON.parse(line);
      if (d.facilitycd) jsonlMap[String(d.facilitycd)] = d;
    } catch { /* skip */ }
  }

  // 가격 맵
  const priceMap = loadPriceMap(cfg.priceJsonl);

  // 현재 JSON DB
  const dbItems = JSON.parse(fs.readFileSync(cfg.json, 'utf8'));
  const dbMap = {};
  for (const item of dbItems) {
    const extractedId = cfg.idExtract(item);
    dbMap[extractedId] = item;
  }

  const jsonlIds = new Set(Object.keys(jsonlMap));
  const dbIds = new Set(Object.keys(dbMap));

  // ① DB에는 없는데 JSONL에는 있는 시설 (누락)
  const missingInDb = [...jsonlIds].filter(id => !dbIds.has(id));

  // ② JSONL에는 없는데 DB에는 있는 시설 (초과)
  const extraInDb = [...dbIds].filter(id => !jsonlIds.has(id));

  // ③ 전화번호 불일치
  const phoneMismatch = [];
  for (const id of jsonlIds) {
    if (!dbMap[id]) continue;
    const jsonlPhone = (jsonlMap[id].phone || '').trim().replace(/\s+/g, '');
    const dbPhone   = (cfg.phoneField(dbMap[id]) || '').trim().replace(/\s+/g, '');
    if (jsonlPhone && dbPhone && jsonlPhone !== dbPhone) {
      phoneMismatch.push({ id, name: dbMap[id].name, jsonl: jsonlPhone, db: dbPhone });
    }
  }

  // ④ 주소 불일치 (50자 이상 차이가 있는 경우)
  const addressMismatch = [];
  for (const id of jsonlIds) {
    if (!dbMap[id]) continue;
    const jsonlAddr = (jsonlMap[id].address || '').trim();
    const dbAddr    = (dbMap[id].address   || '').trim();
    if (jsonlAddr && dbAddr && jsonlAddr !== dbAddr) {
      addressMismatch.push({ id, name: dbMap[id].name, jsonl: jsonlAddr, db: dbAddr });
    }
  }

  // ⑤ 가격 불일치 (JSONL price_items vs DB priceItems)
  const priceMismatch = [];
  for (const id of dbIds) {
    const jsonlPrices = priceMap[id] || [];
    const dbPrices    = (dbMap[id]?.priceItems || []);

    const jsonlTotal = jsonlPrices.reduce((s, p) => s + p.price, 0);
    const dbTotal    = dbPrices.reduce((s, p) => s + p.price, 0);

    if (jsonlPrices.length > 0 && dbPrices.length > 0 && jsonlTotal !== dbTotal) {
      priceMismatch.push({
        id,
        name: dbMap[id].name,
        jsonlItemCount: jsonlPrices.length,
        dbItemCount: dbPrices.length,
        jsonlPriceSum: jsonlTotal,
        dbPriceSum: dbTotal,
      });
    }
  }

  const result = {
    jsonlCount: jsonlIds.size,
    dbCount:    dbIds.size,
    missingInDb:     { count: missingInDb.length,     items: missingInDb.slice(0, 20).map(id => ({ id, name: jsonlMap[id]?.facility_name || jsonlMap[id]?.name })) },
    extraInDb:       { count: extraInDb.length,       items: extraInDb.slice(0, 10) },
    phoneMismatch:   { count: phoneMismatch.length,   items: phoneMismatch.slice(0, 20) },
    addressMismatch: { count: addressMismatch.length, items: addressMismatch.slice(0, 20) },
    priceMismatch:   { count: priceMismatch.length,   items: priceMismatch.slice(0, 20) },
  };

  report.results[key] = result;

  // 콘솔 요약
  console.log(`  📦 JSONL 시설 수:  ${result.jsonlCount}`);
  console.log(`  🗄️  DB 시설 수:    ${result.dbCount}`);
  console.log(`  ❌ DB 누락 시설:   ${result.missingInDb.count}개`);
  console.log(`  ➕ DB 초과 시설:   ${result.extraInDb.count}개`);
  console.log(`  📞 전화번호 불일치: ${result.phoneMismatch.count}개`);
  console.log(`  📍 주소 불일치:    ${result.addressMismatch.count}개`);
  console.log(`  💰 가격 불일치:    ${result.priceMismatch.count}개`);

  if (result.missingInDb.count > 0) {
    console.log(`\n  ⚠️  DB 누락 시설 (상위 5개):`);
    result.missingInDb.items.slice(0, 5).forEach(i => console.log(`     - [${i.id}] ${i.name}`));
  }
  if (result.phoneMismatch.count > 0) {
    console.log(`\n  ⚠️  전화번호 불일치 (상위 3개):`);
    result.phoneMismatch.items.slice(0, 3).forEach(i =>
      console.log(`     - ${i.name}: JSONL(${i.jsonl}) vs DB(${i.db})`)
    );
  }
}

// 리포트 저장
const reportPath = path.join(__dirname, 'verify_report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\n✅ 검증 완료. 리포트: scripts/verify_report.json`);
