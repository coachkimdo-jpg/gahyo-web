// 관리자 페이지 — 검색엔진 색인 완전 차단
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return children;
}
