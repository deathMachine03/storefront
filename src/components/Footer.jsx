import React, { useEffect, useState } from "react";
import { getUserIdByDomain, fetchLiveSettings } from "../api";
import { Facebook, Instagram, Twitter } from "lucide-react";

const iconMap = {
  instagram: <Instagram />,
  facebook: <Facebook />,
  twitter: <Twitter />,
};

const Footer = ({ domain }) => {
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
    <footer className="p-6 text-white" style={{ backgroundColor: settings?.footerColor || "#1a1a1a" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">{settings?.footerText || "Астана 2025"}</p>
          <p className="text-sm mt-1">📍 {settings?.address || "Не указан"}</p>
          <p className="text-sm">📞 {settings?.phone || "Не указан"}</p>
          <p className="text-sm">📧 {settings?.email || "Не указан"}</p>
        </div>
        {Array.isArray(settings?.socialLinks) && settings.socialLinks.length > 0 && (
          <div className="flex space-x-4 mt-4 md:mt-0">
            {settings.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:opacity-80 transition"
              >
                {iconMap[link.name.toLowerCase()] || "🔗"}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
