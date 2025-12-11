import { Sparkles, Heart, Crown, Baby, Sun, Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Sparkles,
      title: t('services.service1.title'),
      description: t('services.service1.desc'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Stethoscope,
      title: t('services.service2.title'),
      description: t('services.service2.desc'),
      color: 'bg-secondary/20 text-secondary',
    },
    {
      icon: Crown,
      title: t('services.service3.title'),
      description: t('services.service3.desc'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Baby,
      title: t('services.service4.title'),
      description: t('services.service4.desc'),
      color: 'bg-secondary/20 text-secondary',
    },
    {
      icon: Sun,
      title: t('services.service5.title'),
      description: t('services.service5.desc'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Heart,
      title: t('services.service6.title'),
      description: t('services.service6.desc'),
      color: 'bg-secondary/20 text-secondary',
    },
  ];
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-pastel rounded-full px-3 sm:px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">{t('services.badge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 break-words">
            {t('services.title')} <span className="text-primary">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground break-words">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50 shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${service.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2 group-hover:text-primary transition-colors break-words">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 break-words">
                {service.description}
              </p>

              {/* Link */}
              <Link
                to="/services"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
              >
                {t('services.learnMore')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link
              to="/services"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('services.viewAll')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
