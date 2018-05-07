const fs = require('fs');
let baseName = 'tradeType';
(() => {
  for (let i = 1; i < 30; i++) {
    fs.writeFileSync(baseName + i + '.json', JSON.stringify({
      result: 1,
      version: null,
      tradeType: i,
      data: null
    }));
  }
})();
