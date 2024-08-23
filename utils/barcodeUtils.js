
const generateRandomBarcode = () => {
    const barcode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return barcode;
  };
  
  module.exports = { generateRandomBarcode };