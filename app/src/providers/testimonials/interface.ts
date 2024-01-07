import { Testimonial } from "@models/Testimonial/interface";

export type TestimonialsContextProps = {
  children: React.ReactNode;
};

export interface TestimonialsContextInterface {
  testimonials: Testimonial[];
  mediaTestimonials: Testimonial[];
}
