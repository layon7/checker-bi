const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = async (req, res) => {
  const { wallet } = req.body;

  const doc = new GoogleSpreadsheet('1JmMJuKRdMv0sX2sBvakhEXVT_9R79WhA07WxmcZvSGQ');
  await doc.useApiKey(process.env.GOOGLE_API_KEY);

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const isEligible = rows.some(row => row['Wallet'] === wallet); // Ajusta 'Wallet' si la columna tiene otro nombre

  res.json({
    message: isEligible ? '¡Felicidades! Tu wallet es elegible!' : 'Lo siento, tu wallet no es elegible.'
  });
};
