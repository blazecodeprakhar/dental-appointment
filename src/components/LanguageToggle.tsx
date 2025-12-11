import { useState } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en' as const, name: 'English', native: 'English' },
  { code: 'hi' as const, name: 'Hindi', native: 'हिंदी' },
  { code: 'ur' as const, name: 'Urdu', native: 'اردو' },
  { code: 'mr' as const, name: 'Marathi', native: 'मराठी' },
  { code: 'kn' as const, name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml' as const, name: 'Malayalam', native: 'മലയാളം' },
  { code: 'ta' as const, name: 'Tamil', native: 'தமிழ்' },
  { code: 'te' as const, name: 'Telugu', native: 'తెలుగు' },
];

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'fixed z-[100]',
            'top-3 right-14 sm:top-4 sm:right-4', // Move right on mobile to avoid menu button
            'w-8 h-8 sm:w-9 sm:h-9 rounded-full',
            'bg-card/95 backdrop-blur-md border border-border/50',
            'shadow-lg hover:shadow-xl',
            'flex items-center justify-center',
            'transition-all duration-200',
            'hover:scale-110 active:scale-95',
            'text-foreground hover:text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          )}
          aria-label="Select language"
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-44 bg-card/95 backdrop-blur-md border-border/50 shadow-xl max-h-[80vh] overflow-y-auto"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
              setOpen(false);
            }}
            className={cn(
              'cursor-pointer flex items-center justify-between',
              'transition-colors',
              language === lang.code
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-accent'
            )}
          >
            <span className="text-sm">{lang.native}</span>
            {language === lang.code && (
              <span className="text-xs text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

