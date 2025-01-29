import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ScrollToTop />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
