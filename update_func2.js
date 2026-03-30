const fs = require('fs');

let content = fs.readFileSync('src/func2.js', 'utf8');

// Add LengthPercentNumber
const lengthPercentNumberStr = `  LengthPercentNumber: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.type === "number") ? a.text : undefined),`;
content = content.replace(
  /NumberInterpreter: ResolveMath\(a => \(a.type === "number" && a.unit === ""\) \? a.num : undefined\),/,
  `NumberInterpreter: ResolveMath(a => (a.type === "number" && a.unit === "") ? a.num : undefined),\n${lengthPercentNumberStr}`
);

fs.writeFileSync('src/func2.js', content);
