import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { getUserIdByDomain, fetchLiveProductById } from "../api";

const ProductPage = () => {
  const { domain, id } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { userId } = await getUserIdByDomain(domain);
        setUserId(userId);

        const productData = await fetchLiveProductById(userId, id);
        setProduct(productData);
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
        setError("Не удалось загрузить товар");
      } finally {
        setLoading(false);
      }
    };

    if (domain && id) {
      loadProduct();
    }
  }, [domain, id]);

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;
  if (error) return <div className="p-6 text-red-600 text-center">{error}</div>;
  if (!product) return <div className="p-6 text-center">Товар не найден</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 items-start bg-white shadow rounded p-6">
        <div className="w-full md:w-1/3">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            className="rounded w-full h-auto max-h-[500px] object-contain"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description || "Нет описания"}</p>
          <p className="text-xl font-semibold">{product.price} ₸</p>
        </div>
      </div>
      <button
  onClick={() => navigate(`/${domain}/buy/${id}`)}
  className="mt-6 w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
>
  Сатып алу
</button>

    </div>
  );
};

export default ProductPage;
