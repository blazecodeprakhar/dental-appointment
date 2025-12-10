import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

const services = [
  {
    icon: Heart,
    title: 'Routine Dental Checkup',
    description: 'A full examination of teeth and gums to maintain oral health and detect early signs of dental issues.',
    details: [
      'Complete oral examination',
      'Digital X-rays if needed',
      'Oral cancer screening',
      'Personalized treatment plan',
    ],
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Sparkles,
    title: 'Teeth Cleaning & Polishing',
    description: 'Professional cleaning to remove tartar, plaque, and surface stains, leaving your teeth refreshed and bright.',
    details: [
      'Plaque and tartar removal',
      'Teeth polishing',
      'Fluoride treatment',
      'Oral hygiene guidance',
    ],
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: Stethoscope,
    title: 'Root Canal Treatment',
    description: 'Advanced pain-controlled RCT procedures aimed at saving infected or damaged teeth.',
    details: [
      'Painless procedure',
      'Advanced technology',
      'Same-day treatment available',
      'Permanent restoration',
    ],
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Crown,
    title: 'Crowns & Bridges',
    description: 'Custom-made crowns and bridges that restore strength, appearance, and function to damaged teeth.',
    details: [
      'Natural-looking results',
      'Durable materials',
      'Perfect fit guaranteed',
      'Long-lasting solution',
    ],
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: Baby,
    title: 'Pediatric Dentistry',
    description: 'Gentle dental care for children with a warm and friendly approach.',
    details: [
      'Child-friendly environment',
      'Gentle techniques',
      'Preventive care focus',
      'Fun and comfortable visits',
    ],
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Scissors,
    title: 'Tooth Extraction',
    description: 'Safe and painless extraction procedures when necessary.',
    details: [
      'Minimally invasive',
      'Pain-free with anesthesia',
      'Quick recovery',
      'Post-care instructions',
    ],
    color: 'bg-secondary/20 text-secondary',
  },
  {
    icon: Sun,
    title: 'Cosmetic Dentistry',
    description: 'Enhance your smile with whitening, veneers, reshaping, and cosmetic treatments.',
    details: [
      'Professional whitening',
      'Porcelain veneers',
      'Smile makeover',
      'Tooth reshaping',
    ],
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: AlertTriangle,
    title: 'Gum Disease Treatment',
    description: 'Professional scaling, root planing, and gum care treatments.',
    details: [
      'Deep cleaning',
      'Scaling and root planing',
      'Antibiotic therapy',
      'Preventive maintenance',
    ],
    color: 'bg-secondary/20 text-secondary',
  },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Dental Services – BrightSmile Dental | Demo</title>
        <meta name="description" content="Comprehensive dental services including teeth cleaning, root canal, crowns, cosmetic whitening, pediatric dentistry, and more at BrightSmile Dental." />
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
                <span className="text-xs sm:text-sm font-medium text-primary">Our Expertise</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                Our <span className="text-primary">Dental Services</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide comprehensive dental solutions designed to keep your smile healthy
                and beautiful. Explore our wide range of services below.
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
                            Book Now
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
                Ready to Get Started?
              </h2>
              <p className="text-sm sm:text-base text-primary-foreground/80 max-w-xl mx-auto mb-6 sm:mb-8">
                Book your appointment today and take the first step towards a healthier,
                brighter smile.
              </p>
              <Button asChild size="xl" variant="gold" className="w-full sm:w-auto">
                <Link 
                  to="/book"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Book Your Appointment
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
