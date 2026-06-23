const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

const replacements = [
  { search: /bg-cyber-black/g, replace: 'bg-theme-bg' },
  { search: /text-cyber-black/g, replace: 'text-theme-bg' },
  { search: /cyber-green/g, replace: 'theme-primary' },
  { search: /cyber-cyan/g, replace: 'theme-secondary' },
  { search: /cyber-purple/g, replace: 'theme-secondary' }, // fallback
  { search: /text-white/g, replace: 'text-theme-text' },
  { search: /bg-black/g, replace: 'bg-theme-bg' },
  { search: /text-gray-400/g, replace: 'text-theme-muted' },
  { search: /text-gray-500/g, replace: 'text-theme-muted' },
  { search: /text-gray-300/g, replace: 'text-theme-muted' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      replacements.forEach(r => {
        content = content.replace(r.search, r.replace);
      });
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  });
}

processDirectory(directoryPath);
