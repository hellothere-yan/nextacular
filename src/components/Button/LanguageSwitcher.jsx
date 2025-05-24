import React, { useState, useEffect, useRef, useContext } from "react";
import { LanguageContext } from '../../pages/_app'; // 注意路径是否正确

const LanguageSwitcher = ({ className }) => {
  const { locale, changeLang } = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={className} ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 flex items-center gap-2 hover:bg-gray-300 justify-start"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="lucide lucide-globe h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
        <span className="text-base font-semibold">
          {locale === "zh-CN" ? "简体中文" : "English"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-xl p-4 z-50">
          <ul className="space-y-2 text-sm text-left">
            <li
              onClick={() => changeLang("en-US")}
              className={`rounded-md px-2 py-1.5 ${locale === "en-US" ? "bg-gray-500 font-bold" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
            >
              <img className="h-4 w-4" src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb.svg" />
              <span className="flex-1 text-left">English</span>
            </li>
            <li
              onClick={() => changeLang("zh-CN")}
              className={`rounded-md px-2 py-1.5 ${locale === "zh-CN" ? "bg-gray-500 font-bold" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
            >
              <img className="h-4 w-4" src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/cn.svg" />
              <span className="flex-1 text-left">简体中文</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
