import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { domain } = useParams();


  // Загрузка корзины из localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  // Обновление localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const changeQuantity = (productId, amount) => {
    const updated = cart.map((item) =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    updateCart(updated);
  };

  const removeFromCart = (productId) => {
    const filtered = cart.filter((item) => item._id !== productId);
    updateCart(filtered);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>

      {cart.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="flex items-center mb-4 border border-gray-300 p-4 rounded-lg">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price} ₸</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => changeQuantity(item._id, -1)} className="px-2 py-1 bg-gray-200">-</button>
                  <span className="mx-3">{item.quantity}</span>
                  <button onClick={() => changeQuantity(item._id, 1)} className="px-2 py-1 bg-gray-200">+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{item.price * item.quantity} ₸</p>
                <button onClick={() => removeFromCart(item._id)} className="text-red-600 text-sm mt-1">
                  Удалить
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-bold">
            Общая сумма: {total} ₸
          </div>

      <button
        onClick={() => navigate(`/${domain}/checkout`)}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Перейти к оформлению
      </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
