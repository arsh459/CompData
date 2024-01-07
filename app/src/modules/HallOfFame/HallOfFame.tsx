import { View, Text, FlatList } from "react-native";

import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import { Testimonial } from "@models/Testimonial/interface";
import FameCard from "./FameCard";
import Loading from "@components/loading/Loading";

function renderItem({ item }: { item: Testimonial }) {
  return (
    <View className="bg-[#100F1A] flex-1">
      {item.isTransformation ? <FameCard item={item} /> : null}
    </View>
  );
}
const headerText = (
  <Text className="text-white text-center text-xl iphoneX:text-2xl font-bold ">
    Hall of Fame
  </Text>
);

const keyExtractor = (item: Testimonial) => item.id;

const HallOfFame = () => {
  const { testimonials, onNext } = useTestimonials(100);
  return (
    <>
      {testimonials.length === 0 ? (
        <View className="flex justify-center items-center flex-1 ">
          <Loading fill="#ff735c" width="w-16" height="h-16" />
        </View>
      ) : (
        <FlatList
          data={testimonials}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onNext}
          bounces={false}
          className="bg-[#100F1A] flex-1 px-2"
          ListHeaderComponent={headerText}
        />
      )}
    </>
  );
};

export default HallOfFame;
