import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { MenuItem, Order, CartItem, OrderStatus } from "../types";

// Collections
const MENU_COLLECTION = "menu_items";
const ORDERS_COLLECTION = "orders";

// Menu Items
export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, MENU_COLLECTION));

    const items = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        description: data.description || "",
        price: data.price || 0,
        category: data.category || "comida",
        imageUrl: data.imageUrl,
        available: data.available !== false, // Default to true if not specified
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }) as MenuItem[];

    // Sort by category first, then by name on the client side
    return items.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error("Error getting menu items:", error);
    return [];
  }
};

export const subscribeToMenuItems = (callback: (items: MenuItem[]) => void) => {
  try {
    return onSnapshot(
      collection(db, MENU_COLLECTION),
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            description: data.description || "",
            price: data.price || 0,
            category: data.category || "comida",
            imageUrl: data.imageUrl,
            available: data.available !== false,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        }) as MenuItem[];

        // Sort by category first, then by name on the client side
        const sortedItems = items.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          return a.name.localeCompare(b.name);
        });

        callback(sortedItems);
      },
      (error) => {
        console.error("Error in menu items subscription:", error);
        callback([]);
      },
    );
  } catch (error) {
    console.error("Error setting up menu items subscription:", error);
    return () => {}; // Return empty unsubscribe function
  }
};

export const addMenuItem = async (
  item: Omit<MenuItem, "id" | "createdAt" | "updatedAt">,
): Promise<string> => {
  try {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, MENU_COLLECTION), {
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl || null,
      available: item.available,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

export const updateMenuItem = async (
  id: string,
  updates: Partial<MenuItem>,
): Promise<void> => {
  try {
    const docRef = doc(db, MENU_COLLECTION, id);
    const updateData: any = {
      ...updates,
      updatedAt: Timestamp.now(),
    };

    // Clean up undefined values
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, MENU_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

// Orders
export const addOrder = async (orderData: {
  customerName: string;
  tableNumber?: string;
  items: CartItem[];
  total: number;
}): Promise<string> => {
  try {
    const now = Timestamp.now();

    // Prepare order data with proper structure
    const order = {
      customerName: orderData.customerName,
      tableNumber: orderData.tableNumber || null,
      items: orderData.items.map((item) => ({
        menuItem: {
          id: item.menuItem.id,
          name: item.menuItem.name,
          price: item.menuItem.price,
          category: item.menuItem.category,
          description: item.menuItem.description,
          imageUrl: item.menuItem.imageUrl || null,
          available: item.menuItem.available,
        },
        quantity: item.quantity,
      })),
      total: orderData.total,
      status: "nuevo" as OrderStatus,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), order);
    return docRef.id;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<void> => {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const subscribeToOrders = (callback: (orders: Order[]) => void) => {
  try {
    return onSnapshot(
      collection(db, ORDERS_COLLECTION),
      (querySnapshot) => {
        const allOrders = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            customerName: data.customerName || "",
            tableNumber: data.tableNumber,
            items: data.items || [],
            total: data.total || 0,
            status: data.status || "nuevo",
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        }) as Order[];

        // Filter and sort on the client side to avoid composite index requirements
        const filteredOrders = allOrders
          .filter((order) =>
            ["nuevo", "en-preparacion", "listo"].includes(order.status),
          )
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        callback(filteredOrders);
      },
      (error) => {
        console.error("Error in orders subscription:", error);
        callback([]);
      },
    );
  } catch (error) {
    console.error("Error setting up orders subscription:", error);
    return () => {}; // Return empty unsubscribe function
  }
};

export const getOrdersByStatus = async (
  status: OrderStatus,
): Promise<Order[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));

    const allOrders = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        customerName: data.customerName || "",
        tableNumber: data.tableNumber,
        items: data.items || [],
        total: data.total || 0,
        status: data.status || "nuevo",
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      };
    }) as Order[];

    // Filter and sort on the client side
    return allOrders
      .filter((order) => order.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Error getting orders by status:", error);
    return [];
  }
};

// App Settings functions
export const getAppSettings = async () => {
  try {
    const settingsDoc = doc(db, "appSettings", "main");
    const settingsSnap = await getDoc(settingsDoc);

    if (settingsSnap.exists()) {
      return settingsSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting app settings:", error);
    throw error;
  }
};

export const updateAppSettings = async (settings: any) => {
  try {
    const settingsDoc = doc(db, "appSettings", "main");

    // Filter out undefined values to prevent Firebase errors
    const cleanedSettings = Object.entries(settings).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {} as any,
    );

    console.log("Saving cleaned settings:", cleanedSettings);

    await setDoc(settingsDoc, cleanedSettings, { merge: true });
  } catch (error) {
    console.error("Error updating app settings:", error);
    throw error;
  }
};
