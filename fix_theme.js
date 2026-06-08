const fs = require('fs');

// 1. Update Login Page
let loginContent = fs.readFileSync('src/app/admin/login/page.tsx', 'utf8');
loginContent = loginContent.replace(/bg-black/g, 'bg-gray-50');
loginContent = loginContent.replace(/bg-gray-900\/50/g, 'bg-white/80');
loginContent = loginContent.replace(/border-gray-800/g, 'border-gray-200');
loginContent = loginContent.replace(/text-white/g, 'text-gray-900');
loginContent = loginContent.replace(/text-gray-400/g, 'text-gray-500');
loginContent = loginContent.replace(/bg-gray-800/g, 'bg-gray-100');
loginContent = loginContent.replace(/border-gray-700/g, 'border-gray-200');
loginContent = loginContent.replace(/text-gray-300/g, 'text-gray-700');
loginContent = loginContent.replace(/bg-black\/50/g, 'bg-white');
loginContent = loginContent.replace(/placeholder:text-gray-600/g, 'placeholder:text-gray-400');
fs.writeFileSync('src/app/admin/login/page.tsx', loginContent);

// 2. Update Layout
let layoutContent = fs.readFileSync('src/app/admin/(dashboard)/layout.tsx', 'utf8');
layoutContent = layoutContent.replace(/bg-black text-white/g, 'bg-gray-50 text-gray-900');
layoutContent = layoutContent.replace(/border-gray-800/g, 'border-gray-200');
layoutContent = layoutContent.replace(/bg-black flex/g, 'bg-white flex');
layoutContent = layoutContent.replace(/text-gray-500/g, 'text-gray-500');
layoutContent = layoutContent.replace(/text-gray-400/g, 'text-gray-600');
layoutContent = layoutContent.replace(/hover:text-white/g, 'hover:text-black');
layoutContent = layoutContent.replace(/hover:bg-gray-900/g, 'hover:bg-gray-100');
fs.writeFileSync('src/app/admin/(dashboard)/layout.tsx', layoutContent);

// 3. Update Page
let pageContent = fs.readFileSync('src/app/admin/(dashboard)/page.tsx', 'utf8');
pageContent = pageContent.replace(/bg-gray-900/g, 'bg-white');
pageContent = pageContent.replace(/border-gray-800/g, 'border-gray-200');
pageContent = pageContent.replace(/text-gray-400/g, 'text-gray-600');
pageContent = pageContent.replace(/bg-black/g, 'bg-gray-50');
pageContent = pageContent.replace(/text-gray-300/g, 'text-gray-700');
pageContent = pageContent.replace(/text-white/g, 'text-gray-900');
fs.writeFileSync('src/app/admin/(dashboard)/page.tsx', pageContent);

console.log("Light theme applied");
