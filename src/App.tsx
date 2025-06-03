import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Import pages
import Index from "./pages/Index";
import CustomerMenu from "./pages/CustomerMenu";
import Kitchen from "./pages/Kitchen";
import AdminMenu from "./pages/AdminMenu";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu-cliente" element={<CustomerMenu />} />
            <Route path="/cocina" element={<Kitchen />} />
            <Route path="/admin-menu" element={<AdminMenu />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "white",
                color: "black",
                border: "1px solid #e5e7eb",
              },
            }}
          />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
