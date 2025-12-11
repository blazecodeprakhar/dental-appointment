# BrightSmile Dental Pro

A premium, modern dental clinic website built with React, Vite, Tailwind CSS, and full internationalization (i18n) support.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS + Vanilla CSS (animations) + shadcn/ui
- **Icons:** Lucide React
- **Internationalization:** i18next + react-i18next
- **Forms:** Web3Forms
- **SEO:** react-helmet-async
- **Routing:** react-router-dom

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Internationalization (i18n)

This project has robust i18n support implemented using `i18next` and `react-i18next`.

### Features
- **Language Persistence:** User's language preference is saved in `localStorage` (`brightsmile-language`).
- **Language Detection:** Automatically checks `localStorage` first, then browser settings.
- **Dynamic Content:** Dates and times are formatted according to the selected locale.
- **SEO Friendly:** Meta tags and page titles are localized.
- **Accessibility:** properly localized `aria-labels` and `alt` text.

### Supported Languages
- English (`en`)
- Hindi (`hi`)
- Marathi (`mr`)
- Kannada (`kn`)
- Malayalam (`ml`)
- Tamil (`ta`)
- Telugu (`te`)
- Urdu (`ur`)

### Adding/Editing Translations

All translation strings are stored in `src/locales/translations.ts`. Using a single TypeScript file allows for type-checking and easy management.

1. **Add a new key:**
   Add the key to the `en` object (e.g., `'new.feature.title': 'New Feature'`).
2. **Translate:**
   Add the same key to all other language objects (`hi`, `mr`, etc.) with the corresponding translation.

**Example:**
```typescript
// src/locales/translations.ts
export const translations = {
  en: {
    // ...
    'new.key': 'Hello World',
  },
  hi: {
    // ...
    'new.key': 'नमस्ते दुनिया',
  },
  // ...
};
```

### Usage in Components

Use the `useLanguage` hook (wrapper around `useTranslation`) to access translations.

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('new.key')}</h1>
      <button aria-label={t('aria.label')}>Click me</button>
    </div>
  );
};
```

### Date & Time Formatting

For localized dates, use `date-fns` with the appropriate locale map. The `BookingForm` component demonstrates this pattern.

## Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Page components (About, Services, etc.).
- `src/lib/i18n.ts`: i18next configuration.
- `src/contexts/LanguageContext.tsx`: Context provider for language state.
- `src/locales/translations.ts`: Translation data source.
