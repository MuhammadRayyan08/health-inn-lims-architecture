import { useEffect, useRef, useState } from "react";
import Quagga, { QuaggaJSResultObject } from "quagga";

interface UseBarcodeScannerProps {
  onDetected: (code: string) => void;
  isActive: boolean;
}

export function useBarcodeScanner({ onDetected, isActive }: UseBarcodeScannerProps) {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive || !scannerRef.current) return;

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: "environment",
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 2,
        decoder: {
          readers: ["code_128_reader", "ean_reader", "code_39_reader"],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          setError("Failed to initialize optical camera sensor");
          return;
        }
        Quagga.start();
        setIsInitialized(true);
      }
    );

    const handleDetected = (result: QuaggaJSResultObject) => {
      const code = result.codeResult.code;
      if (code && result.codeResult.format) {
        onDetected(code);
      }
    };

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
      setIsInitialized(false);
    };
  }, [isActive, onDetected]);

  return { scannerRef, isInitialized, error };
}
