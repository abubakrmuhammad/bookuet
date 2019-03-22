const { SHA1 } = require('crypto-js');

const generatePO = id => {
  const date = new Date();
  const po = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(id)
    .toString()
    .substring(0, 8)}`;

  return po;
};

module.exports = { generatePO };
