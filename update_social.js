const fs = require('fs');
const content = fs.readFileSync('src/app/social/page.tsx', 'utf8');

const startMarker = '{/* Phone Screen / Content Area */}';
const startIndex = content.indexOf(startMarker);
if (startIndex === -1) throw new Error("Could not find start marker");

// Find the matching closing div for the phone screen
let openDivs = 0;
let endIndex = -1;
let currentIdx = content.indexOf('<div className="rounded-[2rem] overflow-hidden', startIndex);

for (let i = currentIdx; i < content.length; i++) {
    if (content.substr(i, 4) === '<div') {
        openDivs++;
    } else if (content.substr(i, 5) === '</div') {
        openDivs--;
        if (openDivs === 0) {
            endIndex = i + 6; // include '</div>'
            break;
        }
    }
}

if (endIndex === -1) throw new Error("Could not find end of phone screen");

let phoneScreenCode = content.substring(currentIdx, endIndex);

// Replace layoutIds to append "-bg" if isBackground is true
phoneScreenCode = phoneScreenCode.replace(/layoutId="([^"]+)"/g, 'layoutId={isBackground ? "$1-bg" : "$1"}');

// Optional: remove pointer events if background
phoneScreenCode = phoneScreenCode.replace(/<div className="rounded-\[2rem\] overflow-hidden w-full h-full bg-white relative flex flex-col">/g, '<div className={`rounded-[2rem] overflow-hidden w-full h-full bg-white relative flex flex-col ${isBackground ? "pointer-events-none" : ""}`}>');

const functionCode = `  const renderPhoneScreen = (isBackground: boolean) => (\n    ${phoneScreenCode.replace(/\n/g, '\n    ')}\n  );\n\n`;

// Insert the function just before `return (`
const returnIndex = content.indexOf('return (');
let newContent = content.substring(0, returnIndex) + functionCode + content.substring(returnIndex, currentIdx) + '{renderPhoneScreen(false)}\n' + content.substring(endIndex);

// Now update the ambient background to use renderPhoneScreen(true) instead of an Image
const bgStartMarker = '<AnimatePresence mode="wait">';
const bgStartIndex = newContent.indexOf(bgStartMarker);

// Find the closing AnimatePresence
const bgEndIndex = newContent.indexOf('</AnimatePresence>', bgStartIndex) + 18;

const newBgCode = `
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden blur-[60px] scale-[1.25] opacity-60 flex items-center justify-center">
          <div className="w-[320px] h-[650px] relative">
            {renderPhoneScreen(true)}
          </div>
        </div>
`;

newContent = newContent.substring(0, bgStartIndex) + newBgCode.trim() + newContent.substring(bgEndIndex);

fs.writeFileSync('src/app/social/page.tsx', newContent);
console.log("Success");
