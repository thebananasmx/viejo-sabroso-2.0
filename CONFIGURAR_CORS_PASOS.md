# 🔧 Configurar CORS en Firebase Storage - Paso a Paso

## 🎯 **Tu URL actual:** `https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev`

---

## 📋 **Pasos para Configurar CORS:**

### **Paso 1: Instalar Google Cloud SDK**

#### **En Windows:**

1. Ve a: https://cloud.google.com/sdk/docs/install
2. Descarga el instalador de Windows
3. Ejecuta el instalador y sigue las instrucciones
4. Abre **Command Prompt** o **PowerShell**

#### **En macOS:**

```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

#### **En Linux:**

```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

### **Paso 2: Autenticarse con Google Cloud**

```bash
gcloud auth login
```

- Se abrirá tu navegador
- Inicia sesión con la cuenta de Google que tienes en Firebase
- Autoriza el acceso

### **Paso 3: Configurar el Proyecto**

```bash
gcloud config set project viejo-sabroso
```

### **Paso 4: Aplicar Configuración CORS**

```bash
gsutil cors set cors.json gs://viejo-sabroso.firebasestorage.app
```

### **Paso 5: Verificar que se Aplicó**

```bash
gsutil cors get gs://viejo-sabroso.firebasestorage.app
```

**Deberías ver algo así:**

```json
[
  {
    "maxAgeSeconds": 3600,
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "origin": ["*"],
    "responseHeader": [
      "Content-Type",
      "Access-Control-Allow-Origin",
      "x-goog-resumable"
    ]
  }
]
```

---

## ✅ **Después de Configurar CORS:**

### **1. Reinicia tu Navegador**

- Cierra completamente el navegador
- Abre de nuevo y ve a tu app

### **2. Prueba la Carga de Imagen**

- Ve a: `https://b1f5216062f947e49aa2c9a89eea18c5-e4d97d75f71846858b3a6b065.fly.dev/settings`
- Pestaña "Encabezado"
- Intenta cargar una imagen

### **3. Verifica en Console**

- Abre DevTools (F12)
- Ya NO deberías ver errores CORS
- La imagen debería subir correctamente

---

## 🚨 **Solución de Problemas:**

### **Error: "gcloud command not found"**

- Reinicia la terminal después de instalar
- En Windows: usa Command Prompt como administrador

### **Error: "gsutil command not found"**

```bash
gcloud components install gsutil
```

### **Error: "AccessDenied"**

- Verifica que usaste la cuenta correcta en `gcloud auth login`
- Debe ser la misma cuenta que tiene acceso al proyecto Firebase

### **Error persiste después de CORS**

- Reinicia el navegador completamente
- Prueba en ventana de incógnito
- Verifica que no hay cache

---

## 📱 **Comandos de Verificación:**

### **Ver proyectos disponibles:**

```bash
gcloud projects list
```

### **Ver cuenta actual:**

```bash
gcloud auth list
```

### **Ver configuración CORS actual:**

```bash
gsutil cors get gs://viejo-sabroso.firebasestorage.app
```

---

## 🎉 **¡Listo!**

Después de estos pasos:

- ✅ **CORS configurado** para tu dominio de Fly.dev
- ✅ **Firebase Storage** permitirá uploads desde tu app
- ✅ **Carga de imágenes** funcionará correctamente
- ✅ **No más errores** de "blocked by CORS policy"

---

## 💡 **¿Necesitas Ayuda?**

Si encuentras algún problema:

1. **Copia el error exacto** que aparece
2. **Verifica** que completaste todos los pasos
3. **Reinicia** el navegador después de aplicar CORS

**¡La carga de iconos funcionará perfectamente después de esto! 🎨**
