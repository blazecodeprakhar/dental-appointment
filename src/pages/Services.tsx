import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sparkles,
  Stethoscope,
  Crown,
  Baby,
  Sun,
  Heart,
  Scissors,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Heart,
      title: t('servicesPage.service1.title'),
      description: t('servicesPage.service1.desc'),
      details: [
        t('servicesPage.service1.detail1'),
        t('servicesPage.service1.detail2'),
        t('servicesPage.service1.detail3'),
        t('servicesPage.service1.detail4'),
      ],
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Sparkles,
      title: t('servicesPage.service2.title'),
      description: t('servicesPage.service2.desc'),
      details: [
        t('servicesPage.service2.detail1'),
        t('servicesPage.service2.detail2'),
        t('servicesPage.service2.detail3'),
        t('servicesPage.service2.detail4'),
      ],
      color: 'bg-secondary/20 text-secondary',
    },
    {
      icon: Stethoscope,
      title: t('servicesPage.service3.title'),
      description: t('servicesPage.service3.desc'),
      details: [
        t('servicesPage.service3.detail1'),
        t('servicesPage.service3.detail2'),
        t('servicesPage.service3.detail3'),
        t('servicesPage.service3.detail4'),
      ],
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Crown,
      title: t('servicesPage.service4.title'),
      description: t('servicesPage.service4.desc'),
      details: [
        t('servicesPage.service4.detail1'),
        t('servicesPage.service4.detail2'),
        t('servicesPage.service4.detail3'),
        t('servicesPage.service4.detail4'),
      ],
      color: 'bg-secondary/20 text-secondary',
    },
    {
      icon: Baby,
      title: t('servicesPage.service5.title'),
      description: t('servicesPage.service5.desc'),
      details: [
        t('servicesPage.service5.detail1'),
        t('servicesPage.service5.detail2'),
        t('servicesPage.service5.detail3'),
        t('servicesPage.service5.detail4'),
      ],
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Scissors,
      title: t('servicesPage.service6.title'),
      description: t('servicesPage.service6.desc'),
      details: [
        t('servicesPage.service6.detail1'),
        t('servicesPage.service6.detail2'),
        t('servicesPage.service6.detail3'),
        t('servicesPage.service6.detail4'),
      ],
      color: 'bg-secondary/20 text-secondary',
    },
    {
      icon: Sun,
      title: t('servicesPage.service7.title'),
      description: t('servicesPage.service7.desc'),
      details: [
        t('servicesPage.service7.detail1'),
        t('servicesPage.service7.detail2'),
        t('servicesPage.service7.detail3'),
        t('servicesPage.service7.detail4'),
      ],
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: AlertTriangle,
      title: t('servicesPage.service8.title'),
      description: t('servicesPage.service8.desc'),
      details: [
        t('servicesPage.service8.detail1'),
        t('servicesPage.service8.detail2'),
        t('servicesPage.service8.detail3'),
        t('servicesPage.service8.detail4'),
      ],
      color: 'bg-secondary/20 text-secondary',
    },
  ];
  return (
    <>
      <Helmet>
        <title>{t('meta.services.title')}</title>
        <meta name="description" content={t('meta.services.description')} />
        <link rel="canonical" href="/services" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-pastel to-background">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-card rounded-full px-3 sm:px-4 py-2 shadow-soft mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs sm:text-sm font-medium text-primary">{t('servicesPage.badge')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                {t('servicesPage.title')} <span className="text-primary">{t('servicesPage.titleHighlight')}</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('servicesPage.description')}
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-12 sm:py-16 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {services.map((service, index) => (
                  <div
                    key={service.title}
                    className="bg-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-border/50 shadow-card hover:shadow-premium transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-5">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${service.color} flex items-center justify-center shrink-0`}>
                        <service.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                          {service.title}
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{service.description}</p>
                        <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                          {service.details.map((detail) => (
                            <li key={detail} className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                          <Link
                            to="/book"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2 justify-center sm:justify-start"
                          >
                            {t('servicesPage.bookNow')}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-primary">
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-3 sm:mb-4">
                {t('servicesPage.cta.title')}
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/80 max-w-xl mx-auto mb-6 sm:mb-8">
                {t('servicesPage.cta.description')}
              </p>
              <Button asChild size="xl" variant="gold" className="w-full sm:w-auto">
                <Link
                  to="/book"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {t('servicesPage.cta.button')}
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Services;
