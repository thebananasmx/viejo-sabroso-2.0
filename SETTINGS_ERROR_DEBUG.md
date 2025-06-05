# 🐛 Solución de Errores de Configuración

## 🔍 Debugging del Error de Guardado

### **1. Verificar en la Consola del Navegador**

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña **Console**
3. Intenta guardar la configuración
4. Busca mensajes de error específicos

### **2. Errores Comunes y Soluciones**

#### **❌ Error: "Firebase: Missing or insufficient permissions"**

**Causa:** Reglas de Firestore muy restrictivas
**Solución:**

```javascript
// En Firebase Console → Firestore → Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /appSettings/{document} {
      allow read, write: if true;
    }
  }
}
```

#### **❌ Error: "Firebase: No Firebase App '[DEFAULT]'"**

**Causa:** Firebase no inicializado correctamente
**Solución:** Verificar variables de entorno:

```
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-dominio
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_STORAGE_BUCKET=tu-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

#### **❌ Error: "Storage bucket not configured"**

**Causa:** Firebase Storage no configurado
**Solución:**

1. Ve a Firebase Console → Storage
2. Habilita Firebase Storage
3. Configura reglas de Storage

#### **❌ Error: "Cannot read properties of undefined"**

**Causa:** Datos malformados o campos faltantes
**Solución:** Verificar estructura de datos en código

---

## 🔧 Pasos de Resolución

### **Paso 1: Verificar Configuración de Firebase**

```bash
# Verifica que tengas todas las variables de entorno
echo $VITE_FIREBASE_PROJECT_ID
```

### **Paso 2: Verificar Reglas de Firestore**

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. Ve a **Firestore Database** → **Rules**
4. Asegúrate que permita leer/escribir `appSettings`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /appSettings/{document} {
      allow read, write: if true;
    }
  }
}
```

### **Paso 3: Verificar Reglas de Storage (para iconos)**

1. Ve a **Storage** → **Rules**
2. Configura reglas para `header-icons`:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /header-icons/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### **Paso 4: Verificar Conexión**

1. Abre la consola del navegador
2. Ejecuta:

```javascript
console.log("Firebase config:", window.location.origin);
```

---

## 📊 Herramientas de Debugging

### **Console Logs Útiles:**

```javascript
// Ver configuración actual
console.log("Current settings:", settings);

// Ver datos que se intentan guardar
console.log("Form data:", formData);

// Ver errores específicos
console.error("Save error:", error);
```

### **Verificar Estado de Firebase:**

```javascript
// En la consola del navegador
import { db } from "./lib/firebase";
console.log("Firestore instance:", db);
```

---

## 🚨 Soluciones Inmediatas

### **Solución Rápida 1: Resetear Configuración**

```javascript
// En la consola del navegador
localStorage.clear();
window.location.reload();
```

### **Solución Rápida 2: Verificar Conexión Firebase**

1. Ve a Firebase Console
2. Verifica que el proyecto esté activo
3. Verifica límites de uso

### **Solución Rápida 3: Reglas Permisivas Temporales**

```javascript
// Firestore Rules (TEMPORAL - solo para testing)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    allow read, write: if true;
  }
}
```

---

## 📋 Checklist de Verificación

- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Firebase Storage habilitado
- [ ] ✅ Reglas de Firestore permiten `appSettings`
- [ ] ✅ Reglas de Storage permiten `header-icons`
- [ ] ✅ Proyecto Firebase activo
- [ ] ✅ Sin errores en la consola del navegador
- [ ] ✅ Conexión a internet estable

---

## 📞 Pasos de Escalación

### **Si el error persiste:**

1. **Revisar los logs detallados:**

   - Abrir DevTools → Console
   - Intentar guardar configuración
   - Copiar el error exacto

2. **Verificar conectividad:**

   ```bash
   ping firebase.google.com
   ```

3. **Probar en incógnito:**

   - Abrir ventana de incógnito
   - Probar la funcionalidad
   - Si funciona → problema de cache

4. **Verificar cuotas de Firebase:**
   - Firebase Console → Usage
   - Verificar límites de Firestore/Storage

---

## 🔬 Debug Avanzado

### **Habilitar Debug de Firebase:**

```javascript
// Agregar en firebase.ts
import { connectFirestoreEmulator } from "firebase/firestore";

// Solo en desarrollo
if (process.env.NODE_ENV === "development") {
  console.log("Firebase debugging enabled");
}
```

### **Test Manual de Firestore:**

```javascript
// En la consola del navegador
import { doc, setDoc } from "firebase/firestore";
import { db } from "./lib/firebase";

// Test directo
setDoc(doc(db, "appSettings", "test"), { test: "value" })
  .then(() => console.log("Success"))
  .catch((err) => console.error("Error:", err));
```

---

**¡Con estos pasos deberías poder identificar y solucionar el error específico! 🔧**
