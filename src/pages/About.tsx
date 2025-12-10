import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Award,
  GraduationCap,
  Heart,
  Shield,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';
import doctorImage from '@/assets/doctor-arjun.jpg';
import clinicImage from '@/assets/clinic-interior.jpg';

const timeline = [
  { year: '2013', event: 'Graduated with MDS in Prosthodontics' },
  { year: '2014–2019', event: 'Senior Dentist at SmileCare Clinic' },
  { year: '2020–Present', event: 'Lead Dentist at BrightSmile Dental' },
];

const values = [
  {
    icon: Heart,
    title: 'Patient-First Approach',
    description: 'Every decision we make is centered around your comfort and well-being.',
  },
  {
    icon: Shield,
    title: 'Transparent Treatment',
    description: 'We explain every procedure clearly so you can make informed decisions.',
  },
  {
    icon: Award,
    title: 'Modern Equipment',
    description: 'State-of-the-art technology for precise and painless treatments.',
  },
  {
    icon: Users,
    title: 'Welcoming Environment',
    description: 'A clean, hygienic, and comfortable space for all patients.',
  },
];

const certifications = [
  'Master of Dental Surgery (MDS)',
  'Prosthodontics Specialist',
  'Cosmetic Dentistry Certified',
  'Pediatric Dental Care',
  'Implant Dentistry',
  'Laser Dentistry',
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us – BrightSmile Dental | Dr. Arjun Rao</title>
        <meta name="description" content="Learn about Dr. Arjun Rao and BrightSmile Dental. Over 12 years of experience in cosmetic, restorative, and preventive dentistry." />
        <link rel="canonical" href="/about" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          {/* Hero Section */}
          <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-b from-pastel to-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                {/* Image */}
                <div className="relative order-2 lg:order-1">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/10 rounded-3xl" />
                    <img
                      src={doctorImage}
                      alt="Dr. Arjun Rao - Lead Dentist at BrightSmile Dental"
                      className="relative rounded-2xl shadow-premium w-full max-w-md mx-auto object-cover aspect-[4/5]"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-premium p-6 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-2xl text-foreground">12+</p>
                          <p className="text-sm text-muted-foreground">Years Experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
                  <div className="inline-flex items-center gap-2 bg-card rounded-full px-3 sm:px-4 py-2 shadow-soft">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-primary">About Our Clinic</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Meet <span className="text-primary">Dr. Arjun Rao</span>, MDS
                  </h1>

                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Dr. Arjun Rao is an experienced dental specialist dedicated to providing
                    gentle, personalised, and high-quality care. With over 12 years of clinical
                    experience and advanced training in cosmetic and restorative dentistry, he
                    ensures that every patient receives the best possible treatment tailored to
                    their needs.
                  </p>

                  <div className="space-y-2 sm:space-y-3 pt-4">
                    {certifications.slice(0, 4).map((cert) => (
                      <div key={cert} className="flex items-center gap-2 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                        <span className="text-sm sm:text-base text-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link 
                        to="/book"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        Book Appointment
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                      <Link 
                        to="/services"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      >
                        View Services
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Our <span className="text-primary">Mission</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Our mission is to make dental care accessible, comfortable, and stress-free
                  for every patient. We believe in modern technology, ethical treatment, and
                  long-term oral health.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10 sm:mt-16">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="bg-card rounded-xl p-6 border border-border/50 shadow-soft text-center hover:shadow-card transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-pastel">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                  Professional <span className="text-primary">Journey</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  A timeline of Dr. Arjun Rao's career and achievements in dentistry.
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                {timeline.map((item, index) => (
                  <div key={item.year} className="flex gap-4 sm:gap-6 mb-6 sm:mb-8 last:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center shadow-teal">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                      </div>
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-primary/30 mt-2" />
                      )}
                    </div>
                    <div className="bg-card rounded-xl p-4 sm:p-5 border border-border/50 shadow-soft flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-primary mb-1">{item.year}</p>
                      <p className="text-sm sm:text-base text-foreground">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Clinic Gallery */}
          <section className="py-12 sm:py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                  Our <span className="text-primary">Clinic</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Take a look at our modern, clean, and welcoming dental facility.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={clinicImage}
                    alt="BrightSmile Dental Clinic Interior"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={clinicImage}
                    alt="Dental Treatment Room"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-12 sm:py-16 lg:py-20 bg-pastel">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                  Certifications & <span className="text-primary">Expertise</span>
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-3xl mx-auto">
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    className="bg-card rounded-full px-3 sm:px-5 py-2 sm:py-3 border border-border/50 shadow-soft flex items-center gap-2"
                  >
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-secondary shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{cert}</span>
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

export default About;
