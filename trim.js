const fs = require('fs');
let content = fs.readFileSync('src/app/admin/(dashboard)/gallery/page.tsx', 'utf8');

const marker1 = '          {/* PUBLISHED BLOCKS GRID WITH DRAG AND DROP */}';
const marker2 = '      {/* Published Blocks */}';
const marker3 = '          {/* PUBLISHED BLOCKS LIST */}';

let index = -1;

const idx1 = content.indexOf(marker1);
if (idx1 > -1 && (index === -1 || idx1 < index)) index = idx1;

const idx2 = content.indexOf(marker2);
if (idx2 > -1 && (index === -1 || idx2 < index)) index = idx2;

const idx3 = content.indexOf(marker3);
if (idx3 > -1 && (index === -1 || idx3 < index)) index = idx3;

if (index > -1) {
    fs.writeFileSync('src/app/admin/(dashboard)/gallery/page.tsx', content.substring(0, index));
}
