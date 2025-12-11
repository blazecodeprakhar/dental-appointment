import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingForm } from '@/components/home/BookingForm';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';

const BookAppointment = () => {
  const { t } = useLanguage();

  const policies = [
    {
      icon: Clock,
      title: t('bookPage.policy1.title'),
      description: t('bookPage.policy1.desc'),
    },
    {
      icon: AlertTriangle,
      title: t('bookPage.policy2.title'),
      description: t('bookPage.policy2.desc'),
    },
    {
      icon: CheckCircle,
      title: t('bookPage.policy3.title'),
      description: t('bookPage.policy3.desc'),
    },
    {
      icon: Calendar,
      title: t('bookPage.policy4.title'),
      description: t('bookPage.policy4.desc'),
    },
  ];
  return (
    <>
      <Helmet>
        <title>{t('meta.book.title')}</title>
        <meta name="description" content={t('meta.book.description')} />
        <link rel="canonical" href="/book" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <BookingForm isFullPage />

          {/* Appointment Policy Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                  {t('bookPage.policy')} <span className="text-primary">{t('bookPage.policyHighlight')}</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t('bookPage.policyDesc')}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {policies.map((policy) => (
                  <div
                    key={policy.title}
                    className="bg-card rounded-xl p-4 sm:p-6 border border-border/50 shadow-soft text-center"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <policy.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">{policy.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BookAppointment;
