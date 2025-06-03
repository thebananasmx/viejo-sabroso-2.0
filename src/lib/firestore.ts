import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { MenuItem, Order, CartItem, OrderStatus } from "@/types";

// Collections
const MENU_COLLECTION = "menu_items";
const ORDERS_COLLECTION = "orders";

// Menu Items
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const querySnapshot = await getDocs(
    query(
      collection(db, MENU_COLLECTION),
      orderBy("category"),
      orderBy("name"),
    ),
  );

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as MenuItem[];
};

export const subscribeToMenuItems = (callback: (items: MenuItem[]) => void) => {
  return onSnapshot(
    query(
      collection(db, MENU_COLLECTION),
      orderBy("category"),
      orderBy("name"),
    ),
    (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as MenuItem[];

      callback(items);
    },
  );
};

export const addMenuItem = async (
  item: Omit<MenuItem, "id" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const now = Timestamp.now();
  const docRef = await addDoc(collection(db, MENU_COLLECTION), {
    ...item,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
};

export const updateMenuItem = async (
  id: string,
  updates: Partial<MenuItem>,
): Promise<void> => {
  const docRef = doc(db, MENU_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  const docRef = doc(db, MENU_COLLECTION, id);
  await deleteDoc(docRef);
};

// Orders
export const addOrder = async (orderData: {
  customerName: string;
  tableNumber?: string;
  items: CartItem[];
  total: number;
}): Promise<string> => {
  const now = Timestamp.now();
  const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
    ...orderData,
    status: "nuevo" as OrderStatus,
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
): Promise<void> => {
  const docRef = doc(db, ORDERS_COLLECTION, id);
  await updateDoc(docRef, {
    status,
    updatedAt: Timestamp.now(),
  });
};

export const subscribeToOrders = (callback: (orders: Order[]) => void) => {
  return onSnapshot(collection(db, ORDERS_COLLECTION), (querySnapshot) => {
    const allOrders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Order[];

    // Filter and sort on the client side
    const filteredOrders = allOrders
      .filter((order) =>
        ["nuevo", "en-preparacion", "listo"].includes(order.status),
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    callback(filteredOrders);
  });
};

export const getOrdersByStatus = async (
  status: OrderStatus,
): Promise<Order[]> => {
  const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));

  const allOrders = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
    updatedAt: doc.data().updatedAt?.toDate() || new Date(),
  })) as Order[];

  // Filter and sort on the client side
  return allOrders
    .filter((order) => order.status === status)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
