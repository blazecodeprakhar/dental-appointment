import { Button } from '@/components/ui/button';
import { Star, Shield, Cpu, Award } from 'lucide-react';
import heroImage from '@/assets/hero-dental.jpg';
import doctorImage from '@/assets/doctor-arjun.jpg';

const trustBadges = [
  { icon: Star, text: '4.8 Rating', color: 'text-secondary' },
  { icon: Cpu, text: 'Modern Equipment', color: 'text-primary' },
  { icon: Shield, text: 'Certified Dentist', color: 'text-primary' },
  { icon: Award, text: 'Painless Treatments', color: 'text-secondary' },
];

export function HeroSection() {
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
                Now accepting new patients
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                BrightSmile Dental –{' '}
                <span className="text-primary">Gentle Care</span> for Your Best Smile
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Professional, safe and comfortable dental treatment with easy online booking.
              </p>
            </div>

            {/* Doctor Info */}
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card rounded-2xl shadow-card border border-border/50 max-w-md">
              <img
                src={doctorImage}
                alt="Dr. Arjun Rao"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-soft shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-foreground">Dr. Arjun Rao, MDS</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Your trusted dental specialist with over 12 years of experience
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button variant="hero" size="xl" onClick={scrollToBooking} className="w-full sm:w-auto">
                Book an Appointment
              </Button>
              <Button variant="heroOutline" size="xl" asChild className="w-full sm:w-auto">
                <a href="tel:+919876543210">Call Us Now</a>
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
                  alt="Modern dental clinic with patient and dentist"
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
                    <p className="text-sm text-muted-foreground">Happy Patients</p>
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
