import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import ReactGA from 'react-ga';
import TopBarProgress from 'react-topbar-progress-indicator';
import { SWRConfig } from 'swr';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from '@clerk/nextjs';

import progressBarConfig from '@/config/progress-bar/index';
import swrConfig from '@/config/swr/index';
import WorkspaceProvider from '@/providers/workspace';

import '@/styles/globals.css';
let rawdata = require('../messages/zh.json');

let langCode = "en"
let langObject = {}
langObject[langCode] = {}
langObject[langCode].translation = rawdata

i18n
  .use(initReactI18next)
  .init({
    resources: langObject,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

const App = ({ Component, pageProps }) => {
  const [progress, setProgress] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const swrOptions = swrConfig();

  Router.events.on('routeChangeStart', () => setProgress(true));
  Router.events.on('routeChangeComplete', () => setProgress(false));
  TopBarProgress.config(progressBarConfig());

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
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

