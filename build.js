const fs = require('fs');
const path = require('path');

// ─── Pure Node.js minifiers (zero dependencies) ───────────────────────────────

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*,\s*/g, ',')
    .replace(/;}/g, '}')
    .trim();
}

function minifyJS(js) {
  return js
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*([{}();,])\s*/g, '$1')
    .replace(/\s*=\s*/g, '=')
    .replace(/\s*\+\s*/g, '+')
    .replace(/\s*\|\|\s*/g, '||')
    .replace(/\s*&&\s*/g, '&&')
    .trim();
}

// ─── Build ─────────────────────────────────────────────────────────────────────

const componentsDir = './components';
let allCSS = '';
let allJS = '';

if (!fs.existsSync(componentsDir)) {
  console.error('❌ /components directory not found');
  process.exit(1);
}

const components = fs.readdirSync(componentsDir);

components.forEach(name => {
  const dir = path.join(componentsDir, name);
  if (!fs.statSync(dir).isDirectory()) return;

  const cssFile = path.join(dir, `${name}.css`);
  const jsFile  = path.join(dir, `${name}.js`);

  if (fs.existsSync(cssFile)) {
    allCSS += '/* === ' + name + ' === */\n' + fs.readFileSync(cssFile, 'utf8') + '\n\n';
    console.log('✅ CSS: ' + name);
  }

  if (fs.existsSync(jsFile)) {
    allJS += '/* === ' + name + ' === */\n' + fs.readFileSync(jsFile, 'utf8') + '\n\n';
    console.log('✅ JS:  ' + name);
  }
});

fs.mkdirSync('./dist', { recursive: true });

const minCSS = minifyCSS(allCSS);
const minJS  = minifyJS(allJS);

fs.writeFileSync('./dist/components.css',     allCSS);
fs.writeFileSync('./dist/components.js',      allJS);
fs.writeFileSync('./dist/components.min.css', minCSS);
fs.writeFileSync('./dist/components.min.js',  minJS);

const pctCSS = Math.round((1 - minCSS.length / allCSS.length) * 100);
const pctJS  = Math.round((1 - minJS.length  / allJS.length)  * 100);

console.log('\n📦 Build complete!\n');
console.log('File                     Size        Saved');
console.log('──────────────────────────────────────────');
console.log('components.css           ' + allCSS.length + 'B');
console.log('components.min.css       ' + minCSS.length + 'B        ' + pctCSS + '% smaller');
console.log('components.js            ' + allJS.length + 'B');
console.log('components.min.js        ' + minJS.length + 'B         ' + pctJS + '% smaller');
console.log('\n🚀 Use in production header:');
console.log('   dist/components.min.css');
console.log('   dist/components.min.js');
