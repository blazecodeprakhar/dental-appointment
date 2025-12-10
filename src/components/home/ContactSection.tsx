import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const WEB3FORMS_ACCESS_KEY = '2eddbb9f-6620-4d4f-af20-485918907cf3';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '12 Wellness Street, Demo City, 123456',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'contact@brightsmiledemo.com',
    href: 'mailto:contact@brightsmiledemo.com',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    content: 'Mon – Sat: 9:00 AM – 6:00 PM',
    subContent: 'Sunday: Closed',
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateBasic = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please write a message');
      return false;
    }
    // phone optional but if present, check basic digits
    if (formData.phone.trim()) {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length < 6) {
        toast.error('Please enter a valid phone number');
        return false;
      }
    }
    // email optional but if present, basic format
    if (formData.email.trim()) {
      // simple regex
      const re = /\S+@\S+\.\S+/;
      if (!re.test(formData.email.trim())) {
        toast.error('Please enter a valid email');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateBasic()) return;

    setIsSubmitting(true);

    try {
      // Use FormData as recommended by Web3Forms
      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_ACCESS_KEY);

      // fields (these will appear in the email)
      payload.append('name', formData.name);
      payload.append('phone', formData.phone || 'Not provided');
      payload.append('email', formData.email || 'Not provided');
      payload.append('message', formData.message);
      payload.append('subject', `Website Contact — ${formData.name}`);

      // optional: add a readable summary field for email body
      const summary = `Name: ${formData.name}\nPhone: ${formData.phone || 'Not provided'}\nEmail: ${
        formData.email || 'Not provided'
      }\n\nMessage:\n${formData.message}`;
      payload.append('contact_summary', summary);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (data && data.success) {
        toast.success('Message sent! We will get back to you soon.');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        console.error('Web3Forms response error:', data);
        toast.error('Submission failed. Please try again or call us.');
      }
    } catch (err) {
      console.error('Submission exception:', err);
      toast.error('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-pastel">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-3 sm:px-4 py-2 shadow-soft mb-4">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Contact Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            For general questions or concerns, reach out to us anytime. We are here to help you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left - Contact Info & Map */}
          <div className="space-y-6 sm:space-y-8">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="bg-card rounded-xl p-4 sm:p-5 border border-border/50 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1">{info.title}</h4>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-words"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {info.content}
                      {info.subContent && (
                        <span className="block">{info.subContent}</span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-card rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-card h-48 sm:h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986432970718!3d40.697149413279485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1702987654321!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location"
              />
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-border/50 shadow-premium">
            <h3 className="font-semibold text-lg sm:text-xl text-foreground mb-4 sm:mb-6">
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <Input
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Phone</label>
                  <Input
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-medium text-foreground">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="min-h-[120px] resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto rounded-full px-6 py-3 shadow-lg flex items-center justify-center"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
