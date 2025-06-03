# 🍽️ Viejo Sabroso - Restaurant Management App

**Version:** 3.1  
**Demo:** [Ver aplicación en vivo](https://viejo-sabroso.vercel.app)

## 📱 Descripción

**Viejo Sabroso** es una aplicación completa de gestión de restaurante con **tiempo real**, diseñada con enfoque **mobile-first** y tema **Halloween Orange**. Incluye tres interfaces principales: menú para clientes, panel de cocina y administración.

## ✨ Características Principales

### 🍽️ **Menú Cliente** (`/menu-cliente`)

- ✅ Layout de tres columnas con imágenes
- ✅ Productos en tiempo real desde Firebase
- ✅ Carrito de compras funcional
- ✅ Filtros por categoría (Comida, Bebidas, Postres)
- ✅ Proceso completo de pedidos

### 👨‍🍳 **Panel Cocina** (`/cocina`)

- ✅ Órdenes en tiempo real
- ✅ Gestión de estados (Nuevo → En Preparación → Listo → Entregado)
- ✅ Estadísticas dinámicas
- ✅ Filtros por estado de orden

### ⚙️ **Administración** (`/admin-menu`)

- ✅ CRUD completo de productos
- ✅ Layout de tres columnas con imágenes
- ✅ Botones de acción organizados verticalmente
- ✅ Toggle de disponibilidad de productos

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
- **Layout:** Sistema de tres columnas optimizado

## 🔥 Firebase Setup

El proyecto está configurado con Firebase Firestore para sincronización en tiempo real:

```javascript
const firebaseConfig = {
  projectId: "viejo-sabroso",
  // ... configuración completa incluida
};
```

### 📊 Colecciones:

- **`menu_items`** - Productos del menú
- **`orders`** - Órdenes de clientes

## 🚀 Instalación y Desarrollo

### **Prerrequisitos:**

- Node.js 18+
- npm o yarn

### **Pasos:**

1. **Clonar repositorio:**

```bash
git clone https://github.com/TU_USUARIO/viejo-sabroso.git
cd viejo-sabroso
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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/TU_USUARIO/viejo-sabroso)

## 📱 Rutas Principales

- **`/`** - Página principal con navegación
- **`/menu-cliente`** - Menú para clientes
- **`/cocina`** - Panel de cocina
- **`/admin-menu`** - Panel de administración

## 🎯 Funcionalidades en Tiempo Real

### **Flujo Completo:**

1. **Admin agrega producto** → Aparece automáticamente en menú cliente
2. **Cliente hace pedido** → Aparece inmediatamente en cocina
3. **Cocina cambia estado** → Se actualiza en tiempo real
4. **Notificaciones toast** → Feedback visual en parte inferior

## 📸 Screenshots

### Menú Cliente

- Layout de tres columnas con imágenes
- Carrito funcional con totales
- Filtros por categoría

### Panel Cocina

- Órdenes en tiempo real
- Estadísticas dinámicas
- Gestión de estados

### Administración

- CRUD completo de productos
- Botones de acción verticales
- Toggle de disponibilidad

## 🔄 Changelog

### **v3.1** (Actual)

- ✅ Notificaciones toast reposicionadas a parte inferior
- ✅ UX móvil mejorada

### **v3.0**

- ✅ Layout de tres columnas implementado
- ✅ Sistema de imágenes con placeholder automático
- ✅ Botones de acción organizados verticalmente

### **v2.0**

- ✅ Firebase integrado con tiempo real
- ✅ Elementos de desarrollo eliminados

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
- **Lucide React** por los iconos

---

**Desarrollado con ❤️ para gestión de restaurantes**

🌟 **Star este repo** si te fue útil!
