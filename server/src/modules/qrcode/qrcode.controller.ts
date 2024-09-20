import { Request, Response } from 'express';
import QRCode from 'qrcode';

/**
 * Generate QR code.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const generateQR = async (req: Request, res: Response) => {
  const { id, name, designation, department } = req.body;

  const qrData = {
    id: id,
    name: name,
    designation: designation,
    department: department,
  };

  try {
    const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
    res.json({ data: qrCode });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).send('Failed to generate QR code.');
  }
};
