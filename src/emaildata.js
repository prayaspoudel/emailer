const fs = require('fs');
const path = require('path');

module.exports = {
  build: async (locale, templateName, recordId, params) => {
    const dataPackagePath = path.join(
      __dirname,
      'emailparts',
      'data',
      templateName
    );
    if (!fs.existsSync(dataPackagePath)) {
      return {};
    }

    const data = require(dataPackagePath);
    return await data.get(locale, recordId, params);
  },
};
