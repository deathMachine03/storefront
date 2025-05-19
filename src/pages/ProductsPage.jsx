import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUserIdByDomain, fetchLiveProducts } from "../api";

const ProductsPage = () => {
  const { domain } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
const [notificationText, setNotificationText] = useState("");


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { userId } = await getUserIdByDomain(domain);
        const data = await fetchLiveProducts(userId);
        setProducts(data);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [domain]);

  
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((p) => p._id === product._id);

    let updatedCart;
    if (existing) {
      updatedCart = cart.map((p) =>
        p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyClick = (product) => {
    addToCart(product);
    navigate(`/${domain}/cart`);
  };

const handleAddToCartClick = (product) => {
  addToCart(product);
  setNotificationText(`«${product.name}» добавлен в корзину`);
  setShowNotification(true);
  setTimeout(() => setShowNotification(false), 3000);
};


  if (loading) return <div className="p-6 text-center">Загрузка...</div>;

  return (
    
    <div className="container mx-auto p-6">
            {showNotification && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500 animate-fade-in-out">
          {notificationText}
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Каталог товаров</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
        <div key={product._id}
            className=" rounded-lg p-4 shadow-md hover:shadow-lg transition">
          <Link
            to={`/${domain}/product/${product._id}`}
            
          >
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700 font-medium">{product.price} ₸</p>
          </Link>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleAddToCartClick(product)}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Себетке салу
              </button>
              <button
                onClick={() => handleBuyClick(product)}
                className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Сатып алу
              </button>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
