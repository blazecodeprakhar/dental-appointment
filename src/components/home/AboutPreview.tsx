import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import clinicImage from '@/assets/clinic-interior.jpg';

const features = [
  'Advanced Technology',
  'Painless Procedures',
  'Personalized Care',
  'Emergency Services',
];

export function AboutPreview() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-pastel rounded-3xl" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-premium">
                <img
                  src={clinicImage}
                  alt="Modern dental clinic interior"
                  className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover"
                />
              </div>

              {/* Experience Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-primary rounded-xl sm:rounded-2xl shadow-teal p-4 sm:p-6 text-primary-foreground">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">12+</p>
                <p className="text-xs sm:text-sm opacity-90">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-pastel rounded-full px-3 sm:px-4 py-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-primary">About Our Clinic</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
              Committed to Your{' '}
              <span className="text-primary">Healthy, Confident Smile</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              BrightSmile Dental is committed to bringing healthy, confident smiles through
              advanced dental care and a personalised patient approach. From regular check-ups to
              complex treatments, we ensure that every visit feels comfortable, safe and
              stress-free.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link 
                  to="/about"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
