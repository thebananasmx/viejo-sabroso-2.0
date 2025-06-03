import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Immediate redirect using Navigate component
  return <Navigate to="/menu-cliente" replace />;
};

export default Index;
