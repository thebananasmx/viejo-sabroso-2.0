import React, { useState, useRef } from "react";
import { Upload, X, Image, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  uploadImage,
  deleteImage,
  validateImageFile,
} from "../lib/storageUtils";
import { toast } from "sonner";

interface ImageUploadProps {
  currentImage?: string;
  currentFileName?: string;
  onImageUploaded: (url: string, fileName: string) => void;
  onImageRemoved: () => void;
  label?: string;
  description?: string;
  folder?: string;
  maxWidth?: number;
  maxHeight?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  currentFileName,
  onImageUploaded,
  onImageRemoved,
  label = "Cargar Imagen",
  description = "PNG, JPG o SVG hasta 5MB",
  folder = "header-icons",
  maxWidth = 200,
  maxHeight = 200,
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(validation.error);
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    console.log("ImageUpload: Starting file upload process...");
    try {
      setUploading(true);

      console.log("ImageUpload: Upload state set to true");

      // Delete previous image if exists
      if (currentFileName) {
        console.log("ImageUpload: Deleting previous image:", currentFileName);
        await deleteImage(currentFileName);
        console.log("ImageUpload: Previous image deleted");
      }

      // Upload new image
      console.log("ImageUpload: Starting image upload...");
      const result = await uploadImage(file, folder);
      console.log("ImageUpload: Image uploaded successfully:", result);

      // Call parent callback
      onImageUploaded(result.url, result.fileName);

      toast.success("Imagen cargada exitosamente");
    } catch (error: any) {
      console.error("ImageUpload: Error uploading image:", error);
      toast.error(error.message || "Error al cargar la imagen");
    } finally {
      console.log("ImageUpload: Setting upload state to false");
      setUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    try {
      if (currentFileName) {
        await deleteImage(currentFileName);
      }
      onImageRemoved();
      toast.success("Imagen eliminada");
    } catch (error: any) {
      console.error("Error removing image:", error);
      toast.error("Error al eliminar la imagen");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const isImageUrl = (url: string) => {
    return url.startsWith("http") || url.startsWith("data:");
  };

  return (
    <div className="space-y-4">
      {/* Current Image Preview */}
      {currentImage && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Imagen Actual
          </label>
          <div className="relative inline-block">
            <div
              className="border rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center"
              style={{ width: maxWidth, height: maxHeight }}
            >
              {isImageUrl(currentImage) ? (
                <img
                  src={currentImage}
                  alt="Icono actual"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-4xl">{currentImage}</span>
              )}
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={handleRemoveImage}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragOver
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpg,image/jpeg,image/svg+xml"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
              <p className="text-sm text-gray-600">Cargando imagen...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <Upload className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Arrastra una imagen aquí o{" "}
                  <button
                    type="button"
                    className="text-orange-500 hover:text-orange-600 font-medium"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    selecciona un archivo
                  </button>
                </p>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full"
      >
        <Image className="h-4 w-4 mr-2" />
        {currentImage ? "Cambiar Imagen" : "Seleccionar Imagen"}
      </Button>
    </div>
  );
};

export default ImageUpload;
