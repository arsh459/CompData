import OtherTestimonialCard from "@modules/TestimonialMain/OtherTestimonialCard";
import { useTestimonialsContext } from "@providers/testimonials/TestimonialsProvider";
import { View, Text } from "react-native";

const otherColors = ["#B094FF38", "#71BAFF38", "#FD7AFF38"];

const Testimonial = () => {
  const { testimonials } = useTestimonialsContext();

  return (
    <>
      {testimonials.length ? (
        <View className="p-4">
          <Text
            className="text-white text-5xl text-center leading-none py-4 mt-20"
            style={{ fontFamily: "Canela-Light" }}
          >
            From our community
          </Text>

          {testimonials.map((each, index) => (
            <OtherTestimonialCard
              key={each.id}
              testimonial={each}
              cardColor={otherColors[index % otherColors.length]}
            />
          ))}
        </View>
      ) : null}
    </>
  );
};

export default Testimonial;
