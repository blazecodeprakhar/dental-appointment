import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutPreview } from '@/components/home/AboutPreview';
import { BookingForm } from '@/components/home/BookingForm';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactSection } from '@/components/home/ContactSection';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    // Handle hash navigation when page loads or hash changes
    if (location.hash) {
      const hash = location.hash.substring(1); // Remove the '#' symbol
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          // Account for fixed navbar height
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 300); // Wait for page to render
    }
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>{t('meta.home.title')}</title>
        <meta name="description" content={t('meta.home.description')} />
        <meta property="og:title" content={t('meta.og.title')} />
        <meta property="og:description" content={t('meta.og.description')} />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="overflow-x-hidden">
          <HeroSection />
          <AboutPreview />
          <BookingForm />
          <ServicesSection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
