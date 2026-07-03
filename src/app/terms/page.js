export const metadata = {
  title: '이용약관 | 가효상조',
  description: '가효상조 후불제 상조 서비스 이용약관 안내',
};

export default function TermsPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', padding: '4rem 1.25rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', marginBottom: '1rem' }}>이용약관</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            가효상조 후불제 상조 서비스 이용 조건 및 절차 안내
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.25rem', maxWidth: '800px' }}>
        <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', lineHeight: 1.8 }}>
          
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            제1조 (계약의 목적 및 당사자)
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            본 약관은 가효상조(이하 '회사' 또는 '갑')가 이용자(이하 '이용자' 또는 '을')에게 제공하는 후불제 상조서비스의 이용조건 및 절차를 규정함에 목적이 있습니다. '의사결정 대표자'는 장례 현장에서 '을'을 대리하여 서비스 변경 및 추가 비용을 승인할 권한을 가집니다.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            제2조 (불포함 비용 및 결제)
          </h2>
          <ol style={{ marginBottom: '2rem', paddingLeft: '1.25rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>본 상품은 선납금 없는 후불제이며, 발인 전 최종 정산내역 확인 후 결제합니다.</li>
            <li>불포함 항목: 장례식장 이용료(빈소, 안치실 등), 조문객 식대, 화장 수수료, 제단 생화, 장지 비용 등 외부 시설 이용료는 '을'이 해당 시설에 직접 결제해야 합니다.</li>
          </ol>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            제3조 (서비스 범위 및 추가 승인)
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            '갑'은 회사에서 고지한 상품별 규격과 수량을 준수합니다. 명시되지 않은 추가 서비스는 사전 단가 고지 및 '을'(또는 대표자)의 객관적 승인(문자, 서명 등)이 있는 경우에만 청구할 수 있습니다. 사전 고지 및 객관적 승인 없는 항목은 청구할 수 없습니다.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            제4조 (계약 해지 및 정산 기준)
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            중도 해지 시 '갑'은 실제 투입된 원가를 정산하며, 최종 정산 시 또는 '을'의 요청 시 지체 없이 서면, 운행일지, 사진 등 객관적 산출근거를 제시합니다.
          </p>
          <ul style={{ marginBottom: '2rem', paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong>1단계 (출동 전):</strong> 위약금 없음.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>2단계 (배차·출동 후):</strong> 차량 및 인력 실비 청구.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>3단계 (용품 개봉 후):</strong> 인건비 및 재사용 불가 용품 실비 청구.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong>4단계 (입관 후):</strong> 주요 용품(관, 수의 등) 투입 완료에 따라 실제 발생 원가를 정산하되, 그 금액은 계약금액의 80%를 초과하지 않음.</li>
            <li><strong>5단계 (발인 후):</strong> 전액 청구(단, 미제공 항목 공제).</li>
          </ul>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            제5조 (개인정보 처리 상세 고지)
          </h2>
          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ marginBottom: '0.75rem' }}><strong>[필수] 수집목적/항목:</strong><br />행사 이행 및 정산용 (성명, 연락처, 관계, 주소(세금계산서 발행·환불 처리 필요 시) 등).</p>
            <p style={{ marginBottom: '0.75rem' }}><strong>[필수] 제3자 제공처별 목적:</strong><br />장례식장(시설 이용), 화장장·봉안시설(예약 대행), 운송업체(운송 서비스), 결제업체(주식회사 오늘라이프상조).</p>
            <p style={{ marginBottom: '0.75rem' }}><strong>[필수] 제3자 제공항목/보유기간:</strong><br />고인 성명, 계약자 성명/연락처, 사망일시 등 정보. 제공처별 제공 목적 달성 시까지 보관.</p>
            <p style={{ marginBottom: '0' }}><strong>[선택] 사후 관리 고지:</strong><br />만족도 조사 및 사후 안내 목적으로 성명, 연락처를 수집하며 목적 달성 후 즉시 파기합니다. 동의 거부 시에도 서비스 이용에 불이익이 없습니다.</p>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            제6조 (기타 보충 규정)
          </h2>
          <ol style={{ marginBottom: '1rem', paddingLeft: '1.25rem' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>기준지:</strong> 앰뷸런스의 거리 산정 기준은 고인의 임종 장소로 하며, 장의버스 및 리무진의 거리 산정 기준은 장례식장으로 합니다. 차량 제공 거리 및 초과 비용은 사전에 안내된 기준에 따르며, 관외는 각 기준지의 행정구역 외 지역을 의미합니다.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>품질보증:</strong> 계약보다 낮은 품질의 용품 또는 서비스가 제공된 경우, '갑'은 동급 교환 또는 차액 환급을 이행합니다.
            </li>
            <li>
              <strong>분쟁해결:</strong> 분쟁이 발생할 경우 1372 소비자상담센터를 통해 상담 및 분쟁조정 절차를 안내받을 수 있으며, 소송 시 이용자 주소지 관할법원을 따릅니다.
            </li>
          </ol>

        </div>
      </div>
    </>
  );
}
