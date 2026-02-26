const fs = require('fs');
const { marked } = require('marked');

// Read and convert each markdown file
const files = [
  'openclaw-mac-mini-deploy.md',
  'openclaw-vps-deploy.md',
  'openclaw-windows-deploy.md'
];

files.forEach(file => {
  const md = fs.readFileSync(file, 'utf8');
  const html = marked(md);
  
  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${file.replace('.md', '')}</title>
  <style>
    body { max-width: 800px; margin: 0 auto; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.8; }
    h1, h2, h3 { color: #333; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }
    pre { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 8px; overflow-x: auto; }
    pre code { background: none; padding: 0; }
    a { color: #2563eb; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background: #f5f5f5; }
    .back { display: inline-block; margin-bottom: 20px; color: #666; text-decoration: none; }
    .back:hover { color: #2563eb; }
  </style>
</head>
<body>
  <a href="index.html" class="back">← 返回首页</a>
  ${html}
</body>
</html>`;
  
  fs.writeFileSync(file.replace('.md', '.html'), fullHtml);
  console.log(`Converted ${file} to HTML`);
});
