# 📁 ARCHIVOS PARA COPIAR A GITHUB

## 🎯 **MÉTODO SIMPLE: COPIA Y PEGA**

### **PASO 1: Crear repositorio en GitHub**

1. Ve a [github.com/new](https://github.com/new)
2. Nombre: `viejo-sabroso`
3. Público ✅
4. Initialize with README ✅

### **PASO 2: Agregar archivos uno por uno**

#### **📄 ARCHIVOS RAÍZ (Copia el contenido completo):**

**1. `package.json`** ← Ya creado arriba
**2. `.gitignore`** ← Ya creado arriba  
**3. `README.md`** ← Ya creado arriba
**4. `vercel.json`** ← Ya creado arriba

**5. `index.html`** ← Copia desde la aplicación actual
**6. `vite.config.ts`** ← Copia desde la aplicación actual
**7. `tailwind.config.ts`** ← Copia desde la aplicación actual
**8. `tsconfig.json`** ��� Copia desde la aplicación actual
**9. `tsconfig.app.json`** ← Copia desde la aplicación actual
**10. `tsconfig.node.json`** ← Copia desde la aplicación actual
**11. `postcss.config.js`** ← Copia desde la aplicación actual

#### **📂 DIRECTORIO `src/` (Crear estructura):**

```
src/
├── components/
│   └── ui/ (todos los archivos del shadcn)
├── hooks/
│   ├── useRealtimeMenuItems.ts ✅ CRÍTICO
│   ├── useRealtimeOrders.ts ✅ CRÍTICO
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── firebase.ts ✅ CRÍTICO (configuración Firebase)
│   ├── firestore.ts ✅ CRÍTICO (servicios tiempo real)
│   └── utils.ts
├── pages/
│   ├── Index.tsx ✅ CRÍTICO
│   ├── CustomerMenu.tsx ✅ CRÍTICO (layout 3 columnas v3.1)
│   ├── Kitchen.tsx ✅ CRÍTICO (tiempo real)
│   ├── AdminMenu.tsx ✅ CRÍTICO (CRUD + botones verticales)
│   └── NotFound.tsx
├── types/
│   └── index.ts ✅ CRÍTICO (definiciones TypeScript)
├── App.tsx ✅ CRÍTICO (router + toast bottom v3.1)
├── main.tsx ✅ CRÍTICO
└── index.css ✅ CRÍTICO (estilos globales)
```

#### **📂 DIRECTORIO `public/` (si existe):**

- Cualquier archivo estático

---

## 🚀 **ARCHIVOS MÁS CRÍTICOS (PRIORIDAD ALTA):**

### **1. `src/App.tsx`** (Router + Toast bottom)

### **2. `src/pages/CustomerMenu.tsx`** (Layout 3 columnas)

### **3. `src/pages/AdminMenu.tsx`** (CRUD + botones verticales)

### **4. `src/pages/Kitchen.tsx`** (Tiempo real)

### **5. `src/lib/firebase.ts`** (Configuración Firebase)

### **6. `src/lib/firestore.ts`** (Servicios tiempo real)

### **7. `src/hooks/useRealtimeMenuItems.ts`** (Hook productos)

### **8. `src/hooks/useRealtimeOrders.ts`** (Hook órdenes)

### **9. `package.json`** (Dependencias)

### **10. `vite.config.ts`** (Configuración build)

---

## 🎯 **PROCESO PASO A PASO:**

### **En GitHub:**

1. **Create new file** → `src/App.tsx`
2. **Pegar contenido** del App.tsx actual
3. **Commit changes**
4. **Repetir** para cada archivo crítico

### **Estructura sugerida:**

```
📁 Commit 1: "🏗️ Project setup"
   - package.json, vite.config.ts, tsconfig.json

📁 Commit 2: "🔥 Firebase integration"
   - src/lib/firebase.ts, src/lib/firestore.ts

📁 Commit 3: "🎣 Real-time hooks"
   - src/hooks/useRealtimeMenuItems.ts
   - src/hooks/useRealtimeOrders.ts

📁 Commit 4: "📱 Core pages v3.1"
   - src/App.tsx (toast bottom)
   - src/pages/CustomerMenu.tsx (layout 3 col)
   - src/pages/AdminMenu.tsx (botones verticales)
   - src/pages/Kitchen.tsx

📁 Commit 5: "🎨 Styles and types"
   - src/index.css, src/types/index.ts
```

---

## ⚡ **DEPLOY AUTOMÁTICO EN VERCEL:**

Una vez subidos los archivos:

1. **Vercel.com** → **New Project**
2. **Import from GitHub** → `viejo-sabroso`
3. **Deploy** (automático)

**URL final:** `https://viejo-sabroso.vercel.app`

---

## 🎉 **RESULTADO ESPERADO:**

✅ **Aplicación funcionando** en Vercel  
✅ **Firebase tiempo real** conectado  
✅ **Layout 3 columnas** responsive  
✅ **Notificaciones bottom** funcionando  
✅ **CRUD completo** productos  
✅ **Tema Halloween Orange** preservado
