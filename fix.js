const fs = require('fs');
let content = fs.readFileSync('src/app/admin/(dashboard)/gallery/page.tsx', 'utf8');

// Replace the end of the file
const badEnd = `
        </div>
      </div>
    </div>
  );
}
`;

const goodEnd = `
      </div>
    </div>
  );
}
`;

if (content.endsWith(badEnd)) {
    content = content.substring(0, content.length - badEnd.length) + goodEnd;
    fs.writeFileSync('src/app/admin/(dashboard)/gallery/page.tsx', content);
    console.log("Fixed extra div");
} else {
    // maybe try regex
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\);\s*\}\s*$/, '  </div>\n    </div>\n  );\n}\n');
    fs.writeFileSync('src/app/admin/(dashboard)/gallery/page.tsx', content);
    console.log("Regex replaced");
}
