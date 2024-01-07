import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import TestimonialMain from "@modules/TestimonialMain";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { useTestimonialsContext } from "@providers/testimonials/TestimonialsProvider";
import { useRoute } from "@react-navigation/native";

export interface TestimonialProps {
  testimonialId: string;
}

const Testimonial = () => {
  const route = useRoute();
  const params = route.params as TestimonialProps;
  const { mediaTestimonials } = useTestimonialsContext();

  useScreenTrack();

  return (
    <InteractionProvider>
      <TestimonialMain
        testimonial={
          mediaTestimonials.filter(
            (each) => each.id === params.testimonialId
          )[0]
        }
      />
    </InteractionProvider>
  );
};

export default Testimonial;
