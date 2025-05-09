import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
const LanguageSwitcher = ({ className }) => {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState("en");
    const menuRef = useRef(null);
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setCurrentLang(lng);
        setOpen(false);
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
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
        <div className={className} ref={menuRef} >
            <button onClick={() => setOpen(!open)} class="whitespace-nowrap rounded-md  font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground h-9 px-4 py-2 flex items-center gap-2  hover:bg-gray-300 justify-start" type="button" id="radix-«R697n6nb»" aria-haspopup="menu" aria-expanded="false" data-state="closed">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
                <span class="text-base font-medium">{currentLang === "en" ? "English" : "简体中文"}</span>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-xl p-4 z-50">
                    <ul className="space-y-2 text-sm text-left">
                        <li onClick={() => changeLanguage("en")}
                            className={`rounded-md px-2 py-1.5 ${currentLang === "en" ? "bg-gray-500 font-bold " : ""}`}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                            <img
                                className="h-4 w-4"
                                src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/gb.svg"
                                style={{ display: "inline-block", width: "1em", height: "1em", verticalAlign: "middle" }}
                            />
                            <span className="flex-1 text-left">English</span>
                        </li>
                        <li onClick={() => changeLanguage("zh")}
                            className={`rounded-md px-2 py-1.5 ${currentLang === "zh" ? "bg-gray-500 font-bold" : ""}`}
                            style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                            <img
                                className="h-4 w-4"
                                src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/cn.svg"
                                style={{ display: "inline-block", width: "1em", height: "1em", verticalAlign: "middle" }}
                            />
                            <span className="flex-1 text-left">简体中文</span>
                        </li>
                    </ul>
                </div>
            )
            }
        </div >
    );
};

export default LanguageSwitcher;
