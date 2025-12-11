import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
  ];
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Side - Header */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 bg-pastel rounded-full px-3 sm:px-4 py-2 mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">{t('faq.badge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 break-words">
              {t('faq.title')} <span className="text-primary">{t('faq.titleHighlight')}</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 break-words">
              {t('faq.description')}
            </p>
            <div className="p-4 sm:p-6 bg-pastel rounded-xl sm:rounded-2xl">
              <p className="font-medium text-sm sm:text-base text-foreground mb-2">{t('faq.stillHave')}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                {t('faq.help')}
              </p>
              <a
                href="tel:+919876543210"
                className="text-sm sm:text-base text-primary font-semibold hover:underline"
              >
                {t('faq.call')} {t('contact.phoneDisplay')}
              </a>
            </div>
          </div>

          {/* Right Side - Accordion */}
          <div>
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border/50 px-4 sm:px-6 shadow-soft"
                >
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base text-foreground hover:text-primary hover:no-underline py-4 sm:py-5 break-words">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-4 sm:pb-5 break-words">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
