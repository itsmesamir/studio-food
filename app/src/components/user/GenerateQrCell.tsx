// import { useRef, useState } from "react";
// import http from "services/http";
// import QRCode from "react-qr-code";

// const GenerateQrCell = (user: any) => {
//   const [qrCode, setQrCode] = useState<string | null>(null);
//   const qrRef = useRef<HTMLDivElement | null>(null);

//   // Function to generate the QR code
//   const generateQr = async () => {
//     try {
//       const response = await http.post("/qrcode", user);
//       setQrCode(response.data);
//     } catch (error) {
//       console.error("Error generating QR code:", error);
//     }
//   };

//   // Function to download the QR code
//   const downloadQr = () => {
//     if (!qrRef.current || !qrCode) {
//       return;
//     }

//     const link = document.createElement("a");
//     link.href = qrCode;
//     link.download = `${user.name}_qr_code.png`;
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-md max-w-sm mx-auto">
//       <button
//         onClick={generateQr}
//         className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
//       >
//         Generate QR
//       </button>

//       {qrCode && (
//         <div className="mt-5 text-center">
//           <div ref={qrRef} className="qr-code">
//             <QRCode value={qrCode} size={150} />
//           </div>
//           <button
//             onClick={downloadQr}
//             className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
//           >
//             Download QR
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GenerateQrCell;

import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "services/http";
import QRCode from "react-qr-code";

const GenerateQrCell = (user: any) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const qrRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Function to generate the QR code and show the modal
  const generateQr = async () => {
    try {
      const response = await http.post("/qrcode", user);
      setQrCode(response.data);
      setShowModal(true); // Open the modal when QR code is generated
    } catch (error) {
      navigate("/users");
      console.error("Error generating QR code:", error);
    }
  };

  // Function to download the QR code and close the modal
  const downloadQr = () => {
    if (!qrRef.current || !qrCode) {
      return;
    }

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${user.name}_qr_code.png`;
    link.click();

    setShowModal(false); // Close the modal after download
  };

  // Function to close the modal manually
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-md max-w-sm mx-auto">
      <button
        onClick={generateQr}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Generate QR
      </button>

      {showModal && qrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white px-24 p-5 rounded-lg shadow-lg max-w-md w-fit flex flex-col justify-center items-center relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={closeModal}
            >
              &times; {/* "X" close button */}
            </button>
            <h2 className="text-lg font-bold mb-4 text-center">
              QR Code Preview
            </h2>
            <div ref={qrRef} className="flex justify-center mb-4">
              <QRCode value={qrCode} size={150} />
            </div>
            <button
              onClick={downloadQr}
              className="w-fit text-center bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            >
              Download QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQrCell;
