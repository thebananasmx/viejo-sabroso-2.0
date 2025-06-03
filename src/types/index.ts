export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "comida" | "bebidas" | "postres";
  imageUrl?: string;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber?: string;
  items: CartItem[];
  total: number;
  status: "nuevo" | "en-preparacion" | "listo" | "entregado";
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = Order["status"];
export type MenuCategory = MenuItem["category"];
