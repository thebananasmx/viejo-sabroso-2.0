# 🍽️ Viejo Sabroso 2 - Restaurant Management App

**Version:** 3.1  
**Demo:** [Ver aplicación en vivo](https://viejo-sabroso-2.vercel.app)

## 📱 Descripción

**Viejo Sabroso 2** es una aplicación completa de gestión de restaurante con **tiempo real**, diseñada con enfoque **mobile-first** y tema **Halloween Orange**. Incluye tres interfaces principales: menú para clientes, panel de cocina y administración.

## ✨ Características Principales

### 🍽️ **Menú Cliente** (`/menu-cliente`)

- ✅ Layout de tres columnas con imágenes del lado izquierdo
- ✅ Productos en tiempo real desde Firebase
- ✅ Carrito de compras funcional
- ✅ Filtros por categoría (Comida, Bebidas, Postres)
- ✅ Proceso completo de pedidos
- ✅ Notificaciones toast en parte inferior

### 👨‍🍳 **Panel Cocina** (`/cocina`)

- ✅ Órdenes en tiempo real
- ✅ Gestión de estados (Nuevo → En Preparación → Listo → Entregado)
- ✅ Estadísticas dinámicas actualizadas automáticamente
- ✅ Filtros por estado de orden
- ✅ Interfaz limpia sin botones auxiliares

### ⚙️ **Administración** (`/admin-menu`)

- ✅ CRUD completo de productos en tiempo real
- ✅ Layout de tres columnas con imágenes
- ✅ Botones de acción organizados verticalmente
- ✅ Toggle de disponibilidad de productos
- ✅ Sistema de imágenes placeholder automático

## 🛠️ Stack Tecnológico

- **React 18.3.1** + **TypeScript 5.5.3**
- **Firebase 11.8.1** (Firestore tiempo real)
- **Tailwind CSS 3.4.11** (Mobile-first)
- **Vite 6.2.2** (Build tool)
- **Sonner 1.5.0** (Notificaciones toast)
- **React Router DOM 6.26.2** (Navegación)

## 🎨 Diseño

- **Tema:** Halloween Orange (#FF7518)
- **Moneda:** Pesos Mexicanos (MXN)
- **Enfoque:** Mobile-first responsive
- **Layout:** Sistema de tres columnas optimizado (25% - 50% - 25%)
- **Notificaciones:** Toast en parte inferior para mejor UX móvil

## 🔥 Firebase Setup

El proyecto está configurado con Firebase Firestore para sincronización en tiempo real:

```javascript
const firebaseConfig = {
  projectId: "viejo-sabroso",
  // ... configuración completa incluida
};
```

### 📊 Colecciones:

- **`menu_items`** - Productos del menú con imágenes
- **`orders`** - Órdenes de clientes con estados

## 🚀 Instalación y Desarrollo

### **Prerrequisitos:**

- Node.js 18+
- npm o yarn

### **Pasos:**

1. **Clonar repositorio:**

```bash
git clone https://github.com/TU_USUARIO/viejo-sabroso-2.git
cd viejo-sabroso-2
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ejecutar en desarrollo:**

```bash
npm run dev
```

4. **Abrir en navegador:**

```
http://localhost:8080
```

## 📦 Scripts Disponibles

```bash
npm run dev          # Servidor desarrollo
npm run build        # Build para producción
npm run typecheck    # Verificación TypeScript
npm run format.fix   # Formatear código
npm run test         # Ejecutar tests
```

## 🌐 Deploy en Vercel

Este proyecto está optimizado para **Vercel**:

1. **Fork este repositorio**
2. **Conecta con Vercel**
3. **Deploy automático** - Sin configuración adicional necesaria

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/viejo-sabroso-2)

## 📱 Rutas Principales

- **`/`** - Página principal con navegación
- **`/menu-cliente`** - Menú para clientes con layout 3 columnas
- **`/cocina`** - Panel de cocina con tiempo real
- **`/admin-menu`** - Panel de administración con CRUD completo

## 🎯 Funcionalidades en Tiempo Real

### **Flujo Completo:**

1. **Admin agrega producto** → Aparece automáticamente en menú cliente
2. **Cliente hace pedido** → Aparece inmediatamente en cocina
3. **Cocina cambia estado** → Se actualiza en tiempo real
4. **Notificaciones toast** → Feedback visual en parte inferior

### **Layout Visual v3.1:**

```
┌─────────────────────────────────────────┐
│ [Imagen] [Información] [Precio/Acciones] │
│ ┌─────┐  Nombre del Producto    $85.00   │
│ │ 64px│  Descripción del        [+] / 👁️ │
│ │ 64px│  producto aquí...       ✏️ / 🗑️  │
│ └─────┘                                 │
└─────────────────────────────────────────┘
```

## 📸 Sistema de Imágenes

### **Placeholder Automático:**

```javascript
const getPlaceholderImage = (item) => {
  const seed = item.name.toLowerCase().replace(/\s+/g, "-");

  if (item.category === "comida") {
    return `https://picsum.photos/seed/${seed}-food/200/200`;
  } else if (item.category === "bebidas") {
    return `https://picsum.photos/seed/${seed}-drink/200/200`;
  } else {
    return `https://picsum.photos/seed/${seed}-dessert/200/200`;
  }
};
```

- ✅ **URLs únicas** por producto
- ✅ **Fallback robusto** con emoji si falla
- ✅ **Categorización visual** por tipo

## 🔄 Changelog

### **v3.1** (Actual)

- ✅ Notificaciones toast reposicionadas a parte inferior
- ✅ UX móvil mejorada
- ✅ Mejor visibilidad en dispositivos móviles

### **v3.0**

- ✅ Layout de tres columnas implementado
- ✅ Sistema de imágenes con placeholder automático
- ✅ Botones de acción organizados verticalmente
- ✅ Imágenes del lado izquierdo

### **v2.0**

- ✅ Firebase integrado con tiempo real
- ✅ Elementos de desarrollo eliminados
- ✅ Interfaz completamente limpia

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- **Firebase** por la base de datos en tiempo real
- **Vercel** por el hosting gratuito
- **Tailwind CSS** por el sistema de estilos
- **Sonner** por las notificaciones toast
- **Lucide React** por los iconos

---

**Desarrollado con ❤️ para gestión de restaurantes**

🌟 **Star este repo** si te fue útil!
