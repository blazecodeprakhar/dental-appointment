import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import FooterLogo from "@/assets/footerlogo.png"; // logo image

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Book Appointment', path: '/book' },
];

const services = [
  'Teeth Cleaning',
  'Root Canal',
  'Crowns & Bridges',
  'Cosmetic Whitening',
  'Pediatric Care',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  const [email, setEmail] = useState('');

  // Smooth scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll for professional feel
    });
  };

  // Handle link clicks - scroll to top when navigating
  const handleLinkClick = () => {
    scrollToTop();
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Logo replaced + made smaller + works as scroll-to-top button */}
          <div className="space-y-4 sm:space-y-6">
            <button onClick={scrollToTop} className="flex items-center cursor-pointer">
              <img
                src={FooterLogo}
                alt="Footer Logo"
                className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform"
              />
            </button>

            <p className="text-background/70 text-xs sm:text-sm leading-relaxed">
              Your trusted partner in dental care. We provide professional, safe and comfortable
              dental treatment with easy online booking.
            </p>

            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-background/70 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleLinkClick}
                    className="text-background/70 hover:text-secondary transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    onClick={handleLinkClick}
                    className="text-background/70 hover:text-secondary transition-colors text-xs sm:text-sm"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Contact Info</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary mt-0.5 shrink-0" />
                  <span className="text-background/70 text-xs sm:text-sm">
                    12 Wellness Street, Demo City, 123456
                  </span>
                </li>

                <li className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                  <a
                    href="tel:+919876543210"
                    className="text-background/70 hover:text-secondary transition-colors text-xs sm:text-sm break-words"
                  >
                    +91 98765 43210
                  </a>
                </li>

                <li className="flex items-center gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary shrink-0" />
                  <a
                    href="mailto:contact@brightsmiledemo.com"
                    className="text-background/70 hover:text-secondary transition-colors text-xs sm:text-sm break-all"
                  >
                    contact@brightsmiledemo.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-xs sm:text-sm mb-2 sm:mb-3">Subscribe to Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-9 sm:h-10 text-xs sm:text-sm"
                />
                <Button type="submit" size="icon" variant="gold" className="shrink-0 h-9 w-9 sm:h-10 sm:w-10">
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-background/60 text-xs sm:text-sm text-center md:text-left">
            © 2025 BrightSmile Dental – Demo Website. All rights reserved.
          </p>

          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-background/60 hover:text-background text-xs sm:text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/60 hover:text-background text-xs sm:text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
