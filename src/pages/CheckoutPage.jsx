import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!form.name || !form.email || !form.address) {
      alert("Заполните все поля");
      return;
    }

    // В реальной реализации здесь будет запрос на бэкенд + Stripe
    alert("Платёж прошёл успешно! 🎉");
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>

      <div className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ваше имя"
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full border p-2 rounded"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Адрес доставки"
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Оплатить
        </button>
      </div>

      {/* <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-2">Состав заказа:</h3>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.price} ₸</span>
          </div>
        ))}
        <div className="mt-2 font-bold">
          Итого: {cart.reduce((sum, p) => sum + p.price, 0)} ₸
        </div>
      </div> */}
    </div>
  );
};

export default CheckoutPage;
