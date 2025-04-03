module.exports = async (req, res) => {
  const { wallet } = req.body;

  // URL pública del Sheet en formato CSV
  const url = 'https://docs.google.com/spreadsheets/d/1JmMJuKRdMv0sX2sBvakhEXVT_9R79WhA07WxmcZvSGQ/export?format=csv';
  
  // Hacer fetch al CSV
  const response = await fetch(url);
  const text = await response.text();

  // Convertir CSV a array (asumiendo que las wallets están en la primera columna)
  const rows = text.split('\n').map(row => row.split(',')[0].trim());
  const isEligible = rows.some(row => row === wallet);

  res.json({
    message: isEligible ? '¡Felicidades! Tu wallet es elegible!' : 'Lo siento, tu wallet no es elegible.'
  });
};
