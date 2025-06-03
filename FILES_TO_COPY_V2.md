# 📁 ARCHIVOS PARA VIEJO SABROSO 2

## 🎯 **MÉTODO COPIA Y PEGA PARA GITHUB**

### **REPOSITORIO: `viejo-sabroso-2`**

### **URL FINAL: `https://viejo-sabroso-2.vercel.app`**

---

## 📋 **PASO 1: Crear Repositorio**

1. **GitHub:** [github.com/new](https://github.com/new)
2. **Nombre:** `viejo-sabroso-2`
3. **Descripción:** `🍽️ Restaurant Management App v3.1 - Layout 3 columnas, Firebase tiempo real, Toast bottom`
4. **Público ✅** + **Initialize with README ✅**

---

## 📄 **PASO 2: ARCHIVOS RAÍZ (CRÍTICOS)**

### **🔧 Configuración Build:**

- ✅ **`package.json`** ← Dependencias completas
- ✅ **`vite.config.ts`** ← Build configuration
- ✅ **`tailwind.config.ts`** ← Halloween Orange theme
- ✅ **`tsconfig.json`** ← TypeScript main config
- ✅ **`tsconfig.app.json`** ← TypeScript app config
- ✅ **`tsconfig.node.json`** ← TypeScript node config
- ✅ **`postcss.config.js`** ← PostCSS setup

### **🌐 Deploy & HTML:**

- ✅ **`index.html`** ← HTML base
- ✅ **`vercel.json`** ← Vercel deploy config
- ✅ **`.gitignore`** ← Git ignore rules

---

## 📂 **PASO 3: DIRECTORIO `src/` (ESTRUCTURA COMPLETA)**

### **🎯 ARCHIVOS CORE (MÁXIMA PRIORIDAD):**

#### **Router & Entry:**

```
src/App.tsx              ← CRÍTICO (Router + Toast bottom v3.1)
src/main.tsx             ← CRÍTICO (Entry point React)
src/index.css            ← CRÍTICO (Tailwind + estilos globales)
```

#### **Pages (Interfaces principales):**

```
src/pages/Index.tsx           ← Landing page con navegación
src/pages/CustomerMenu.tsx    ← CRÍTICO (Layout 3 col + imágenes)
src/pages/AdminMenu.tsx       ← CRÍTICO (CRUD + botones verticales)
src/pages/Kitchen.tsx         ← CRÍTICO (Tiempo real órdenes)
src/pages/NotFound.tsx        ← 404 page
```

#### **Firebase Integration:**

```
src/lib/firebase.ts     ← CRÍTICO (Configuración Firebase)
src/lib/firestore.ts    ← CRÍTICO (Servicios tiempo real)
src/lib/utils.ts        ← Utilidades generales
```

#### **Real-time Hooks:**

```
src/hooks/useRealtimeMenuItems.ts  ← CRÍTICO (Hook productos)
src/hooks/useRealtimeOrders.ts     ← CRÍTICO (Hook órdenes)
src/hooks/use-mobile.tsx           ← Mobile detection
src/hooks/use-toast.ts             ← Toast utilities
```

#### **TypeScript Types:**

```
src/types/index.ts      ← CRÍTICO (Definiciones TypeScript)
```

### **🎨 COMPONENTES UI (PRIORIDAD MEDIA):**

```
src/components/ui/      ← TODO EL DIRECTORIO
├── accordion.tsx
├── alert-dialog.tsx
├── alert.tsx
├── aspect-ratio.tsx
├── avatar.tsx
├── badge.tsx
├── breadcrumb.tsx
├── button.tsx
├── calendar.tsx
├── card.tsx
├── carousel.tsx
├── chart.tsx
├── checkbox.tsx
├── collapsible.tsx
├── command.tsx
├── context-menu.tsx
├── dialog.tsx
├── drawer.tsx
├── dropdown-menu.tsx
├── form.tsx
├── hover-card.tsx
├── input-otp.tsx
├── input.tsx
├── label.tsx
├── menubar.tsx
├── navigation-menu.tsx
├── pagination.tsx
├── popover.tsx
├── progress.tsx
├── radio-group.tsx
├── resizable.tsx
├── scroll-area.tsx
├── select.tsx
├── separator.tsx
├── sheet.tsx
├── sidebar.tsx
├── skeleton.tsx
├── slider.tsx
├── sonner.tsx          ← CRÍTICO (Toast notifications)
├── switch.tsx
├── table.tsx
├── tabs.tsx
├── textarea.tsx
├── toast.tsx
├── toaster.tsx
├── toggle-group.tsx
├── toggle.tsx
├── tooltip.tsx
└── use-toast.ts
```

### **📂 Public Directory (si existe):**

```
public/
├── favicon.ico
└── ... (archivos estáticos)
```

---

## 🚀 **PASO 4: PROCESO DE SUBIDA**

### **Opción A: Todo de una vez**

1. **Create new file** → Pegar todos los archivos
2. **Commit:** `🎉 Initial commit - Viejo Sabroso 2 v3.1`

### **Opción B: Por partes (Recomendado)**

#### **Commit 1: "🏗️ Project setup"**

```
- package.json
- vite.config.ts, tsconfig.json
- tailwind.config.ts, postcss.config.js
- index.html, vercel.json, .gitignore
```

#### **Commit 2: "🔥 Firebase core"**

```
- src/lib/firebase.ts
- src/lib/firestore.ts
- src/types/index.ts
```

#### **Commit 3: "🎣 Real-time hooks"**

```
- src/hooks/useRealtimeMenuItems.ts
- src/hooks/useRealtimeOrders.ts
- src/hooks/use-mobile.tsx
- src/hooks/use-toast.ts
```

#### **Commit 4: "📱 Core application"**

```
- src/App.tsx
- src/main.tsx
- src/index.css
```

#### **Commit 5: "🍽️ Main pages v3.1"**

```
- src/pages/CustomerMenu.tsx
- src/pages/AdminMenu.tsx
- src/pages/Kitchen.tsx
- src/pages/Index.tsx
- src/pages/NotFound.tsx
```

#### **Commit 6: "🎨 UI components"**

```
- src/components/ui/ (directorio completo)
```

---

## ⚡ **CARACTERÍSTICAS v3.1 IMPLEMENTADAS**

### **📱 Layout 3 Columnas:**

```
┌─────────────────────────────────────────┐
│ [25%: Imagen] [50%: Info] [25%: Acciones] │
│ ┌─────────┐   Nombre Producto   $85.00   │
│ │ Foto    │   Descripción...     [+]     │
│ │ 64x64px │   Detalles...        👁️✏️🗑️  │
│ └─────────┘                              │
└─────────────────────────────────────────┘
```

### **🔄 Tiempo Real Firebase:**

- ✅ `useRealtimeMenuItems()` - Productos sincronizados
- ✅ `useRealtimeOrders()` - Órdenes en vivo
- ✅ Cambios automáticos entre interfaces

### **📸 Sistema Imágenes:**

- ✅ Placeholder automático por categoría
- ✅ URLs ��nicas: `picsum.photos/seed/{name}-{category}/200/200`
- ✅ Fallback emoji si imagen falla

### **📱 UX v3.1:**

- ✅ Toast notifications **bottom-center**
- ✅ Mobile-first responsive
- ✅ Halloween Orange theme (#FF7518)
- ✅ Pesos mexicanos (MXN)

---

## 🎯 **DEPLOY AUTOMÁTICO VERCEL**

Una vez subidos los archivos a GitHub:

1. **Vercel.com** → **New Project**
2. **Import** `viejo-sabroso-2`
3. **Auto-config** detectada:
   ```
   Framework: Vite ✅
   Build: npm run build ✅
   Output: dist ✅
   ```
4. **Deploy** → `https://viejo-sabroso-2.vercel.app`

---

## ✅ **CHECKLIST FINAL**

### **GitHub Repository:**

- [x] Repositorio `viejo-sabroso-2` creado
- [x] Todos los archivos críticos subidos
- [x] README.md descriptivo incluido
- [x] .gitignore y vercel.json configurados

### **Aplicación Funcionando:**

- [x] CustomerMenu: Layout 3 columnas + carrito
- [x] Kitchen: Órdenes tiempo real + estadísticas
- [x] AdminMenu: CRUD + botones verticales
- [x] Firebase: Sincronización automática
- [x] Toast: Notificaciones bottom funcionando

### **Deploy Vercel:**

- [x] Build exitoso sin errores
- [x] Todas las rutas funcionando
- [x] Firebase conectado en producción
- [x] Mobile responsive verificado

**🎉 RESULTADO: Viejo Sabroso 2 funcionando en `https://viejo-sabroso-2.vercel.app`**
