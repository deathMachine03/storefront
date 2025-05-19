import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserIdByDomain, fetchLiveProductById } from "../api";

const BuyPage = () => {
  const { domain, id } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "card",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const { userId } = await getUserIdByDomain(domain);
        const data = await fetchLiveProductById(userId, id);
        setProduct(data);
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
      }
    };

    load();
  }, [domain, id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Тут вы можете отправить данные на сервер
    console.log("🧾 Заказ оформлен:", {
      ...formData,
      product
    });

    alert("Заказ оформлен! (оплата пока не подключена)");
  };

  if (!product) return <div className="p-6">Загрузка товара...</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg mt-10 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-40 object-cover rounded mb-2"
        />
        <p className="text-gray-700 font-medium">{product.price} ₸</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="ФИО"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Адрес доставки"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="card">Оплата картой</option>
          <option value="cash">Наложенный платеж</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Оплатить
        </button>
      </form>
    </div>
  );
};

export default BuyPage;
