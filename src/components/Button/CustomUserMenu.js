import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useTranslation } from "react-i18next";
export default function CustomUserMenu() {
    const { user } = useUser();
    const { signOut } = useClerk();
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    if (!user) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="rounded-full w-10 h-10 overflow-hidden border border-gray-300"
            >
                <img src={user.imageUrl} alt="avatar" className="w-full h-full object-cover" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded shadow-xl p-4 z-50">
                    <div className="px-2 py-1.5 mb-2 text-sm flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                        {user.primaryEmailAddress?.emailAddress}
                    </div>

                    <ul className="space-y-2 text-sm text-left">
                        <li>
                            <a href="/my-work" className="px-2 py-1.5 hover:bg-gray-500 hover:rounded-md flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.25 9.75h15A2.25 2.25 0 0121.5 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.25A2.25 2.25 0 002 7.5v9A2.25 2.25 0 004.25 19h15A2.25 2.25 0 0021.5 16.5v-9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                </svg>
                                {t("common.label.myworks")}
                            </a>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="px-2 py-1.5 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                                {t("common.label.promotion_link")}
                            </span>
                            <button onClick={() => navigator.clipboard.writeText("https://your-app.com/ref?code=xyz")} className="text-yellow-400 text-xs">
                                {t("common.label.copy")}
                            </button>
                        </li>
                        <a href="/subscription" className="px-2 py-1.5 hover:bg-gray-500 hover:rounded-md flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown h-4 w-4"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z">
                            </path><path d="M5 21h14"></path>
                            </svg>
                            {t("common.label.sub_manger")}
                        </a>
                        <li>
                            <button onClick={() => signOut()} className="w-full px-2 py-1.5 hover:bg-gray-500 hover:rounded-md flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg> {t("common.label.logout")}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
