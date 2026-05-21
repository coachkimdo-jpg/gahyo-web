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
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '4rem 1rem 6rem' }}>
      <div className="container" style={{ maxWidth: '800px', background: 'white', padding: '2.5rem', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--navy)' }}>고객 문의/상담</h1>
          <p style={{ marginTop: '0.5rem', color: '#6b7280' }}>가효상조에 궁금한 점을 남겨주시면 성심성의껏 답변해 드립니다.</p>
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

            <div style={{ borderTop: '2px solid var(--navy)', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px', padding: '1rem 0', fontWeight: '700', color: '#4b5563', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
                <div>번호</div>
                <div>제목</div>
                <div>작성자</div>
                <div>등록일</div>
              </div>
              
              {posts.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>등록된 문의글이 없습니다.</div>
              ) : (
                posts.map((post) => (
                  <div 
                    key={post.id} 
                    onClick={() => handlePostClick(post)}
                    style={{ 
                      display: 'grid', gridTemplateColumns: '60px 1fr 100px 100px', padding: '1rem 0', 
                      borderBottom: '1px solid #e5e7eb', textAlign: 'center', cursor: 'pointer', transition: 'background 0.2s' 
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f9fafb'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ color: '#6b7280' }}>{post.id}</div>
                    <div style={{ textAlign: 'left', paddingLeft: '1rem', fontWeight: '600', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {post.title}
                      {post.isSecret && <span style={{ fontSize: '0.8rem' }}>🔒</span>}
                      {post.reply && <span style={{ fontSize: '0.75rem', background: '#dcfce7', color: '#14532d', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: '700' }}>답변완료</span>}
                    </div>
                    <div style={{ color: '#4b5563' }}>{maskName(post.author)}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.9rem' }}>{post.date}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {view === 'write' && (
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#1a1a2e', borderBottom: '2px solid var(--gold)', paddingBottom: '0.5rem' }}>문의글 작성</h2>
            <form onSubmit={handleWriteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>제목 <span style={{color:'red'}}>*</span></label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>작성자 <span style={{color:'red'}}>*</span></label>
                  <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>비밀번호 (열람용) <span style={{color:'red'}}>*</span></label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>연락처</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="010-0000-0000" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>이메일</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com" style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', color: '#4b5563' }}>내용 <span style={{color:'red'}}>*</span></label>
                <textarea value={content} onChange={e => setContent(e.target.value)} required rows={8} style={{ width: '100%', padding: '0.8rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="secret" checked={isSecret} onChange={e => setIsSecret(e.target.checked)} style={{ width: '1.2rem', height: '1.2rem' }} />
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
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
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

      </div>
    </div>
  );
}
