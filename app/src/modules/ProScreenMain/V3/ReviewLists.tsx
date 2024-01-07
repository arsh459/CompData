import { View, Text, ScrollView } from "react-native";

import ReviewComp from "../ReviewComp";
import { useTestimonialsContext } from "@providers/testimonials/TestimonialsProvider";

const ReviewLists = () => {
  // const { testimonials } = useFemaleTestimonials();
  const { testimonials } = useTestimonialsContext();

  return (
    <View className="flex-1">
      <Text
        className="text-sm iphoneX:text-base py-4 pl-5 text-white"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Reviews
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="pl-4 flex-1"
      >
        {testimonials?.map((item) =>
          item.quote ? <ReviewComp key={item.id} testimonial={item} /> : null
        )}
      </ScrollView>
    </View>
  );
};

export default ReviewLists;
