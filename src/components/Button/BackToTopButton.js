import { useEffect, useState } from "react";

export default function BackToTopButton() {
    const [showButton, setShowButton] = useState(false);

    // 监听滚动显示/隐藏按钮
    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        showButton && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-50 p-2 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-700 transition-all"
                aria-label="Back to top"
            >
                ↑
            </button>
        )
    );
}
