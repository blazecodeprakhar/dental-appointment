import { Sparkles, Heart, Crown, Baby, Sun, Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Sparkles,
    title: 'Teeth Cleaning & Polishing',
    description: 'A gentle cleaning session to remove plaque, tartar and stains for a brighter smile.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Stethoscope,
    title: 'Root Canal Treatment',
    description: 'Advanced pain-free root canal procedures to save your natural tooth.',
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: Crown,
    title: 'Crowns & Bridges',
    description: 'Durable and natural-looking restorations to rebuild damaged or missing teeth.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Baby,
    title: 'Pediatric Dentistry',
    description: 'Friendly dental care for children with a warm and comfortable approach.',
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: Sun,
    title: 'Cosmetic Whitening',
    description: 'Professional whitening treatments for a visibly brighter smile.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Heart,
    title: 'Complete Dental Checkups',
    description: 'Routine examinations to monitor and maintain your oral health.',
    color: 'bg-secondary/20 text-secondary',
  },
];

export function ServicesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-pastel rounded-full px-3 sm:px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Our Expertise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Our <span className="text-primary">Dental Services</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            We provide a complete range of dental treatments designed to restore, enhance, and protect your smile.
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
              <h3 className="font-semibold text-base sm:text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              {/* Link */}
              <Link
                to="/services"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
              >
                Learn more
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
              View All Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
