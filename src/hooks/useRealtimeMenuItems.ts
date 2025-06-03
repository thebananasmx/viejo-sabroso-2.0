import { useState, useEffect } from "react";
import { MenuItem } from "../types";
import { subscribeToMenuItems } from "../lib/firestore";

export const useRealtimeMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = subscribeToMenuItems((items) => {
      setMenuItems(items);
      setLoading(false);
    });

    // Handle subscription errors
    const handleError = (err: any) => {
      console.error("Error in menu items subscription:", err);
      setError("Error al cargar el menú en tiempo real");
      setLoading(false);
    };

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Filter items by category
  const getItemsByCategory = (category: MenuItem["category"]) => {
    return menuItems.filter(
      (item) => item.category === category && item.available,
    );
  };

  // Get all available items
  const availableItems = menuItems.filter((item) => item.available);

  return {
    menuItems,
    availableItems,
    getItemsByCategory,
    loading,
    error,
  };
};
