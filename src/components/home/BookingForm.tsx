import { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';

import { enUS, hi, te, ta, kn } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const localeMap: Record<string, any> = {
  en: enUS,
  hi: hi,
  ur: enUS,
  mr: hi,
  kn: kn,
  ml: enUS,
  ta: ta,
  te: te,
};

const WEB3FORMS_ACCESS_KEY = '2eddbb9f-6620-4d4f-af20-485918907cf3';

const generateAvailableDates = (days = 7) => {
  const dates: Date[] = [];
  const today = startOfDay(new Date());
  for (let i = 0; i < days; i++) {
    dates.push(addDays(today, i));
  }
  return dates;
};

interface BookingFormProps {
  isFullPage?: boolean;
}

export function BookingForm({ isFullPage = false }: BookingFormProps) {
  const { t, language } = useLanguage();
  const currentLocale = localeMap[language] || enUS;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = useMemo(() => {
    const slots: { value: string; label: string }[] = [];
    for (let hour = 8; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const label = format(new Date(2024, 0, 1, hour, minute), 'p', { locale: currentLocale });
        slots.push({ value, label });
      }
    }
    return slots;
  }, [currentLocale]);

  const availableDates = useMemo(() => generateAvailableDates(7), []);

  const symptoms = [
    { id: 'pain', label: t('booking.symptom.pain'), icon: '🦷' },
    { id: 'sensitivity', label: t('booking.symptom.sensitivity'), icon: '❄️' },
    { id: 'broken', label: t('booking.symptom.broken'), icon: '💔' },
    { id: 'gum', label: t('booking.symptom.gum'), icon: '🩹' },
    { id: 'cleaning', label: t('booking.symptom.cleaning'), icon: '✨' },
    { id: 'whitening', label: t('booking.symptom.whitening'), icon: '⭐' },
  ];

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId) ? prev.filter(s => s !== symptomId) : [...prev, symptomId]
    );
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 6;
  };

  // Helper: check if a slot (HH:MM) on selectedDate is already past in client's timezone
  const isSlotInPast = (date: Date | null, slotValue: string) => {
    if (!date) return false;
    const now = new Date();
    const [hh, mm] = slotValue.split(':').map(Number);

    // Create a new date object based on the selected date to avoid mutating the original 'date'
    // Ensure we are working with the start of the day for the selected date + slot time
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hh, mm, 0, 0);

    // Disable if the slot time is earlier than or equal to now
    return slotDateTime <= now;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !selectedDate || !selectedTime) {
      toast.error(t('booking.error') || 'Please fill required fields');
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.error(t('booking.phoneError') || 'Please enter a valid phone number');
      return;
    }

    // Frontend guard: block if selected slot is now past
    if (isSlotInPast(selectedDate, selectedTime!)) {
      toast.error(t('booking.slotPastError') || 'Selected time is no longer available. Please choose another slot.');
      return;
    }

    setIsSubmitting(true);

    // Formatted strictly in English for the doctor's email
    const formattedDateForDoctor = format(selectedDate, 'PPPP', { locale: enUS });

    // Parse time manually from HH:mm value to ensure English AM/PM format
    const [h, m] = selectedTime!.split(':').map(Number);
    const timeDate = new Date();
    timeDate.setHours(h, m);
    const formattedTimeForDoctor = format(timeDate, 'p', { locale: enUS });

    // Map symptoms to English labels
    const englishSymptomsMap: Record<string, string> = {
      'pain': 'Tooth Pain',
      'sensitivity': 'Sensitivity',
      'broken': 'Broken Tooth',
      'gum': 'Gum Swelling',
      'cleaning': 'Routine Cleaning',
      'whitening': 'Cosmetic Whitening',
    };

    const symptomLabelsForDoctor =
      selectedSymptoms.map(s => englishSymptomsMap[s] || s).join(', ') || 'Not specified';

    const appointmentSummary = `Appointment Date: ${formattedDateForDoctor}\nAppointment Time: ${formattedTimeForDoctor}\nSymptoms: ${symptomLabelsForDoctor}\nPatient Phone: ${formData.phone}\nPatient Email: ${formData.email || 'Not provided'}\nMessage: ${formData.message || 'No additional message'}`;

    try {
      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_ACCESS_KEY);

      // Patient fields
      payload.append('name', formData.name);
      payload.append('phone', formData.phone);
      payload.append('email', formData.email || 'Not provided');

      // Clearly labeled fields for doctor's email (Always in English)
      payload.append('Appointment Date', formattedDateForDoctor);
      payload.append('Appointment Time', formattedTimeForDoctor);
      payload.append('Symptoms', symptomLabelsForDoctor);

      // Summary & subject
      payload.append('appointment_summary', appointmentSummary);
      payload.append('subject', `Appointment Request — ${formData.name} — ${formattedDateForDoctor} at ${formattedTimeForDoctor}`);

      // Message body
      payload.append('message', formData.message || 'No additional message');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (data && data.success) {
        toast.success(t('booking.success') || 'Appointment request submitted');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedSymptoms([]);
      } else {
        console.error('Web3Forms error:', data);
        toast.error(t('booking.error') || 'Submission failed');
      }
    } catch (err) {
      console.error('Submission exception:', err);
      toast.error(t('booking.error') || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="book-appointment"
      className={cn(
        'py-12 sm:py-16 lg:py-20',
        isFullPage ? 'pt-24 sm:pt-32' : 'bg-pastel'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-3 sm:px-4 py-2 shadow-soft mb-4">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">{t('booking.badge')}</span>
          </div>
          <h2 className={cn(
            "font-bold text-foreground mb-3 sm:mb-4",
            ['hi', 'mr', 'te', 'ta', 'ml', 'kn'].includes(useLanguage().language)
              ? "text-xl sm:text-4xl"
              : "text-2xl sm:text-3xl md:text-4xl"
          )}>
            {t('booking.title')} <span className="text-primary">{t('booking.titleHighlight')}</span>
          </h2>
          <p className={cn(
            "text-muted-foreground",
            ['hi', 'mr', 'te', 'ta', 'ml', 'kn'].includes(useLanguage().language)
              ? "text-sm sm:text-base leading-relaxed"
              : "text-sm sm:text-base"
          )}>
            {t('booking.description')}
          </p>
        </div>

        {/* Card */}
        <div className="max-w-5xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl sm:rounded-[28px] shadow-xl p-6 sm:p-8 md:p-10 border border-border/50 overflow-visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {/* Left: Personal Info */}
              <div className="space-y-4 sm:space-y-5">
                <h3 className={cn(
                  "font-semibold text-foreground flex items-center gap-2",
                  ['hi', 'mr', 'te', 'ta', 'ml', 'kn'].includes(useLanguage().language)
                    ? "text-base sm:text-lg"
                    : "text-base sm:text-lg"
                )}>
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  {t('booking.personalInfo')}
                </h3>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('booking.name')} <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder={t('contact.placeholder.name')}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 sm:h-11 text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('booking.phone')} <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder={t('contact.phoneDisplay')}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-12 sm:h-11 text-base sm:text-sm"
                      type="tel"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('booking.email')} <span className="text-muted-foreground text-xs">({t('common.optional')})</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder={t('contact.placeholder.email')}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 sm:h-11 text-base sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('booking.message')} <span className="text-muted-foreground text-xs">({t('common.optional')})</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      placeholder={t('booking.message')}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="pl-10 min-h-[120px] sm:min-h-[110px] resize-none text-base sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Date/Time/Symptoms */}
              <div className="space-y-4 sm:space-y-5">
                {/* Date */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2 mb-3 break-words">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    {t('booking.selectDate')} <span className="text-destructive">*</span>
                  </h3>

                  <div className="mt-0 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-2.5">
                    {availableDates.map(date => {
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={() => {
                            setSelectedDate(date);
                            setSelectedTime(null);
                          }}
                          className={cn(
                            'flex flex-col items-center justify-center px-1.5 sm:px-2 py-2.5 sm:py-2 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-center min-h-[70px] sm:min-h-[64px] active:scale-95',
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                              : 'bg-background border-border hover:border-primary/60 active:bg-accent'
                          )}
                        >
                          <span className="text-[10px] sm:text-[11px] font-medium opacity-80 mb-0.5">{format(date, 'EEE', { locale: currentLocale })}</span>
                          <span className="text-base sm:text-lg font-bold leading-tight">{format(date, 'd')}</span>
                          <span className="text-[9px] sm:text-[10px] opacity-70 mt-0.5">{format(date, 'MMM', { locale: currentLocale })}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time (updated polished grid) */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2 mb-3 break-words">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    {t('booking.selectTime')} <span className="text-destructive">*</span>
                  </h3>

                  <div className="mt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 max-h-[420px] sm:max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                    {timeSlots.map(slot => {
                      const active = selectedTime === slot.value;
                      const disabled = isSlotInPast(selectedDate, slot.value);

                      return (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => {
                            if (disabled) return;
                            setSelectedTime(slot.value);
                          }}
                          disabled={disabled}
                          aria-disabled={disabled}
                          aria-label={`${slot.label}${disabled ? ' (Unavailable)' : ''}`}
                          className={cn(
                            'relative flex items-center justify-center select-none rounded-lg border transition-all duration-200 ease-in-out',
                            'min-h-[56px] py-3 px-3 text-center bg-white border-[#e6eef0]',
                            active
                              ? 'bg-primary text-white border-primary shadow-[0_6px_20px_rgba(2,6,23,0.08)] scale-105 transform font-bold'
                              : 'text-foreground hover:translate-y-[-2px] hover:shadow-sm hover:border-primary/30',
                            disabled && 'slot-disabled bg-gray-50 text-muted-foreground/40 border-slate-100'
                          )}
                          title={disabled ? (t('booking.slotGone') || 'Not available') : slot.label}
                        >
                          <span className={cn('text-sm', active ? 'font-bold' : 'font-medium')}>
                            {slot.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2 mb-3 flex-wrap break-words">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    {t('booking.selectSymptoms')} <span className="text-muted-foreground text-xs font-normal">({t('common.optional')})</span>
                  </h3>
                  <div className="mt-0 grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-2">
                    {symptoms.map(sym => {
                      const active = selectedSymptoms.includes(sym.id);
                      return (
                        <button
                          key={sym.id}
                          type="button"
                          onClick={() => toggleSymptom(sym.id)}
                          className={cn(
                            'flex items-center justify-center gap-2 py-3 sm:py-2 px-4 sm:px-3 rounded-full border-2 text-sm font-medium transition-all duration-200 min-h-[48px] sm:min-h-[auto] active:scale-95',
                            active
                              ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                              : 'bg-background border-border hover:border-primary/60 active:bg-accent'
                          )}
                        >
                          <span className="text-lg sm:text-base">{sym.icon}</span>
                          <span className="text-xs sm:text-sm">{sym.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border/60">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 justify-between">
                <div className="mb-4 sm:mb-0 max-w-xl">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {t('booking.confirmation')}
                  </p>
                </div>

                <div className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    size="xl"
                    className={
                      'w-full sm:w-auto rounded-full px-8 py-4 sm:py-3 shadow-lg text-base sm:text-sm font-semibold text-center justify-center flex mx-0 sm:mx-auto mt-3 min-h-[56px] sm:min-h-[auto] active:scale-95 transition-transform'
                    }
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('booking.submitting') : t('booking.submit')}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
