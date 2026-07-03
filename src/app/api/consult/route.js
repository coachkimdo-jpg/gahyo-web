import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, phone, totalPrice, estimateDetails } = await request.json();

    if (!name || !phone) {
      return NextResponse.json({ error: '상주명과 연락처는 필수입니다.' }, { status: 400 });
    }

    // SMTP Configuration from Environment Variables
    // The user needs to set SMTP_USER and SMTP_PASS in .env.local
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.naver.com',
      port: process.env.SMTP_PORT || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // We can also allow them to use Gmail if they set SMTP_HOST=smtp.gmail.com.
    // If credentials are not set, we'll just log it for now to prevent crashing in dev.
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('SMTP credentials are not configured in .env.local. Logging the email instead of sending.');
      console.log('--- NEW CONSULTATION REQUEST ---');
      console.log(`Name: ${name}`);
      console.log(`Phone: ${phone}`);
      console.log(`Total Price: ${totalPrice.toLocaleString()}원`);
      console.log('Details:', estimateDetails);
      console.log('--------------------------------');
      
      // We still return success so the frontend UI works during development
      return NextResponse.json({ message: '상담 신청이 접수되었습니다. (단, 서버 이메일 설정 누락으로 실제 발송은 되지 않음)' });
    }

    // Prepare the HTML content
    const htmlContent = `
      <div style="font-family: 'Malgun Gothic', sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #1e3a8a; border-bottom: 2px solid #fbbf24; padding-bottom: 10px;">새로운 맞춤 견적 상담 신청이 접수되었습니다.</h2>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>상주명 (고객명):</strong> <span style="font-size: 1.1em; color: #1e293b;">${name}</span></p>
          <p style="margin: 5px 0;"><strong>연락처:</strong> <span style="font-size: 1.1em; color: #1e293b;">${phone}</span></p>
        </div>

        <h3 style="color: #475569; margin-top: 30px;">견적 상세 내역</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tbody>
            ${estimateDetails.map(item => `
              <tr style="border-bottom: 1px dashed #cbd5e1;">
                <td style="padding: 10px 5px; font-weight: bold; color: #334155; width: 30%;">${item.category}</td>
                <td style="padding: 10px 5px; color: #64748b;">${item.name}</td>
                <td style="padding: 10px 5px; text-align: right; font-weight: bold; color: #1e3a8a;">
                  ${item.price > 0 ? '+' + item.price.toLocaleString() + '원' : '0원'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 20px; padding: 15px; background-color: #f1f5f9; border-radius: 8px; text-align: right;">
          <strong style="font-size: 1.1em; color: #475569;">총 확정 금액: </strong>
          <span style="font-size: 1.5em; font-weight: bold; color: #1e3a8a;">${totalPrice.toLocaleString()}원</span>
        </div>
        
        <p style="color: #94a3b8; font-size: 12px; margin-top: 30px; text-align: center;">본 메일은 가효 웹사이트에서 자동 발송되었습니다.</p>
      </div>
    `;

    // Send Mail
    await transporter.sendMail({
      from: `"가효 맞춤견적" <${process.env.SMTP_USER}>`, // sender address
      to: 'gahyofuneral@naver.com', // list of receivers
      subject: `[가효] ${name}님의 맞춤 견적 상담 신청이 접수되었습니다.`, // Subject line
      html: htmlContent, // html body
    });

    return NextResponse.json({ message: '상담 신청이 성공적으로 전송되었습니다.' });

  } catch (error) {
    console.error('Error sending consult email:', error);
    return NextResponse.json({ error: '상담 신청 전송 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
