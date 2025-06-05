# 🖼️ Nueva Funcionalidad: Carga de Icono del Header

## ✨ ¿Qué se agregó?

### **Campo de Icono en Configuración**

Ahora puedes cargar tu propio icono personalizado para el header del restaurante que soporta:

- **📁 Formatos:** PNG, JPG, JPEG, SVG
- **📏 Tamaño máximo:** 5MB por archivo
- **☁️ Almacenamiento:** Firebase Storage (persistente)
- **🎨 Tamaño recomendado:** 64x64px para óptima calidad

---

## 🚀 Cómo Usar

### **1. Acceder a la Configuración:**

```
/admin-menu → Configuración → Pestaña "Encabezado"
```

### **2. Cargar Icono:**

- **Arrastrar y soltar:** Arrastra tu imagen al área de carga
- **Seleccionar archivo:** Haz clic en "Seleccionar Imagen"
- **Validación automática:** El sistema verifica formato y tamaño

### **3. Vista Previa:**

- Ver el icono en tiempo real en la vista previa
- El icono se actualiza automáticamente en el menú del cliente

### **4. Guardar:**

- Haz clic en "Guardar" para aplicar los cambios
- El icono se almacena permanentemente en Firebase

---

## 🎯 Funcionalidades

### **📤 Carga de Imagen:**

- ✅ **Drag & Drop** - Arrastra archivos directamente
- ✅ **Click to Upload** - Botón tradicional de selección
- ✅ **Validación automática** - Formato y tamaño
- ✅ **Preview instantáneo** - Ve el resultado al momento

### **🔄 Gestión de Archivos:**

- ✅ **Reemplazo automático** - Elimina la imagen anterior al subir nueva
- ✅ **Eliminar icono** - Botón X para quitar la imagen
- ✅ **Fallback a emoji** - Vuelve al emoji 🍽️ por defecto

### **☁️ Firebase Storage:**

- ✅ **Almacenamiento persistente** - No se pierde al recargar
- ✅ **URLs únicas** - Cada imagen tiene su URL propia
- ✅ **Limpieza automática** - Elimina archivos antiguos

---

## 🎨 Casos de Uso

### **🏷️ Logo de Restaurante:**

```
1. Sube el logo oficial de tu restaurante
2. Formato recomendado: PNG con fondo transparente
3. Tamaño: 64x64px para mejor calidad
4. Resultado: Logo profesional en el header
```

### **🎃 Temas Estacionales:**

```
1. Halloween: Icono de calabaza 🎃
2. Navidad: Icono navideño 🎄
3. San Valentín: Corazón ❤️
4. Cambio rápido según la época
```

### **🎯 Branding Personalizado:**

```
1. Icono único que represente tu marca
2. Consistencia visual en toda la app
3. Diferenciación de la competencia
```

---

## 📐 Especificaciones Técnicas

### **Formatos Soportados:**

- **PNG** - Recomendado para logos con transparencia
- **JPG/JPEG** - Para fotografías o iconos sin transparencia
- **SVG** - Vectorial, escala perfectamente

### **Limitaciones:**

- **Tamaño máximo:** 5MB
- **Dimensiones recomendadas:** 64x64px, 128x128px, o 256x256px
- **Aspecto:** Se recomienda iconos cuadrados (1:1)

### **Almacenamiento:**

```
Ubicación: Firebase Storage
Carpeta: /header-icons/
Nomenclatura: timestamp_random.extension
```

---

## 🔧 Implementación Técnica

### **Archivos Creados:**

- `src/lib/storageUtils.ts` - Utilidades para Firebase Storage
- `src/components/ImageUpload.tsx` - Componente de carga de imagen

### **Archivos Modificados:**

- `src/lib/firebase.ts` - Configuración de Storage
- `src/contexts/SettingsContext.tsx` - Campos de icono
- `src/pages/Settings.tsx` - Interfaz de carga
- `src/pages/CustomerMenu.tsx` - Mostrar icono dinámico

### **Firebase Storage Rules (Requeridas):**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /header-icons/{allPaths=**} {
      allow read: if true;  // Público para lectura
      allow write: if true; // Permitir carga (en producción agregar auth)
    }
  }
}
```

---

## 🛠️ Solución de Problemas

### **❌ Error: "Tipo de archivo no permitido"**

**Causa:** Archivo con extensión no soportada
**Solución:** Usa PNG, JPG o SVG únicamente

### **❌ Error: "Archivo demasiado grande"**

**Causa:** Imagen superior a 5MB
**Solución:** Comprime la imagen o usa formato más eficiente

### **❌ Error: "No se puede cargar imagen"**

**Causa:** Problemas de conexión o configuración Firebase
**Solución:**

1. Verifica conexión a internet
2. Revisa configuración de Firebase Storage
3. Verifica que el bucket existe

### **❌ Icono no aparece después de cargar**

**Causa:** Configuración de Storage Rules
**Solución:**

1. Ve a Firebase Console → Storage → Rules
2. Agrega reglas de lectura pública para header-icons

---

## 🎉 Resultado Final

### **Antes:**

- Icono fijo: 🍽️ (emoji)
- Sin posibilidad de personalización
- Aspecto genérico

### **Después:**

- ✅ **Icono personalizado** - Tu logo o imagen
- ✅ **Carga fácil** - Drag & drop o click
- ✅ **Almacenamiento persistente** - Firebase Storage
- ✅ **Vista previa en tiempo real**
- ✅ **Gestión completa** - Cargar, reemplazar, eliminar
- ✅ **Validación automática** - Formato y tamaño
- ✅ **Branding profesional** - Logo único del restaurante

**¡Ahora tu restaurante tiene una identidad visual única! 🎨**

---

## 📋 Próximos Pasos Recomendados

1. **Prepara tu logo:** Formato PNG, 64x64px, fondo transparente
2. **Ve a Settings:** `/admin-menu` → "Configuración"
3. **Carga tu icono:** Pestaña "Encabezado"
4. **Prueba la funcionalidad:** Vista previa y guardado
5. **Verifica el resultado:** Ve al menú del cliente

**¡Tu restaurante ahora tiene su propio icono personalizado! 🚀**
