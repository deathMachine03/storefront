import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "./store/store";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state.site);

  useEffect(() => {
    dispatch(fetchSettings()); // Загружаем опубликованные данные
  }, [dispatch]);

  console.log("🔍 Текущий Redux State:", siteState);

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen">
        {/* Header всегда статичен */}
        <Header />

        {/* Контейнер для контента */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>

        {/* Footer появляется при прокрутке */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
