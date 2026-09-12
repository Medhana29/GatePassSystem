const QRCode = require("qrcode");

const generateQRCode = async (data) => {
  try {
    const qrCode = await QRCode.toDataURL(data);
    return qrCode;
  } catch (error) {
    throw new Error("QR code generation failed");
  }
};

module.exports = generateQRCode;