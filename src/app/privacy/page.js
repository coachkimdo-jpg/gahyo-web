export const metadata = {
  title: '개인정보처리방침 | 가효상조',
  description: '가효상조 개인정보처리방침 안내',
};

export default function PrivacyPage() {
  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', padding: '4rem 1.25rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: '800', marginBottom: '1rem' }}>개인정보처리방침</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            가효상조는 고객님의 개인정보를 소중하게 생각하며, 안전하게 보호하고 있습니다.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.25rem', maxWidth: '800px' }}>
        <div style={{ background: 'white', padding: '3rem 2rem', borderRadius: '12px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', lineHeight: 1.8 }}>
          
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            1. 개인정보의 수집 및 이용 목적
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            가효상조는 장례 행사 이행, 정산, 그리고 원활한 고객 상담을 위해 필수적인 최소한의 개인정보만을 수집합니다.<br/>
            - <strong>필수:</strong> 장례 서비스 제공(행사 이행), 계약 체결 및 요금 정산, 고객 식별, 세금계산서 발행 및 환불 처리<br/>
            - <strong>선택:</strong> 서비스 만족도 조사 및 사후 안내
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            2. 수집하는 개인정보 항목
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            - <strong>필수 항목:</strong> 계약자 성명, 연락처, 고인과의 관계, 주소(세금계산서 발행 및 환불 처리 필요 시), 고인 성명, 사망일시<br/>
            - <strong>선택 항목:</strong> 사후 관리 안내를 위한 성명, 연락처
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            3. 개인정보의 보유 및 이용기간
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            가효상조는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 일정한 기간 동안 개인정보를 보관합니다.<br/>
            - 계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)<br/>
            - 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자보호에 관한 법률)<br/>
            - 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자보호에 관한 법률)
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            4. 개인정보의 제3자 제공
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            회사는 고객님의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 장례 서비스 이행을 위해 필수적인 경우 아래와 같이 제3자에게 제공하고 있습니다.
          </p>
          <div style={{ marginBottom: '2rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>제공받는 자:</strong> 장례식장, 화장장, 봉안시설, 장지 시설, 운송업체, 주식회사 오늘라이프상조(결제업체)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>제공 목적:</strong> 장례식장 시설 이용, 화장장 및 봉안시설 예약 대행, 고인 및 유족 운송 서비스, 서비스 비용 결제 대행</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>제공 항목:</strong> 고인 성명, 계약자 성명 및 연락처, 사망일시</li>
              <li><strong>보유 및 이용 기간:</strong> 제공처별 제공 목적 달성 시까지</li>
            </ul>
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            5. 개인정보 파기절차 및 방법
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다.<br/>
            - <strong>파기절차:</strong> 수집된 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.<br/>
            - <strong>파기방법:</strong> 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기하며, 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            6. 이용자의 권리와 그 행사방법
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 동의 철회를 요청할 수도 있습니다. 개인정보 관리책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다. 회사는 이용자의 요청에 의해 해지 또는 삭제된 개인정보는 "3. 개인정보의 보유 및 이용기간"에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
          </p>

          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
            7. 개인정보 보호책임자 및 담당자
          </h2>
          <p style={{ marginBottom: '0' }}>
            가효상조는 고객의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보 관리책임자를 지정하고 있습니다.<br/><br/>
            - 상호: (주)가효상조<br/>
            - 대표번호: 1551-5718<br/>
            - 이메일: gahyofuneral@naver.com
          </p>

        </div>
      </div>
    </>
  );
}
