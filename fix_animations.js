const fs = require('fs');

let content = fs.readFileSync('src/app/social/page.tsx', 'utf8');

// 1. Add framer-motion import
content = content.replace(
  'import { useSearchParams } from "next/navigation";',
  'import { useSearchParams } from "next/navigation";\nimport { motion, AnimatePresence } from "framer-motion";'
);

// 2. Remove the style injection block
content = content.replace(/\/\/ Inject styles for app open animation[\s\S]*?\}, \[\]\);\n\n/g, '');

// 3. Remove .animate-app-open classes everywhere
content = content.replace(/className="animate-app-open /g, 'className="');

// 4. Update the Home screen container
content = content.replace(
  /\{\/\* === iOS HOME SCREEN MOCKUP === \*\/\}\s*\{activeNetwork === "home" && \(\s*<div className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-\[#FF9A9E\] via-\[#FECFEF\] to-\[#A18CD1\]">/g,
  `{/* === iOS HOME SCREEN MOCKUP === */}
              <motion.div 
                className="w-full h-full absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#A18CD1] z-0"
                animate={{ scale: activeNetwork === "home" ? 1 : 0.95, filter: activeNetwork === "home" ? "blur(0px)" : "blur(4px)" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}`
);

// Close the motion.div instead of div and remove the trailing )}
content = content.replace(
  /<\/div>\n\s*\}\)\}\n\n\s*\{\/\* === INSTAGRAM MOCK PROFILE === \*\/\}/g,
  `              </motion.div>\n\n              <AnimatePresence>\n              {/* === INSTAGRAM MOCK PROFILE === */}`
);

// 5. Update the Folder icons to use layoutId
content = content.replace(
  /<div className="w-\[60px\] h-\[60px\] rounded-2xl bg-gradient-to-tr/g,
  '<motion.div layoutId="app-instagram" className="w-[60px] h-[60px] rounded-[1.4rem] bg-gradient-to-tr'
).replace(
  /<\/div>\n\s*<span className="text-white text-\[11px\] font-medium tracking-tight">Instagram<\/span>/g,
  '</motion.div>\n                        <span className="text-white text-[11px] font-medium tracking-tight">Instagram</span>'
);

content = content.replace(
  /<div className="w-\[60px\] h-\[60px\] rounded-2xl bg-black/g,
  '<motion.div layoutId="app-twitter" className="w-[60px] h-[60px] rounded-[1.4rem] bg-black'
).replace(
  /<\/div>\n\s*<span className="text-white text-\[11px\] font-medium tracking-tight">Twitter<\/span>/g,
  '</motion.div>\n                        <span className="text-white text-[11px] font-medium tracking-tight">Twitter</span>'
);

content = content.replace(
  /<div className="w-\[60px\] h-\[60px\] rounded-2xl bg-\[#1877F2\]/g,
  '<motion.div layoutId="app-facebook" className="w-[60px] h-[60px] rounded-[1.4rem] bg-[#1877F2]'
).replace(
  /<\/div>\n\s*<span className="text-white text-\[11px\] font-medium tracking-tight">Facebook<\/span>/g,
  '</motion.div>\n                        <span className="text-white text-[11px] font-medium tracking-tight">Facebook</span>'
);

content = content.replace(
  /<div className="w-\[60px\] h-\[60px\] rounded-2xl bg-\[#0a66c2\]/g,
  '<motion.div layoutId="app-linkedin" className="w-[60px] h-[60px] rounded-[1.4rem] bg-[#0a66c2]'
).replace(
  /<\/div>\n\s*<span className="text-white text-\[11px\] font-medium tracking-tight">LinkedIn<\/span>/g,
  '</motion.div>\n                        <span className="text-white text-[11px] font-medium tracking-tight">LinkedIn</span>'
);

content = content.replace(
  /<div className="w-\[60px\] h-\[60px\] rounded-2xl bg-white/g,
  '<motion.div layoutId="app-youtube" className="w-[60px] h-[60px] rounded-[1.4rem] bg-white'
).replace(
  /<\/div>\n\s*<span className="text-white text-\[11px\] font-medium tracking-tight">YouTube<\/span>/g,
  '</motion.div>\n                        <span className="text-white text-[11px] font-medium tracking-tight">YouTube</span>'
);

// 6. Update the App mockups to use layoutId
content = content.replace(
  /\{activeNetwork === "instagram" && \(\n\s*<div className="bg-\[#000000\] h-full text-white flex flex-col w-full relative">/g,
  `{activeNetwork === "instagram" && (\n                <motion.div layoutId="app-instagram" transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="absolute inset-0 z-50 bg-[#000000] h-full text-white flex flex-col w-full rounded-[2rem] overflow-hidden">`
).replace(
  /\{activeNetwork === "twitter" && \(\n\s*<div className="bg-black text-white h-full flex flex-col w-full relative">/g,
  `{activeNetwork === "twitter" && (\n                <motion.div layoutId="app-twitter" transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="absolute inset-0 z-50 bg-black text-white h-full flex flex-col w-full rounded-[2rem] overflow-hidden">`
).replace(
  /\{activeNetwork === "facebook" && \(\n\s*<div className="bg-\[#f0f2f5\] h-full flex flex-col w-full relative">/g,
  `{activeNetwork === "facebook" && (\n                <motion.div layoutId="app-facebook" transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="absolute inset-0 z-50 bg-[#f0f2f5] h-full flex flex-col w-full rounded-[2rem] overflow-hidden">`
).replace(
  /\{activeNetwork === "linkedin" && \(\n\s*<div className="bg-\[#e9e5df\] h-full flex flex-col w-full relative">/g,
  `{activeNetwork === "linkedin" && (\n                <motion.div layoutId="app-linkedin" transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="absolute inset-0 z-50 bg-[#e9e5df] h-full flex flex-col w-full rounded-[2rem] overflow-hidden">`
).replace(
  /\{activeNetwork === "youtube" && \(\n\s*<div className="bg-\[#0f0f0f\] h-full flex flex-col w-full relative text-white">/g,
  `{activeNetwork === "youtube" && (\n                <motion.div layoutId="app-youtube" transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="absolute inset-0 z-50 bg-[#0f0f0f] h-full flex flex-col w-full rounded-[2rem] overflow-hidden text-white">`
);

// 7. Close motion.divs for apps
content = content.replace(
  /<\/div>\n\s*\)\}/g,
  '</motion.div>\n              )}'
);

// 8. Close AnimatePresence
content = content.replace(
  /<\/div>\n\s*<\/div>\n\s*<\/div>/g,
  `              </AnimatePresence>\n          </div>\n        </div>\n      </div>`
);

fs.writeFileSync('src/app/social/page.tsx', content);
console.log('Done!');
