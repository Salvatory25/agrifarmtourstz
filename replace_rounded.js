const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files1 = walk('./src/app/(public)');
const files2 = walk('./src/components');
const allFiles = [...files1, ...files2];

let replacedCount = 0;
allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Replace all rounded corners that are typically applied to cards/containers.
  // We leave rounded-full alone so circular icons/avatars don't become boxes (unless they specifically complain).
  const newContent = content.replace(/rounded-(sm|md|lg|xl|2xl|3xl|\[[a-zA-Z0-9.]+\])/g, 'rounded-none');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    replacedCount++;
  }
});

console.log('Modified', replacedCount, 'files to remove rounded corners.');
