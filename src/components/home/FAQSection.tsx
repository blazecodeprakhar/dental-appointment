import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Do you accept insurance?',
    answer: 'Yes, we accept most major dental insurance plans. Please contact our office with your insurance details and we\'ll verify your coverage before your appointment.',
  },
  {
    question: 'How long does a teeth cleaning appointment take?',
    answer: 'A standard teeth cleaning appointment typically takes around 20–30 minutes for most patients. If you haven\'t had a cleaning in a while or require deeper cleaning, it may take a bit longer.',
  },
  {
    question: 'Do you treat dental emergencies?',
    answer: 'Yes, we provide priority appointments for urgent cases. If you\'re experiencing severe pain, swelling, or a dental emergency, please call us immediately and we\'ll try to see you as soon as possible.',
  },
  {
    question: 'Do you treat children?',
    answer: 'Absolutely! Our clinic is child-friendly and we have extensive experience in pediatric dental care. We make every effort to ensure children feel comfortable and safe during their visits.',
  },
  {
    question: 'What if I need to cancel my appointment?',
    answer: 'You can cancel or reschedule your appointment up to 24 hours before the scheduled time without any penalty. For urgent changes, please call the clinic directly.',
  },
];

export function FAQSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Side - Header */}
          <div className="lg:sticky lg:top-32">
            <div className="inline-flex items-center gap-2 bg-pastel rounded-full px-3 sm:px-4 py-2 mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
              Find answers to common questions about our services, appointments, and policies.
              Can't find what you're looking for? Feel free to contact us!
            </p>
            <div className="p-4 sm:p-6 bg-pastel rounded-xl sm:rounded-2xl">
              <p className="font-medium text-sm sm:text-base text-foreground mb-2">Still have questions?</p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                Our team is here to help. Reach out and we'll get back to you as soon as possible.
              </p>
              <a
                href="tel:+919876543210"
                className="text-sm sm:text-base text-primary font-semibold hover:underline"
              >
                Call +91 98765 43210
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
                  <AccordionTrigger className="text-left font-semibold text-sm sm:text-base text-foreground hover:text-primary hover:no-underline py-4 sm:py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-4 sm:pb-5">
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
