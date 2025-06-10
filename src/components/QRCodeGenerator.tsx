
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, QrCode } from 'lucide-react';

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  onGenerated?: (qrCodeUrl: string) => void;
}

const QRCodeGenerator = ({ url, size = 200, onGenerated }: QRCodeGeneratorProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (url) {
      generateQRCode();
    }
  }, [url]);

  const generateQRCode = async () => {
    try {
      // Usando QR Server API para gerar QR codes
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
      setQrCodeUrl(qrUrl);
      onGenerated?.(qrUrl);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!qrCodeUrl) {
    return (
      <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center">
          <QrCode className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Gerando QR Code...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <div className="inline-block p-4 bg-white rounded-lg shadow-sm border">
        <img src={qrCodeUrl} alt="QR Code" className="w-full h-auto" />
      </div>
      <Button onClick={downloadQRCode} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Baixar QR Code
      </Button>
    </div>
  );
};

export default QRCodeGenerator;
