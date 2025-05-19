import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserIdByDomain, fetchLiveSettings } from "../api";
import { ShoppingCart } from "lucide-react";


const Header = ({ domain }) => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { userId } = await getUserIdByDomain(domain);
      const data = await fetchLiveSettings(userId);
      setSettings(data);
    };
    if (domain) load();
  }, [domain]);

  return (
    <header className="flex justify-between items-center p-4 shadow-md" style={{ backgroundColor: settings?.headerColor || "#f0f0f0" }}>
      {settings?.logo ? (
        <img src={settings.logo} alt="Лого" className="h-12 object-contain" />
      ) : (
        <div className="h-10 w-20 bg-gray-200 flex items-center justify-center rounded-md">Нет логотипа</div>
      )}

      <nav className="flex space-x-6">
        <Link to={`/${domain}/cart`} className="text-lg font-semibold hover:text-blue-500"> <ShoppingCart className="cursor-pointer" /></Link>
        <Link to={`/${domain}`} className="text-lg font-semibold hover:text-blue-500">Басты бет</Link>
        <Link to={`/${domain}/products`} className="text-lg font-semibold hover:text-blue-500">Каталог</Link>

      </nav>
    </header>
  );
};

export default Header;
