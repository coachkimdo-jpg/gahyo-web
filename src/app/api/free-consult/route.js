import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, phone, region, situation, agreed } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: '성함과 연락처는 필수입니다.' }, { status: 400 });
    }
    if (!agreed) {
      return NextResponse.json({ error: '이용약관에 동의해 주세요.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.naver.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('[free-consult] SMTP 미설정 — 콘솔 출력으로 대체');
      console.log({ name, phone, region, situation });
      return NextResponse.json({ message: '상담 신청이 접수되었습니다.' });
    }

    const htmlContent = `
      <div style="font-family:'Malgun Gothic',sans-serif;padding:24px;max-width:560px;margin:0 auto;border:1px solid #e2e8f0;border-radius:10px;color:#1e293b;">
        <h2 style="color:#002C5F;border-bottom:3px solid #C9A84C;padding-bottom:10px;margin-bottom:20px;">
          📋 가효상조 무료 상담 신청
        </h2>

        <table style="width:100%;border-collapse:collapse;font-size:15px;">
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:12px 8px;font-weight:700;color:#475569;width:35%;">성함</td>
            <td style="padding:12px 8px;font-weight:700;font-size:16px;">${name}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:12px 8px;font-weight:700;color:#475569;">연락처</td>
            <td style="padding:12px 8px;font-weight:700;font-size:16px;">${phone}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:12px 8px;font-weight:700;color:#475569;">예상 장례지역</td>
            <td style="padding:12px 8px;">${region || '미선택'}</td>
          </tr>
          <tr>
            <td style="padding:12px 8px;font-weight:700;color:#475569;">장례 준비 상황</td>
            <td style="padding:12px 8px;">${situation || '미선택'}</td>
          </tr>
        </table>

        <div style="margin-top:24px;padding:14px;background:#f1f5f9;border-radius:8px;font-size:13px;color:#64748b;text-align:center;">
          이 메일은 가효상조 웹사이트에서 자동 발송되었습니다.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"가효상조 상담신청" <${process.env.SMTP_USER}>`,
      to: 'gahyofuneral@naver.com',
      subject: `[가효상조] ${name}님 무료 상담 신청`,
      html: htmlContent,
    });

    return NextResponse.json({ message: '상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.' });

  } catch (error) {
    console.error('[free-consult] 이메일 발송 오류:', error);
    return NextResponse.json({ error: '신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' }, { status: 500 });
  }
}
