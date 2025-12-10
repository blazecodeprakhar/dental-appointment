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
import { format, addDays, startOfDay } from 'date-fns';

const WEB3FORMS_ACCESS_KEY = '2eddbb9f-6620-4d4f-af20-485918907cf3';

const symptoms = [
  { id: 'pain', label: 'Tooth Pain', icon: '🦷' },
  { id: 'sensitivity', label: 'Sensitivity', icon: '❄️' },
  { id: 'broken', label: 'Broken Tooth', icon: '💔' },
  { id: 'gum', label: 'Gum Swelling', icon: '🩹' },
  { id: 'cleaning', label: 'Routine Cleaning', icon: '✨' },
  { id: 'whitening', label: 'Cosmetic Whitening', icon: '⭐' },
];

const generateTimeSlots = () => {
  const slots: { value: string; label: string }[] = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const label = format(new Date(2024, 0, 1, hour, minute), 'h:mm a');
      slots.push({ value, label });
    }
  }
  return slots;
};

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

  const timeSlots = useMemo(() => generateTimeSlots(), []);
  const availableDates = useMemo(() => generateAvailableDates(7), []); // increase if needed

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId) ? prev.filter(s => s !== symptomId) : [...prev, symptomId]
    );
  };

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !selectedDate || !selectedTime) {
      toast.error('Please fill required fields: Name, Phone, Date & Time.');
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);

    const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');
    const formattedTime = timeSlots.find(t => t.value === selectedTime)?.label ?? selectedTime;
    const symptomLabels =
      selectedSymptoms.map(s => symptoms.find(sym => sym.id === s)?.label ?? s).join(', ') || 'Not specified';

    const appointmentSummary = `Appointment Date: ${formattedDate}\nAppointment Time: ${formattedTime}\nSymptoms: ${symptomLabels}\nPatient Phone: ${formData.phone}\nPatient Email: ${formData.email || 'Not provided'}\nMessage: ${formData.message || 'No additional message'}`;

    try {
      const payload = new FormData();
      payload.append('access_key', WEB3FORMS_ACCESS_KEY);

      // Patient fields
      payload.append('name', formData.name);
      payload.append('phone', formData.phone);
      payload.append('email', formData.email || 'Not provided');

      // Clearly labeled fields for doctor's email
      payload.append('Appointment Date', formattedDate);
      payload.append('Appointment Time', formattedTime);
      payload.append('Symptoms', symptomLabels);

      // Summary & subject
      payload.append('appointment_summary', appointmentSummary);
      payload.append('subject', `Appointment Request — ${formData.name} — ${formattedDate} at ${formattedTime}`);

      // Message body
      payload.append('message', formData.message || 'No additional message');

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (data && data.success) {
        toast.success('Appointment request submitted! We will contact you shortly.');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedSymptoms([]);
      } else {
        console.error('Web3Forms error:', data);
        toast.error('Submission failed. Please try again or call us directly.');
      }
    } catch (err) {
      console.error('Submission exception:', err);
      toast.error('Network error. Please try again later.');
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
            <span className="text-xs sm:text-sm font-medium text-primary">Easy Online Booking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Book Your <span className="text-primary">Appointment</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Choose your preferred date and time, share details and submit. Our clinic will confirm shortly.
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
                <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Personal Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12 sm:h-11 text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="+91 98765 43210"
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
                    Email <span className="text-muted-foreground text-xs">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 sm:h-11 text-base sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message to Doctor <span className="text-muted-foreground text-xs">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                      placeholder="Describe your concern..."
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
                  <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Select Date <span className="text-destructive">*</span>
                  </h3>

                  <div className="mt-0 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-2.5">
                    {availableDates.map(date => {
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={cn(
                            'flex flex-col items-center justify-center px-1.5 sm:px-2 py-2.5 sm:py-2 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-center min-h-[70px] sm:min-h-[64px] active:scale-95',
                            isSelected
                              ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                              : 'bg-background border-border hover:border-primary/60 active:bg-accent'
                          )}
                        >
                          <span className="text-[10px] sm:text-[11px] font-medium opacity-80 mb-0.5">{format(date, 'EEE')}</span>
                          <span className="text-base sm:text-lg font-bold leading-tight">{format(date, 'd')}</span>
                          <span className="text-[9px] sm:text-[10px] opacity-70 mt-0.5">{format(date, 'MMM')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Select Time <span className="text-destructive">*</span>
                  </h3>
                  <div className="mt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-2 max-h-[400px] sm:max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                    {timeSlots.map(slot => {
                      const active = selectedTime === slot.value;
                      return (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => setSelectedTime(slot.value)}
                          className={cn(
                            'py-3 sm:py-2 px-3 sm:px-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 text-center min-h-[48px] sm:min-h-[auto] active:scale-95',
                            active
                              ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                              : 'bg-background border-border hover:border-primary/60 active:bg-accent'
                          )}
                        >
                          {slot.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground flex items-center gap-2 mb-3 flex-wrap">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Select Symptoms <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
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
                    Your appointment request will be sent directly to our clinic. We will contact you for confirmation.
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
                    {isSubmitting ? 'Submitting...' : 'Submit Appointment Request'}
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
