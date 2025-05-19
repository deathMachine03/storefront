import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.jsx"; // Добавляем .js
import App from "./App.js"; // Добавляем .js
import "./index.css"; // Стили должны оставаться без изменений
import { CartProvider } from "./context/CartContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <App />
  </CartProvider>

);