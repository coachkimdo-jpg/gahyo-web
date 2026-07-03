const parse = require('html-react-parser').default || require('html-react-parser');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const content = '<h1>Title</h1><p>Test</p><script type="application/ld+json">{"@type": "FAQPage"}</script>';
const result = parse(content, {
  replace: (domNode) => {
    if (domNode.name === 'script') return React.createElement(React.Fragment);
  }
});

const html = ReactDOMServer.renderToString(React.createElement('div', null, result));
console.log(html);
