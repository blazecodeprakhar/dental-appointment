import { Button } from '@/components/ui/button';
import { Star, Shield, Cpu, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-dental.jpg';
import doctorImage from '@/assets/doctor-arjun.jpg';

export function HeroSection() {
  const { t } = useLanguage();

  const trustBadges = [
    { icon: Star, text: t('hero.rating'), color: 'text-secondary' },
    { icon: Cpu, text: t('hero.equipment'), color: 'text-primary' },
    { icon: Shield, text: t('hero.certified'), color: 'text-primary' },
    { icon: Award, text: t('hero.painless'), color: 'text-secondary' },
  ];

  const scrollToBooking = () => {
    document.getElementById('book-appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pastel via-background to-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-40 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] py-8 lg:py-0">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-card rounded-full px-3 sm:px-4 py-2 shadow-soft border border-border/50">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {t('hero.badge')}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className={cn(
                "font-bold text-foreground leading-normal break-words",
                ['hi', 'mr', 'te', 'ta', 'ml', 'kn'].includes(useLanguage().language)
                  ? "text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-relaxed"
                  : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              )}>
                {t('hero.title')}{' '}
                <span className="text-primary">{t('hero.titleHighlight')}</span> {t('hero.titleEnd')}
              </h1>
              <p className={cn(
                "text-muted-foreground max-w-xl leading-relaxed break-words",
                ['hi', 'mr', 'te', 'ta', 'ml', 'kn'].includes(useLanguage().language)
                  ? "text-sm sm:text-lg md:text-xl"
                  : "text-base sm:text-lg md:text-xl"
              )}>
                {t('hero.description')}
              </p>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-2xl shadow-card border border-border/50 max-w-md">
              <img
                src={doctorImage}
                alt={t('hero.doctor.alt')}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-soft shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-foreground break-words">{t('hero.doctor')}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground break-words">
                  {t('hero.doctorDesc')}
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button variant="hero" size="xl" onClick={scrollToBooking} className="w-full sm:w-auto">
                {t('hero.book')}
              </Button>
              <Button variant="heroOutline" size="xl" asChild className="w-full sm:w-auto">
                <a href="tel:+919876543210">{t('hero.call')}</a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 sm:gap-4 pt-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-border/50"
                >
                  <badge.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${badge.color} shrink-0`} />
                  <span className="text-xs sm:text-sm font-medium text-foreground">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-2xl" />

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-premium">
                <img
                  src={heroImage}
                  alt={t('hero.image.alt')}
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Floating Card */}
              <div className="absolute -left-8 bottom-20 bg-card rounded-2xl shadow-premium p-4 border border-border/50 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-secondary fill-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-foreground">1000+</p>
                    <p className="text-sm text-muted-foreground">{t('hero.patients')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
