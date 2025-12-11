import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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

const welcomeMessages: Record<string, { title: string; subtitle: string; footer: string }> = {
  en: {
    title: 'Welcome!',
    subtitle: 'Please select your preferred language',
    footer: 'You can change this anytime using the language button',
  },
  hi: {
    title: 'स्वागत है!',
    subtitle: 'कृपया अपनी पसंदीदा भाषा चुनें',
    footer: 'आप कभी भी भाषा बटन का उपयोग करके इसे बदल सकते हैं',
  },
  ur: {
    title: 'خوش آمدید!',
    subtitle: 'براہ کرم اپنی پسندیدہ زبان منتخب کریں',
    footer: 'آپ کسی بھی وقت زبان کے بٹن کا استعمال کرکے اسے تبدیل کر سکتے ہیں',
  },
  mr: {
    title: 'स्वागत आहे!',
    subtitle: 'कृपया आपली पसंतीची भाषा निवडा',
    footer: 'आपण कधीही भाषा बटण वापरून हे बदलू शकता',
  },
  kn: {
    title: 'ಸ್ವಾಗತ!',
    subtitle: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    footer: 'ನೀವು ಯಾವಾಗಲೂ ಭಾಷಾ ಬಟನ್ ಬಳಸಿ ಇದನ್ನು ಬದಲಾಯಿಸಬಹುದು',
  },
  ml: {
    title: 'സ്വാഗതം!',
    subtitle: 'ദയവായി നിങ്ങളുടെ പ്രിയപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക',
    footer: 'നിങ്ങൾക്ക് എപ്പോഴും ഭാഷാ ബട്ടൺ ഉപയോഗിച്ച് ഇത് മാറ്റാം',
  },
  ta: {
    title: 'வரவேற்கிறோம்!',
    subtitle: 'தயவுசெய்து உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    footer: 'நீங்கள் எப்போதும் மொழி பொத்தானைப் பயன்படுத்தி இதை மாற்றலாம்',
  },
  te: {
    title: 'స్వాగతం!',
    subtitle: 'దయచేసి మీ ఇష్టమైన భాషను ఎంచుకోండి',
    footer: 'మీరు ఎప్పుడైనా భాష బటన్‌ను ఉపయోగించి దీన్ని మార్చవచ్చు',
  },
};

export function LanguageSelector() {
  const { hasSelectedLanguage, setLanguage, language } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show selector if language hasn't been selected
    if (!hasSelectedLanguage) {
      // Small delay for smooth appearance
      setTimeout(() => setShow(true), 300);
    }
  }, [hasSelectedLanguage]);

  const handleLanguageSelect = (langCode: typeof languages[number]['code']) => {
    setLanguage(langCode);
    setShow(false);
  };

  if (hasSelectedLanguage || !show) {
    return null;
  }

  // Get welcome message based on browser language or default to English
  const getWelcomeMessage = () => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang in welcomeMessages) {
      return welcomeMessages[browserLang];
    }
    return welcomeMessages.en;
  };

  const welcome = getWelcomeMessage();

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999]',
        'bg-background/95 backdrop-blur-sm',
        'flex items-center justify-center',
        'p-4',
        'transition-opacity duration-300',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'bg-card rounded-2xl shadow-2xl',
          'border border-border/50',
          'p-6 sm:p-8 md:p-10',
          'max-w-md w-full',
          'relative',
          'animate-scale-in'
        )}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            {welcome.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {welcome.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={cn(
                'flex flex-col items-center justify-center',
                'py-3 px-1 rounded-xl border',
                'transition-all duration-200',
                'hover:scale-105 active:scale-95 shadow-sm hover:shadow-md',
                'bg-white hover:bg-gray-50',
                'border-border hover:border-primary/50',
                language === lang.code && 'border-primary bg-primary/5 ring-1 ring-primary/20'
              )}
            >
              <span className="text-sm sm:text-base font-bold text-foreground mb-1 w-full text-center leading-tight break-words">
                {lang.native}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wide w-full text-center">
                {lang.name}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {welcome.footer}
          </p>
        </div>
      </div>
    </div>
  );
}

