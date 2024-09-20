import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

import { Any } from "types/common";
import { User } from "interface/user";

const GenerateQrCell: React.FC<User> = (data) => {
  const [showQr, setShowQr] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrReady, setQrReady] = useState(false);
  const previewSize = 100;
  const downloadSize = 500;

  useEffect(() => {
    if (showQr && qrRef.current) {
      setQrReady(true);
    }
  }, [showQr]);

  const handleGenerateQr = () => {
    setShowQr(true);
  };

  const handleDownloadQr = () => {
    if (qrReady && qrRef.current) {
      const qrCodeElement = qrRef.current.querySelector("canvas");
      const originalSize = qrCodeElement?.style.width;
      qrCodeElement!.style.width = `${downloadSize}px`;
      qrCodeElement!.style.height = `${downloadSize}px`;

      html2canvas(qrRef.current, {
        scale: 4,
        useCORS: true,
      }).then((canvas: Any) => {
        const link = document.createElement("a");
        link.download = `${data.name}_QR.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        qrCodeElement!.style.width = originalSize as string;
        qrCodeElement!.style.height = originalSize as string;
      });
    } else {
      console.error("QR code is not ready yet.");
    }
  };

  return (
    <div>
      <button onClick={handleGenerateQr}>Generate QR</button>
      {showQr && (
        <div>
          <div ref={qrRef} style={{ marginTop: "10px" }}>
            <QRCodeCanvas
              value={`ID: ${data.id}, Name: ${data.name}, Department: ${data.department}, Designation: ${data.designation}`}
              size={previewSize}
            />
          </div>
          <button onClick={handleDownloadQr}>Download QR</button>
        </div>
      )}
    </div>
  );
};

export default GenerateQrCell;
