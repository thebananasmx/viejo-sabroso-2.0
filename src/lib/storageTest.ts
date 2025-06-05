import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export const testFirebaseStorage = async (): Promise<boolean> => {
  try {
    console.log("Testing Firebase Storage connectivity...");

    // Create a simple test file
    const testContent = "test";
    const testFile = new Blob([testContent], { type: "text/plain" });

    // Create storage reference
    const testRef = ref(storage, `test/connectivity-test-${Date.now()}.txt`);

    // Try to upload
    console.log("Uploading test file...");
    const snapshot = await uploadBytes(testRef, testFile);
    console.log("Test file uploaded successfully");

    // Try to get download URL
    console.log("Getting download URL...");
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL obtained:", downloadURL);

    console.log("✅ Firebase Storage is working correctly");
    return true;
  } catch (error: any) {
    console.error("❌ Firebase Storage test failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return false;
  }
};

export const diagnoseStorageError = (error: any): string => {
  switch (error.code) {
    case "storage/unauthorized":
      return "Sin permisos para acceder a Firebase Storage. Verifica las reglas de seguridad.";
    case "storage/network-request-failed":
      return "Error de conexión a Firebase Storage. Verifica tu conexión a internet.";
    case "storage/quota-exceeded":
      return "Cuota de almacenamiento excedida en Firebase Storage.";
    case "storage/unauthenticated":
      return "Usuario no autenticado para acceder a Firebase Storage.";
    case "storage/retry-limit-exceeded":
      return "Límite de reintentos excedido. Intenta de nuevo más tarde.";
    case "storage/invalid-checksum":
      return "Archivo corrupto durante la subida. Intenta de nuevo.";
    case "storage/canceled":
      return "Subida cancelada por el usuario.";
    case "storage/invalid-event-name":
      return "Nombre de evento inválido en Firebase Storage.";
    case "storage/invalid-url":
      return "URL de Firebase Storage inválida.";
    case "storage/invalid-argument":
      return "Argumento inválido en la operación de Storage.";
    case "storage/no-default-bucket":
      return "No hay bucket por defecto configurado en Firebase Storage.";
    case "storage/cannot-slice-blob":
      return "Error al procesar el archivo. Formato no soportado.";
    case "storage/server-file-wrong-size":
      return "Tamaño de archivo incorrecto en el servidor.";
    default:
      return error.message || "Error desconocido en Firebase Storage";
  }
};
