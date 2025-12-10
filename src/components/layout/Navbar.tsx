import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LogoNav from "@/assets/logonav.png"; // <-- Your logo image

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    // Only scroll to top if there's no hash in the URL
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const scrollToBooking = () => {
    setIsMobileMenuOpen(false); // Close mobile menu
    if (location.pathname !== '/') {
      // Navigate to home page first, then scroll to booking
      window.location.href = '/#book-appointment';
    } else {
      // If already on home page, just scroll to booking section
      setTimeout(() => {
        document
          .getElementById('book-appointment')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    setIsMobileMenuOpen(false); // Close mobile menu
    // If it's a hash link, handle it specially
    if (path.startsWith('/#')) {
      e.preventDefault(); // Prevent default navigation
      const hash = path.substring(2); // Remove '/#' to get just the id (e.g., 'contact')
      if (location.pathname === '/') {
        // Already on home page, just scroll to section
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // Account for fixed navbar height
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      } else {
        // Navigate to home page first, then scroll to section
        window.location.href = path;
      }
    } else {
      // Regular navigation - ScrollToTop component will handle scrolling
      // Don't prevent default for regular links
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-card/95 backdrop-blur-lg shadow-card py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* ---- Logo Image (FULL PNG, NO CROP) ---- */}
        <Link 
          to="/" 
          onClick={() => {
            setIsMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group"
        >
          <img
            src={LogoNav}
            alt="Logo"
            className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={cn(
                'text-sm font-medium transition-colors relative group',
                location.pathname === link.path || (link.path === '/#contact' && location.hash === '#contact')
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {link.name}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300',
                  (location.pathname === link.path || (link.path === '/#contact' && location.hash === '#contact')) ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <a
            href="tel:+919876543210"
            className="hidden xl:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 98765 43210
          </a>
          <Button onClick={scrollToBooking} size="sm" className="text-xs sm:text-sm">
            Book Appointment
          </Button>
        </div>

        {/* Mobile Menu Button (mobile-only style changes) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
          className={cn(
            // mobile-only: transparent bg, no hover fill, visible primary icon
            'lg:hidden p-2 transition-colors',
            // keep rounded for touch target but no fill color
            'rounded-lg bg-transparent hover:bg-transparent'
          )}
        >
          {isMobileMenuOpen ? (
            // X icon colored to primary for visibility over images
            <X className="w-6 h-6 text-primary" />
          ) : (
            // Menu icon colored to primary
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu (mobile-only background fixed for readability) */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 backdrop-blur transition-all duration-300 overflow-hidden',
          // use a light (or semi-opaque) background on mobile so menu content reads over images
          isMobileMenuOpen
            ? 'max-h-[500px] opacity-100 bg-white/95 dark:bg-black/80 shadow-premium'
            : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 sm:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={cn(
                'text-base font-medium py-2 px-4 rounded-lg transition-colors',
                location.pathname === link.path || (link.path === '/#contact' && location.hash === '#contact')
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <Button onClick={scrollToBooking} className="w-full">
              Book Appointment
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
