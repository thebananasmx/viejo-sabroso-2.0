import { Navigate } from "react-router-dom";

function Index() {
  // Immediate redirect to customer menu
  return <Navigate to="/menu-cliente" replace />;
}

export default Index;
