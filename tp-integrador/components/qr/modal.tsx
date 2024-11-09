import React, {useCallback, useRef} from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type QRCodeModalProps = {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  filename?: string;
};

const QRCodeModal: React.FC<QRCodeModalProps> = ({filename, url, isOpen, onClose }) => {
  const ref = useRef(null);
  const downloadQR = useCallback(() =>{
    if (ref.current) {
      const svg = ref.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const a = document.createElement('a');
        a.download = filename + '.png';
        a.href = canvas.toDataURL('image/png');
        a.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  }, [ref, filename]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Código QR</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center my-4">
          <QRCodeSVG ref={ref} value={url} size={256} />
        </div>
        <DialogFooter>
          <Button onClick={downloadQR}>Descargar QR</Button>
          <Button variant="ghost" onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeModal;