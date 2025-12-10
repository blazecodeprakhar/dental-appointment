import { Star, Quote } from 'lucide-react';
import testimonial1 from '@/assets/testimonial-1.jpg';
import testimonial2 from '@/assets/testimonial-2.jpg';
import testimonial3 from '@/assets/testimonial-3.jpg';

const testimonials = [
  {
    name: 'Ananya S.',
    image: testimonial1,
    rating: 5,
    text: 'Fantastic experience! The dentist explained everything clearly and made me feel comfortable throughout the treatment. Highly recommended!',
  },
  {
    name: 'Rahul M.',
    image: testimonial2,
    rating: 5,
    text: 'I booked my appointment online and the whole process was very smooth. The clinic is clean and modern. Best dental care in the city!',
  },
  {
    name: 'Sara T.',
    image: testimonial3,
    rating: 5,
    text: 'Best dental care I\'ve ever received. The staff is friendly and professional. Dr. Rao is incredibly skilled and gentle.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-pastel">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-3 sm:px-4 py-2 shadow-soft mb-4">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            <span className="text-xs sm:text-sm font-medium text-primary">Patient Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            What Our <span className="text-primary">Patients Say</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Don't just take our word for it. Here's what our patients have to say about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card border border-border/50 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 sm:-top-4 right-4 sm:right-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center shadow-teal">
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-secondary fill-secondary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm sm:text-base text-foreground leading-relaxed mb-4 sm:mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary/20 shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base text-foreground">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Verified Patient</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
