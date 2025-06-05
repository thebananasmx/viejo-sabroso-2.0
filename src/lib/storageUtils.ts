import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";

export interface UploadResult {
  url: string;
  fileName: string;
}

export const uploadImage = async (
  file: File,
  folder: string = "images",
): Promise<UploadResult> => {
  console.log("Starting image upload...", {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    folder,
  });

  try {
    // Check if storage is configured
    if (!storage) {
      throw new Error("Firebase Storage no está configurado correctamente");
    }

    // Validate file type
    const allowedTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(
        "Tipo de archivo no permitido. Solo se permiten PNG, JPG y SVG.",
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error("El archivo es demasiado grande. Máximo 5MB.");
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2);
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "png";
    const fileName = `${folder}/${timestamp}_${randomSuffix}.${fileExtension}`;

    console.log("Generated filename:", fileName);

    // Create storage reference
    const storageRef = ref(storage, fileName);
    console.log("Storage reference created");

    // Upload file
    console.log("Starting upload to Firebase Storage...");
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload completed, getting download URL...");

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL obtained:", downloadURL);

    return {
      url: downloadURL,
      fileName: fileName,
    };
  } catch (error: any) {
    console.error("Error uploading image:", error);

    // More specific error messages
    if (error.code === "storage/unauthorized") {
      throw new Error(
        "Sin permisos para subir archivos. Verifica las reglas de Firebase Storage.",
      );
    }
    if (error.code === "storage/network-request-failed") {
      throw new Error("Error de conexión. Verifica tu conexión a internet.");
    }
    if (error.code === "storage/quota-exceeded") {
      throw new Error("Cuota de almacenamiento excedida.");
    }

    throw error;
  }
};

export const deleteImage = async (fileName: string): Promise<void> => {
  try {
    const storageRef = ref(storage, fileName);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting image:", error);
    // Don't throw error for delete operations as the image might not exist
  }
};

export const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo cargar la imagen"));
    };

    img.src = url;
  });
};

export const validateImageFile = (
  file: File,
): { isValid: boolean; error?: string } => {
  const allowedTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/svg+xml",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Tipo de archivo no permitido. Solo se permiten PNG, JPG y SVG.",
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "El archivo es demasiado grande. Máximo 5MB.",
    };
  }

  return { isValid: true };
};
