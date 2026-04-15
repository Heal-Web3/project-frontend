import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface QRDisplayProps {
  data: string;
  size?: number;
}

const QRDisplay = ({ data, size = 200 }: QRDisplayProps) => {
  const handleDownload = () => {
    const svg = document.querySelector('.qr-code-container svg');
    if (!svg) return;

    const canvas = document.createElement('canvas');
    canvas.width = size * 2;
    canvas.height = size * 2;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = 'prescription-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.success('QR data copied to clipboard');
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-card rounded-xl border border-border">
      <div className="qr-code-container bg-background p-4 rounded-lg">
        <QRCodeSVG value={data} size={size} level="H" />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="h-4 w-4" />
          Copy Data
        </Button>
      </div>
    </div>
  );
};

export default QRDisplay;
