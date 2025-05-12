import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import CustomUserMenu from '@/components/Button/CustomUserMenu';
import LanguageSwitcher from '@/components/Button/LanguageSwitcher';

const Hero = () => {
  const { status: sessionStatus } = useSession();
  const [showMenu, setMenuVisibility] = useState(false);

  const toggleMenu = () => setMenuVisibility(!showMenu);
  const { t } = useTranslation();

  return (
    <div className="w-full py-10">
      <div className="relative flex flex-col px-10 mx-auto space-y-5 md:w-3/4">
        <header className="flex items-center justify-between space-x-3"></header>
        <div className="flex flex-col items-center justify-center pt-10 mx-auto md:w-3/5">
          <h1 className="text-6xl font-extrabold text-center">
            <span className="block">Build SaaS platforms</span>
            <span className="block text-blue-600">like never before</span>
          </h1>
          <p className="mt-5 text-center text-gray-600">
            Quickly build landing pages that will help you get results fast
          </p>
        </div>
        <div className="flex items-center justify-center space-x-5">
          <a className="px-10 py-3 text-center text-white bg-blue-600 rounded shadow hover:bg-blue-500">
            Get Started
          </a>
          <a className="px-10 py-3 text-center text-blue-600 rounded shadow hover:bg-blue-50">
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
