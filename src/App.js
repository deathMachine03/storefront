import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage"; 
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = () => {
  const { domain } = useParams();
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Header domain={domain} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} /> 
        </Routes>
      </div>
      <Footer domain={domain} />
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:domain/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
