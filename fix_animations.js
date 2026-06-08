const fs = require('fs');
let content = fs.readFileSync('src/app/social/page.tsx', 'utf8');

// Replace layoutId on the icons (they don't have a transition prop following them)
content = content.replace(/layoutId=\{isBackground \? "app-[a-z]+-bg" : "app-[a-z]+"\} className="w-full h-full/g, 'className="w-full h-full');

// Replace layoutId and transition on the full-screen app windows
content = content.replace(/layoutId=\{isBackground \? "app-[a-z]+-bg" : "app-[a-z]+"\} transition=\{\{ duration: 0.15, ease: \[0.32, 0.72, 0, 1\] \}\}/g, 'initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeInOut" }}');

fs.writeFileSync('src/app/social/page.tsx', content);
