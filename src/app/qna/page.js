'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const maskName = (name) => {
  if (!name || name.length < 2) return name;
  if (name.length === 2) return name[0] + '*';
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
};

export default function QnaPage() {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'write', 'detail'
  const [selectedPost, setSelectedPost] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  
  // Write form state
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);

  // Fetch data from API
  useEffect(() => {
    fetch('/api/qna')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to load posts:', err));
  }, [view]);

  const handleWriteSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !password || !content) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    const newPost = { title, author, email, phone, password, content, isSecret };
    
    try {
      const res = await fetch('/api/qna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      
      if (res.ok) {
        // NAVER 상담신청 완료(lead) 전환 이벤트
        try {
          if (window.wcs) {
            if (!window.wcs_add) window.wcs_add = {};
            window.wcs_add['wa'] = 's_4f49c7e0fd2c';
            window.wcs.trans({ type: 'lead' });
          }
        } catch (e) {}
        setTitle(''); setAuthor(''); setEmail(''); setPhone(''); setPassword(''); setContent(''); setIsSecret(false);
        alert('문의글이 성공적으로 등록되었습니다.');
        setView('list');
      } else {
        alert('등록에 실패했습니다.');
      }
    } catch (err) {
      alert('오류가 발생했습니다.');
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    if (post.isSecret) {
      const input = prompt('비밀글입니다. 비밀번호를 입력해주세요.');
      if (input === post.password) {
        setView('detail');
      } else if (input !== null) {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } else {
      setView('detail');
    }
  };

  return (
    <div style={{ background: 'var(--gray-bg)', minHeight: '100vh', padding: '4rem 1rem 6rem' }}>
      <div className="container" style={{ maxWidth: '800px', background: 'white', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--navy)' }}>고객 문의/상담</h1>
          <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>가효상조에 궁금한 점을 남겨주시면 성심성의껏 답변해 드립니다.</p>
        </div>

        {view === 'list' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontWeight: '700', color: '#4b5563' }}>전체 {posts.length}건</div>
              <button 
                onClick={() => setView('write')}
                className="btn-primary" 
                style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', borderRadius: '0.5rem' }}
              >
                ✏️ 문의글 작성하기
              </button>
            </div>

            <style>{`
              .qna-grid { display: grid; grid-template-columns: 60px 1fr 100px 100px; padding: 1rem 0; align-items: center; }
              .qna-header { border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #4b5563; text-align: center; }
              .qna-row { border-bottom: 1px solid #e5e7eb; text-align: center; cursor: pointer; transition: background 0.2s; }
              .qna-row:hover { background: #f9fafb; }
              .qna-title { text-align: left; padding-left: 1rem; font-weight: 600; color: #1a1a2e; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
              .qna-mobile-meta { display: none; }
              @media (max-width: 600px) {
                .qna-grid { grid-template-columns: 1fr; padding: 1rem 0.5rem; gap: 0.5rem; text-align: left; }
                .qna-header { display: none; }
                .qna-id { display: none; }
                .qna-desktop-meta { display: none; }
                .qna-mobile-meta { display: flex; gap: 1rem; font-size: 0.85rem; color: #4b5563; margin-top: 0.25rem; }
                .qna-title { padding-left: 0; font-size: 1.05rem; }
              }
            `}</style>
            <div style={{ borderTop: '2px solid var(--navy)', borderBottom: '1px solid #e5e7eb' }}>
              <div className="qna-grid qna-header">
                <div>번호</div>
                <div>제목</div>
                <div>작성자</div>
                <div>등록일</div>
              </div>
              
              {posts.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#4b5563' }}>등록된 문의글이 없습니다.</div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} onClick={() => handlePostClick(post)} className="qna-grid qna-row">
                    <div className="qna-id" style={{ color: '#4b5563' }}>{post.id}</div>
                    <div className="qna-title">
                      <span style={{ wordBreak: 'break-word' }}>{post.title}</span>
                      {post.isSecret && <span style={{ fontSize: '0.8rem' }}>🔒</span>}
                      {post.reply && <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#14532d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '700', whiteSpace: 'nowrap' }}>답변완료</span>}
                      <div className="qna-mobile-meta">
                        <span>{maskName(post.author)}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="qna-desktop-meta" style={{ color: '#4b5563' }}>{maskName(post.author)}</div>
                    <div className="qna-desktop-meta" style={{ color: '#6b7280', fontSize: '0.9rem' }}>{post.date}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {view === 'write' && (
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#1a1a2e', borderBottom: '2px solid var(--gold)', paddingBottom: '0.5rem' }}>문의글 작성</h2>
            <form onSubmit={handleWriteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} toolname="submit_qna" tooldescription="Submit a new customer inquiry or consultation request." toolautosubmit>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>제목 <span style={{color:'red'}}>*</span></label>
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} toolparamdescription="The title of the inquiry" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>작성자 <span style={{color:'red'}}>*</span></label>
                  <input type="text" name="author" value={author} onChange={e => setAuthor(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} toolparamdescription="The name of the person submitting the inquiry" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>비밀번호 (열람용) <span style={{color:'red'}}>*</span></label>
                  <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} toolparamdescription="A password to protect and view this inquiry later" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>연락처</label>
                  <input type="tel" name="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="010-0000-0000" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} toolparamdescription="Contact phone number" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>이메일</label>
                  <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} toolparamdescription="Contact email address" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>내용 <span style={{color:'red'}}>*</span></label>
                <textarea name="content" value={content} onChange={e => setContent(e.target.value)} required rows={8} style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }} toolparamdescription="The full content of the inquiry or consultation request" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" name="secret" id="secret" checked={isSecret} onChange={e => setIsSecret(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem' }} toolparamdescription="Set to true if this inquiry should be kept secret/private" />
                <label htmlFor="secret" style={{ fontWeight: '600', color: '#ef4444', cursor: 'pointer' }}>🔒 비공개 글로 설정하기</label>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '1rem', borderRadius: '0.5rem', fontSize: '1.1rem' }}>등록하기</button>
                <button type="button" onClick={() => setView('list')} style={{ flex: 1, padding: '1rem', background: '#f3f4f6', color: '#4b5563', fontWeight: '700', borderRadius: '0.5rem', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>취소</button>
              </div>
            </form>
          </div>
        )}

        {view === 'detail' && selectedPost && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', color: '#1a1a2e', borderBottom: '2px solid var(--navy)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {selectedPost.isSecret && <span>🔒</span>}
              {selectedPost.title}
              {selectedPost.reply && <span style={{ fontSize: '0.9rem', background: '#dcfce7', color: '#14532d', padding: '0.25rem 0.6rem', borderRadius: '4px', fontWeight: '700', marginLeft: '0.5rem' }}>답변완료</span>}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <div><span style={{ fontWeight: '700', color: '#4b5563', marginRight: '0.5rem' }}>작성자:</span> {maskName(selectedPost.author)}</div>
              <div><span style={{ fontWeight: '700', color: '#4b5563', marginRight: '0.5rem' }}>등록일:</span> {selectedPost.date}</div>
            </div>
            <div style={{ minHeight: '150px', fontSize: '1.05rem', lineHeight: 1.7, color: '#1a1a2e', whiteSpace: 'pre-wrap', marginBottom: '2rem' }}>
              {selectedPost.content}
            </div>
            
            {/* 답변 영역 */}
            {selectedPost.reply && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '2rem', background: 'var(--navy)', color: 'white', padding: '0.2rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700' }}>
                  가효상조 공식 답변
                </div>
                <div style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text)', whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>
                  {selectedPost.reply}
                </div>
              </div>
            )}
            
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <button onClick={() => setView('list')} style={{ padding: '0.8rem 2.5rem', background: 'var(--navy)', color: 'white', fontWeight: '700', borderRadius: '999px', fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,26,58,0.2)' }}>
                목록으로 돌아가기
              </button>
            </div>
          </div>
        )}

        {/* 문의 안내 및 FAQ — 게시판 자체에 대한 정적 안내 콘텐츠 (실제 등록 여부와 무관하게 항상 노출) */}
        <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem' }}>문의 방법 안내</h2>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
            가효상조는 아래 3가지 방법으로 문의를 받고 있습니다. 급하신 경우에는 전화 상담을, 기록을 남기고 싶으신 경우에는 이 게시판을 이용해 주세요.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              { icon: '📞', title: '전화 상담', desc: '1551-5718로 연중무휴 24시간 즉시 상담 가능합니다.' },
              { icon: '💬', title: '카카오톡 상담', desc: '카카오 채널로 편한 시간에 텍스트로 문의하실 수 있습니다.' },
              { icon: '📝', title: '온라인 게시판', desc: '이 페이지에서 문의글을 남기시면 확인 후 답변드립니다.' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '0.375rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem' }}>게시판 이용 안내 (FAQ)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { q: '문의글을 남기면 답변은 얼마나 걸리나요?', a: '평일 기준 영업일 1일 이내에 답변드리는 것을 원칙으로 하며, 급한 사안은 전화(1551-5718)로 문의하시면 더 빠르게 도움받으실 수 있습니다.' },
              { q: '비공개(비밀글)로 작성하면 어떻게 되나요?', a: '작성 시 설정한 비밀번호를 입력해야만 본인과 답변자만 내용을 열람할 수 있습니다. 연락처나 가족 상황 등 민감한 내용을 남기실 때 이용해 주세요.' },
              { q: '작성자 이름이 게시판에 그대로 노출되나요?', a: '아니요. 목록에는 이름의 가운데 글자를 가려 표시하며, 이메일·연락처 등 개인정보는 공개 목록에 노출되지 않습니다.' },
              { q: '전화 상담과 게시판 문의 중 어떤 것이 더 빠른가요?', a: '가장 빠른 응대는 1551-5718 전화 상담이며, 24시간 연중무휴로 운영됩니다. 게시판은 통화가 어려운 시간대에 기록을 남기고 싶으실 때 이용하시면 좋습니다.' },
            ].map((faq, i) => (
              <article key={i} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem 1.5rem' }}>
                <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.6rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold-dark)', flexShrink: 0 }}>Q.</span> {faq.q}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.4rem', margin: 0, wordBreak: 'keep-all' }}>
                  <strong style={{ color: 'var(--gold-dark)', marginRight: '0.3rem' }}>A.</strong>{faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
