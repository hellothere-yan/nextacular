
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import CustomUserMenu from '@/components/Button/CustomUserMenu';
import LanguageSwitcher from '@/components/Button/LanguageSwitcher';
import { useRouter } from 'next/router';

export default function Navbar() {
    const [showMenu, setMenuVisibility] = useState(false);
    const router = useRouter();
    const toggleMenu = () => setMenuVisibility(!showMenu);
    const { t } = useTranslation();
    const goToSection = (id: string) => {
        if (router.pathname === '/') {
          // 当前就在首页，直接滚动
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          // 不在首页，跳转过去并传参
          router.push(`/?scrollTo=${id}`);
        }
      };
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <Link href="/" className="text-2xl font-bold">
            Nextacular
          </Link>
          <button className="md:hidden" onClick={toggleMenu}>
            {!showMenu ? (
              <Bars3Icon className="w-8 h-8" />
            ) : (
              <XMarkIcon className="w-8 h-8" />
            )}
          </button>
          <div
            className={[
              'items-center justify-center md:flex-row md:flex md:relative md:bg-transparent md:shadow-none md:top-0 md:backdrop-blur-none md:space-x-3',
              showMenu
                ? 'absolute z-50 flex flex-col py-5 space-x-0 rounded shadow-xl md:py-0 left-8 right-8 bg-white top-24 space-y-3 md:space-y-0 px-5'
                : 'hidden',
            ].join(' ')}
          >
            <nav className="flex flex-col w-full space-x-0 space-y-3 text-center md:space-y-0 md:space-x-3 md:flex-row">
              <a
                className="font-semibold inline-block px-5 py-2 rounded hover:bg-gray-300 whitespace-nowrap min-w-[4rem] text-center"
                onClick={() => {goToSection('feature')}}
              >
                {t('common.label.feature')}
              </a>
              <a
                className="font-semibold inline-block px-5 py-2 rounded hover:bg-gray-300 whitespace-nowrap min-w-[4rem] text-center"
                onClick={() => {goToSection('guides')}}
              >
                {t('common.label.guides')}
              </a>
              <a
                className="font-semibold inline-block px-5 py-2 rounded hover:bg-gray-300 whitespace-nowrap min-w-[4rem] text-center"
                onClick={() => {goToSection('pricing')}}
              >
                {t('common.label.pricing')}
              </a>
              <Link
                href="/myworks"
                className="font-semibold inline-block px-5 py-2 rounded hover:bg-gray-300 whitespace-nowrap min-w-[4rem] text-center"
              >
                {t('common.label.myworks')}
              </Link>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="inline-block items-center px-5 py-2 bg-blue-600 text-white rounded whitespace-nowrap min-w-[4rem] hover:bg-blue-500">
                    {t('common.label.login')}
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <CustomUserMenu />
              </SignedIn>
              <LanguageSwitcher />
            </nav>
          </div>
    </nav>
  );
}
