#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

// Crear ZIP con todo el proyecto
function createProjectZip() {
  const output = fs.createWriteStream("viejo-sabroso-v3.1.zip");
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });

  output.on("close", function () {
    console.log("✅ ZIP creado exitosamente!");
    console.log(`📦 Tamaño: ${archive.pointer()} bytes`);
    console.log("📁 Archivo: viejo-sabroso-v3.1.zip");
    console.log("");
    console.log("🚀 Próximos pasos:");
    console.log("1. Descargar el archivo ZIP");
    console.log("2. Extraer en tu computadora local");
    console.log("3. Seguir las instrucciones de GitHub");
  });

  output.on("end", function () {
    console.log("Data has been drained");
  });

  archive.on("warning", function (err) {
    if (err.code === "ENOENT") {
      console.warn(err);
    } else {
      throw err;
    }
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(output);

  // Agregar archivos del proyecto
  const filesToInclude = [
    "package.json",
    "package-lock.json",
    "index.html",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
    "tailwind.config.ts",
    "postcss.config.js",
    ".gitignore",
    "README.md",
    "vercel.json",
    "PUNTO_BACKUP_V3_1.md",
    "PUNTO_RESTAURACION_V3.md",
    "PUNTO_RESPALDO_V2.md",
  ];

  // Agregar archivos individuales
  filesToInclude.forEach((file) => {
    if (fs.existsSync(file)) {
      archive.file(file, { name: file });
    }
  });

  // Agregar directorios completos
  const dirsToInclude = ["src", "public"];

  dirsToInclude.forEach((dir) => {
    if (fs.existsSync(dir)) {
      archive.directory(dir, dir);
    }
  });

  archive.finalize();
}

// Ejecutar
console.log("🏗️  Generando ZIP del proyecto Viejo Sabroso v3.1...");
console.log("");

try {
  createProjectZip();
} catch (error) {
  console.error("❌ Error al crear ZIP:", error);
}
