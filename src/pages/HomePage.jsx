import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserIdByDomain, fetchLiveSettings } from "../api";

const HomePage = () => {
  const { domain } = useParams();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { userId } = await getUserIdByDomain(domain);
        if (!userId) throw new Error("Пользователь не найден");

        const settingsData = await fetchLiveSettings(userId);
        setSettings(settingsData);
      } catch (err) {
        console.error("Ошибка загрузки настроек:", err);
      } finally {
        setLoading(false);
      }
    };

    if (domain) {
      loadData();
    }
  }, [domain]);

  if (loading) return <div className="p-6 text-center">Загрузка...</div>;
  if (!settings) return <div className="p-6 text-center text-red-600">Настройки не найдены</div>;

  return (
    <div
      className="flex flex-col min-h-screen justify-center items-center text-center p-8"
      style={{
        background: settings.bgImage
          ? `url(${settings.bgImage}) center/cover no-repeat`
          : "#f7f7f7",
      }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{settings.text}</h1>
        <button
          onClick={() => navigate(`/${domain}/products`)}
          className="px-6 py-3 text-white text-lg font-semibold rounded-lg shadow"
          style={{ backgroundColor: settings.buttonColor }}
        >
          {settings.buttonText}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
