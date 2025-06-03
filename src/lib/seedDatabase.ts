import { addMenuItem } from "./firestore";
import { MenuItem } from "../types";

export const initialMenuItems: Omit<
  MenuItem,
  "id" | "createdAt" | "updatedAt"
>[] = [
  // Comida
  {
    name: "Tacos al Pastor",
    description: "Deliciosos tacos con carne al pastor, piña y salsa verde",
    price: 85.0,
    category: "comida",
    available: true,
  },
  {
    name: "Quesadilla de Flor de Calabaza",
    description: "Quesadilla artesanal con flor de calabaza y queso oaxaca",
    price: 65.0,
    category: "comida",
    available: true,
  },
  {
    name: "Pozole Rojo",
    description: "Tradicional pozole rojo con cerdo y acompañamientos",
    price: 120.0,
    category: "comida",
    available: true,
  },
  {
    name: "Enchiladas Verdes",
    description: "Enchiladas bañadas en salsa verde con pollo y crema",
    price: 95.0,
    category: "comida",
    available: true,
  },

  // Bebidas
  {
    name: "Agua de Horchata",
    description: "Refrescante agua de horchata casera",
    price: 35.0,
    category: "bebidas",
    available: true,
  },
  {
    name: "Agua de Jamaica",
    description: "Agua fresca de flor de jamaica",
    price: 30.0,
    category: "bebidas",
    available: true,
  },
  {
    name: "Agua de Tamarindo",
    description: "Agua fresca de tamarindo con chile piquín",
    price: 35.0,
    category: "bebidas",
    available: true,
  },
  {
    name: "Cerveza Corona",
    description: "Cerveza corona bien fría",
    price: 45.0,
    category: "bebidas",
    available: true,
  },

  // Postres
  {
    name: "Flan Napolitano",
    description: "Flan casero con caramelo tradicional",
    price: 45.0,
    category: "postres",
    available: true,
  },
  {
    name: "Tres Leches",
    description: "Pastel tres leches con canela",
    price: 55.0,
    category: "postres",
    available: true,
  },
  {
    name: "Arroz con Leche",
    description: "Arroz con leche casero con canela y pasas",
    price: 40.0,
    category: "postres",
    available: true,
  },
];

export const seedDatabase = async (): Promise<void> => {
  console.log("🌱 Iniciando la siembra de la base de datos...");

  try {
    const promises = initialMenuItems.map(async (item, index) => {
      console.log(`📄 Agregando: ${item.name}`);
      await addMenuItem(item);
      // Add a small delay to avoid hitting rate limits
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    await Promise.all(promises);
    console.log("✅ Base de datos poblada exitosamente!");
    console.log(`📊 Se agregaron ${initialMenuItems.length} productos al menú`);
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    throw error;
  }
};

// For development use - can be called from browser console
(window as any).seedDatabase = seedDatabase;
