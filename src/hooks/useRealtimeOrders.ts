import { useState, useEffect } from "react";
import { Order } from "../types";
import { subscribeToOrders } from "../lib/firestore";

export const useRealtimeOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToOrders((newOrders) => {
      setOrders(newOrders);
      setLoading(false);
    });

    // Handle subscription errors
    const handleError = (err: any) => {
      console.error("Error in orders subscription:", err);
      setError("Error al cargar las órdenes en tiempo real");
      setLoading(false);
    };

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Calculate order statistics
  const stats = {
    total: orders.length,
    nuevo: orders.filter((order) => order.status === "nuevo").length,
    enPreparacion: orders.filter((order) => order.status === "en-preparacion")
      .length,
    listo: orders.filter((order) => order.status === "listo").length,
  };

  return {
    orders,
    stats,
    loading,
    error,
  };
};
