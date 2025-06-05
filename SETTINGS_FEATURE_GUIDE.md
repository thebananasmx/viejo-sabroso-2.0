# 🎨 Nueva Funcionalidad: Página de Configuración

## ✨ ¿Qué se agregó?

### **Nueva Página: `/settings`**

Una página completa de configuración donde puedes personalizar:

1. **📝 Encabezado del Menú**

   - Título principal (ej: "Viejo Sabroso")
   - Subtítulo (ej: "Summerween 25")

2. **🌐 Configuración de Página**

   - Título del navegador
   - Descripción para SEO
   - Color del tema

3. **📱 Redes Sociales (OpenGraph)**

   - Título para compartir
   - Descripción para compartir
   - Imagen principal
   - URL del sitio

4. **🎯 Iconos**
   - Favicon (ícono del navegador)
   - Web Clip (ícono de iOS)

---

## 🚀 Cómo Acceder

### **Desde Admin Panel:**

1. Ve a `/admin-menu`
2. Haz clic en **"Configuración"** (botón gris al lado de "Agregar")
3. ¡Listo! Estás en la página de configuración

### **URL Directa:**

- Navega directamente a: `/settings`

---

## 🎛️ Funcionalidades

### **📱 Interfaz con Pestañas:**

- **Encabezado:** Título y subtítulo del restaurante
- **Página:** Metadata y configuración SEO
- **Redes Sociales:** OpenGraph para compartir
- **Iconos:** Favicon y web clip

### **⚡ Características:**

- ✅ **Guardado automático** en Firebase
- ✅ **Vista previa en tiempo real**
- ✅ **Cambios dinámicos** (sin necesidad de recargar)
- ✅ **Validación de formularios**
- ✅ **Notificaciones toast** de confirmación

### **🔄 Actualización Automática:**

- Los cambios se reflejan **inmediatamente** en el menú del cliente
- El título del navegador se actualiza al instante
- Los meta tags se modifican dinámicamente

---

## 📝 Cómo Usar

### **1. Editar Encabezado:**

```
Título Principal: "Tu Restaurante"
Subtítulo: "Tu eslogan aquí"
```

**Resultado:** Se actualiza automáticamente en `/menu-cliente`

### **2. Configurar Página:**

```
Título: "Tu Restaurante - Comida Deliciosa"
Descripción: "Descripción para Google..."
Color: #FF7518 (o el color que prefieras)
```

### **3. Redes Sociales:**

```
Título: Para cuando compartan en Facebook/Twitter
Descripción: Descripción atractiva
Imagen: URL de imagen 1200x630px
URL: Tu dominio principal
```

### **4. Iconos:**

```
Favicon: /favicon.ico (16x16 o 32x32px)
Web Clip: /apple-touch-icon.png (180x180px)
```

---

## 🛠️ Técnico: Lo que se Implementó

### **Archivos Creados:**

- `src/contexts/SettingsContext.tsx` - Contexto global de configuración
- `src/pages/Settings.tsx` - Página de configuración
- Funciones en `src/lib/firestore.ts` - Persistencia en Firebase

### **Archivos Modificados:**

- `src/App.tsx` - Nueva ruta `/settings` y SettingsProvider
- `src/pages/CustomerMenu.tsx` - Header dinámico
- `src/pages/AdminMenu.tsx` - Botón de acceso a configuración

### **Base de Datos:**

- Nueva colección: `appSettings`
- Documento: `main` con toda la configuración

---

## 🎯 Casos de Uso

### **🎃 Cambiar de Tema (Halloween → Navidad):**

1. Ve a Settings → Encabezado
2. Cambia subtítulo de "Summerween 25" → "Navidad 2024"
3. Ve a Página → cambia color de naranja a rojo
4. Guarda → ¡Todo actualizado!

### **📱 Optimizar para Móviles:**

1. Ve a Settings → Iconos
2. Sube favicon optimizado
3. Sube web clip para iOS
4. Los usuarios verán íconos profesionales

### **📈 Mejorar SEO:**

1. Ve a Settings → Página
2. Optimiza título y descripción
3. Ve a Redes Sociales → configura OpenGraph
4. Mejor posicionamiento en Google

---

## 🔧 Herramientas Útiles Integradas

### **Generadores de Iconos:**

- **Favicon Generator:** Botón directo a favicon.io
- **Apple Icon Generator:** Botón a realfavicongenerator.net

### **Vista Previa:**

- **Botón "Vista Previa":** Abre nueva pestaña con cambios aplicados
- **Preview en tiempo real:** En las pestañas de configuración

---

## 💾 Persistencia

### **Firebase Integration:**

- Todos los cambios se guardan automáticamente en Firestore
- Colección: `appSettings/main`
- Sincronización en tiempo real entre pestañas

### **Fallbacks:**

- Si no hay configuración guardada, usa valores por defecto
- Manejo de errores con notificaciones toast

---

## 🎉 Resultado Final

**Antes:**

- Título y subtítulo hardcodeados
- Sin control sobre metadata
- Sin configuración de iconos

**Después:**

- ✅ Control total sobre el encabezado
- ✅ SEO optimizado y configurable
- ✅ Iconos profesionales
- ✅ Compartido en redes sociales optimizado
- ✅ Actualización en tiempo real
- ✅ Interfaz fácil de usar

**¡Tu app ahora es completamente personalizable! 🎨**
