import { iPhoneX } from "@constants/screen";
import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import { Testimonial } from "@models/Testimonial/interface";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import TestimonialCard from "./TestimonialCard";
import TestimonialModal from "./TestimonialModal";

const Testimonials = () => {
  const { testimonials } = useTestimonials(20);
  const [isOpen, setIsOpen] = useState(false);
  const [testimonialsArr, setTestimonialsArr] = useState<Testimonial[][]>([]);
  const [selectedTestimonial, setTestimonial] = useState<Testimonial>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const size = width > iPhoneX ? 3 : 2;
    const temp = [...testimonials];
    const tempArr: Testimonial[][] = [];
    while (temp.length > 0) {
      tempArr.push(temp.splice(0, size));
    }
    setTestimonialsArr(tempArr);
  }, [testimonials]);

  return (
    <View className="flex relative justify-center flex-col items-center w-full full">
      <Text className="text-xl pt-10 iphoneX:pt-20 justify-center flex  iphoneX:text-3xl font-bold text-white">
        Our Testimonials
      </Text>
      <ScrollView
        horizontal={true}
        className="my-2.5 iphoneX:my-4 p-1 iphoneX:p-2"
      >
        {testimonialsArr?.map((each, index) => (
          <View key={`testimonialsArr-${index}`}>
            {each.map((item, ind) => (
              <Pressable
                key={`${item.name}-${ind}`}
                style={{ width: width * 0.5, height: 135 }}
                className="m-1 iphoneX:m-2"
                onPress={() => {
                  setTestimonial(item);
                  setIsOpen(true);
                }}
              >
                <TestimonialCard testimonial={item} />
              </Pressable>
            ))}
          </View>
        ))}
      </ScrollView>
      <TestimonialModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        testimonial={selectedTestimonial}
      />
      <Text className="text-white py-2 animate-pulse text-xs iphoneX:text-sm">
        Tap to view their story
      </Text>
    </View>
  );
};

export default Testimonials;
