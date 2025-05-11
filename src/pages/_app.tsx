import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import { SWRConfig } from 'swr';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/nextjs';

import type { AppProps } from 'next/app'; // ✅ TypeScript 类型支持

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import WorkspaceProvider from '@/providers/workspace';

import '@/styles/globals.css'; // 确保此路径正确存在

import en from '../messages/en.json';
import zh from '../messages/zh.json';

// i18n 初始化
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  const [progress, setProgress] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const swrOptions = swrConfig();

  // 页面跳转加载动画
  Router.events.on('routeChangeStart', () => setProgress(true));
  Router.events.on('routeChangeComplete', () => setProgress(false));
  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '');
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ReactGA.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ClerkProvider {...pageProps}>
      <SessionProvider session={pageProps.session}>
        <SWRConfig value={swrOptions}>
          <ThemeProvider attribute="class">
            <WorkspaceProvider>
              {progress && <TopBarProgress />}
              <div className="p-2 flex justify-end">
                {/* 可放 SignInButton / UserButton */}
              </div>
              <Component {...pageProps} />
            </WorkspaceProvider>
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </ClerkProvider>
  );
};

export default App;
