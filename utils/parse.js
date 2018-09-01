const fs = require('fs');

const reg = /知识点:[\s\S]*?题目解析+/gm;

const s = fs.readFileSync('tk.txt').toString();
const m = s.match(reg);
fs.writeFileSync('res.json', JSON.stringify(m));
