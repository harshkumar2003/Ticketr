import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        gutter={10}
        containerStyle={{ top: 76, right: 16 }}
        toastOptions={{
          duration: 3200,
          style: {
            background: "#111114",
            color: "#f4f4f5",
            border: "1px solid rgba(249, 115, 22, 0.35)",
            borderRadius: "12px",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
            fontSize: "14px",
            maxWidth: "420px",
          },
          success: {
            iconTheme: {
              primary: "#fb923c",
              secondary: "#050505",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#050505",
            },
          },
        }}
      />
    </AuthProvider>
  </BrowserRouter>,
);
