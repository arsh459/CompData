import { useTestimonialsContext } from "@providers/testimonials/TestimonialsProvider";
import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import TestimonialCard, { itemSize } from "./TestimonialCard";
import { Testimonial } from "@models/Testimonial/interface";

const TestimonialsCarousal = () => {
  const { mediaTestimonials } = useTestimonialsContext();

  const renderItem = ({ item }: { item: Testimonial }) => {
    return <TestimonialCard item={item} />;
  };

  const keyExtractor = (item: Testimonial) => item.id;

  return mediaTestimonials.length ? (
    <View className="my-4">
      <Text
        className="text-[#F1F1F1] capitalize text-lg iphoneX:text-xl p-4 pb-2"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Testimonials
      </Text>
      <FlashList
        data={mediaTestimonials}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={itemSize}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        bounces={false}
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  ) : null;
};

export default TestimonialsCarousal;
