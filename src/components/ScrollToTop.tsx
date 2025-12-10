import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    // Hash navigation will be handled by the page component
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth', // Smooth scroll for professional feel
      });
    }
  }, [pathname, hash]);

  return null;
}

