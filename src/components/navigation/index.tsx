import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { useRouter ,usePathname} from 'next/navigation';
import Link from 'next/link';

// 动态导入避免SSR问题
const LanguageSwitcher = dynamic(() => import('@/components/Button/LanguageSwitcher'), {
  ssr: false,
  loading: () => <div className="w-8 h-8" /> // 加载时的占位
});

const CustomUserMenu = dynamic(() => import('@/components/Button/CustomUserMenu'), {
  ssr: false
});

export default function Navbar() {
  const [showMenu, setMenuVisibility] = useState(false);
  const { t, ready } = useTranslation(); // 添加ready检查
  const router = useRouter();
  const pathname = usePathname();
  // 确保i18n已加载
  if (!ready) return <div className="h-16 bg-white shadow" />;

  const toggleMenu = () => setMenuVisibility(!showMenu);

  const goToSection = (id: string) => {
    if (pathname  === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/?scrollTo=${id}`);
    }
    setMenuVisibility(false); // 移动端点击后关闭菜单
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold flex-shrink-0">
        Nextacular
      </Link>

      {/* 移动端菜单按钮 */}
      <button 
        className="md:hidden z-50" 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {!showMenu ? (
          <Bars3Icon className="w-8 h-8" />
        ) : (
          <XMarkIcon className="w-8 h-8" />
        )}
      </button>

      {/* 导航菜单 */}
      <div
        className={`${
          showMenu
            ? 'fixed inset-0 bg-white flex flex-col items-center justify-center space-y-6 pt-20'
            : 'hidden'
        } md:static md:flex md:items-center md:space-x-6 md:space-y-0 md:bg-transparent`}
      >
        <NavLink onClick={() => goToSection('feature')}>
          {t('common.label.feature')}
        </NavLink>
        <NavLink onClick={() => goToSection('guides')}>
          {t('common.label.guides')}
        </NavLink>
        <NavLink onClick={() => goToSection('pricing')}>
          {t('common.label.pricing')}
        </NavLink>
        
        <Link href="/myworks" >
          <NavLink>
            {t('common.label.myworks')}
          </NavLink>
        </Link>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                {t('common.label.login')}
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <CustomUserMenu />
          </SignedIn>
          
          <LanguageSwitcher className=""/>
        </div>
      </div>
    </nav>
  );
}

// 抽离导航链接组件
const NavLink = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium rounded hover:bg-gray-100 transition ${className}`}
  >
    {children}
  </button>
);