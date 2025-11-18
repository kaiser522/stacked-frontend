import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Toaster from "./components/notifications/Toaster";
import { AuthProvider } from "./contexts/AuthContext";
import "./utils/testUserHelper.js"; // Load test user helpers in dev mode

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Toaster />
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
