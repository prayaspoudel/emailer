const fs = require('fs');
const moment = require('moment');
const i18n = require('../locale');
const fetchPDF = require('../fetchpdf');

module.exports = {
  get: async (locale, recordId, params, { tenant }) => {
    const billingRef = `${moment(params.term, 'YYYYMMDDHH')
      .locale(locale)
      .format('MM_YY')}_${tenant.reference}`;
    const filename = `${i18n(locale)['short_rentcall']}-${
      tenant.name
    }-${billingRef}`;
    const filePath = await fetchPDF('rentcall', recordId, params, filename);
    return {
      attachment: [fs.createReadStream(filePath)],
    };
  },
};
