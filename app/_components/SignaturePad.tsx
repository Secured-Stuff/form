import { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "./Button";

interface Props {
  onSignatureChange: (url: string) => void;
}

export function SignaturePad({ onSignatureChange }: Readonly<Props>) {
  const [url, setUrl] = useState<string>("");
  const signCanvasRef = useRef<SignatureCanvas | null>(null);

  const handleClear = () => {
    if (signCanvasRef.current) {
      signCanvasRef.current.clear();
      setUrl("");
    }
  };

  const handleGenerate = () => {
    if (signCanvasRef.current) {
      const url = signCanvasRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setUrl(url);
      onSignatureChange(url);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm">Signature / Podpis</label>
      <div className="rounded-md border">
        <SignatureCanvas
          canvasProps={{ width: 900, height: 200, className: "sigCanvas" }}
          ref={signCanvasRef}
          onEnd={handleGenerate}
        />
      </div>
      <Button type="button" styleType="Secondary" onClick={handleClear}>
        Clear signature / Wyczyść podpis
      </Button>
    </div>
  );
}
