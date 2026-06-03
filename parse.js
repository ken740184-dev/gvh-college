const babel = require('@babel/core');
const fs = require('fs');
try {
  babel.parseSync(fs.readFileSync('test.tsx', 'utf8'), {
    filename: 'test.tsx',
    presets: ['@babel/preset-react', '@babel/preset-typescript']
  });
  console.log("No syntax errors");
} catch(e) {
  console.log(e.message);
}
