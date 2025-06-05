import React, { useState } from "react";
import { Button } from "./ui/button";
import { testFirebaseStorage } from "../lib/storageTest";
import { toast } from "sonner";

const StorageDebug: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const runTest = async () => {
    setTesting(true);
    setResult(null);

    try {
      const isWorking = await testFirebaseStorage();
      if (isWorking) {
        setResult("✅ Firebase Storage funciona correctamente");
        toast.success("Storage test exitoso");
      } else {
        setResult("❌ Firebase Storage tiene problemas");
        toast.error("Storage test falló");
      }
    } catch (error: any) {
      setResult(`❌ Error: ${error.message}`);
      toast.error("Error en test de Storage");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="font-medium mb-2">🔧 Debug de Firebase Storage</h3>
      <p className="text-sm text-gray-600 mb-4">
        Prueba la conectividad con Firebase Storage
      </p>

      <Button onClick={runTest} disabled={testing} variant="outline" size="sm">
        {testing ? "Probando..." : "Test Storage"}
      </Button>

      {result && (
        <div className="mt-3 p-2 border rounded text-sm">{result}</div>
      )}

      <details className="mt-3">
        <summary className="text-xs text-gray-500 cursor-pointer">
          ℹ️ Información de configuración
        </summary>
        <div className="text-xs text-gray-600 mt-2 space-y-1">
          <div>Bucket: viejo-sabroso.firebasestorage.app</div>
          <div>Proyecto: viejo-sabroso</div>
          <div>Carpeta de prueba: test/</div>
        </div>
      </details>
    </div>
  );
};

export default StorageDebug;
