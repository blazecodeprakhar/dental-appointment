import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingForm } from '@/components/home/BookingForm';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';

const policies = [
  {
    icon: Clock,
    title: 'Arrive Early',
    description: 'Please arrive 10 minutes before your scheduled appointment to complete any necessary paperwork.',
  },
  {
    icon: AlertTriangle,
    title: 'Cancellation Policy',
    description: 'Appointments can be cancelled or rescheduled up to 24 hours before the scheduled time without any penalty.',
  },
  {
    icon: CheckCircle,
    title: 'First-Time Patients',
    description: 'New patients should bring a valid ID and any relevant medical records or X-rays from previous dentists.',
  },
  {
    icon: Calendar,
    title: 'Confirmation',
    description: 'All appointment requests will be confirmed via phone call or SMS within a few hours of submission.',
  },
];

const BookAppointment = () => {
  return (
    <>
      <Helmet>
        <title>Book Appointment – BrightSmile Dental | Demo</title>
        <meta name="description" content="Book your dental appointment online with BrightSmile Dental. Easy scheduling, flexible time slots, and fast confirmation." />
        <link rel="canonical" href="/book" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <BookingForm isFullPage />

          {/* Appointment Policy Section */}
          <section className="py-12 sm:py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                  Appointment <span className="text-primary">Policy</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Please review our appointment guidelines to ensure a smooth visit.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
                {policies.map((policy) => (
                  <div
                    key={policy.title}
                    className="bg-card rounded-xl p-4 sm:p-6 border border-border/50 shadow-soft text-center"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <policy.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground mb-2">{policy.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BookAppointment;
