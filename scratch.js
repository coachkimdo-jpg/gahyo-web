const text = `
<blog_post>
  <reasoning>
    AI needs to generate a post.
    The rule is: <content> 내부에는 HTML 태그만을 사용합니다.
    And more text...
  </reasoning>
  <content>
    <h1>Actual Content</h1>
  </content>
</blog_post>
`;

const extractTag = (tag, str) => {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'i');
  const match = str.match(regex);
  return match ? match[1].trim() : '';
};

console.log("extractTag:", extractTag('content', text));
