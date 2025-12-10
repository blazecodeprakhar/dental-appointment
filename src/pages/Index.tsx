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

const Index = () => {
  const location = useLocation();

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
        <title>BrightSmile Dental – Gentle Care for Your Best Smile | Demo</title>
        <meta name="description" content="Professional dental care with Dr. Arjun Rao. Book your appointment online for teeth cleaning, root canal, cosmetic whitening, and more. Serving Demo City." />
        <meta property="og:title" content="BrightSmile Dental – Gentle Care for Your Best Smile" />
        <meta property="og:description" content="Professional dental care with easy online booking. Visit our modern clinic for all your dental needs." />
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
