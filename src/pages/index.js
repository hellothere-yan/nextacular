import Meta from '@/components/Meta/index';
import { LandingLayout } from '@/layouts/index';
import {
  CallToAction,
  Features,
  Footer,
  Guides,
  Hero,
  Pricing,
  Testimonial,
  BackToTopButton,
} from '@/sections/index';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const scrollToId = router.query.scrollTo;

    if (scrollToId) {
      // 延迟执行，确保页面渲染完成
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          const yOffset = -80; // 和导航栏高度保持一致,在'@/styles/globals.css' 配置scroll-target 保持一致。
          const y =
            el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100); // 延迟 100ms
    }
  }, [router.query.scrollTo]);
  return (
    <LandingLayout>
      <Meta
        title="NextJS SaaS Boilerplate"
        description="A boilerplate for your NextJS SaaS projects."
      />
      <Hero />
      <Features />
      <Guides />
      <Pricing />
      <Testimonial />
      <CallToAction />
      <Footer />
      <BackToTopButton />
    </LandingLayout>
  );
};

export default Home;
