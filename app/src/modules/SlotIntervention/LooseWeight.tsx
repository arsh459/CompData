import { View, Text } from "react-native";
import Achieved from "./Achieved";
import { useEffect, useState } from "react";
import { Testimonial } from "@models/Testimonial/interface";
import firestore from "@react-native-firebase/firestore";
import MediaCard from "@components/MediaCard";
import { LinearGradient } from "expo-linear-gradient";

const LooseWeight = () => {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [testimonial, setTestimonial] = useState<Testimonial>();

  useEffect(() => {
    const getTestimonial = async () => {
      const testimonial = await firestore()
        .collection("testimonials")
        .doc("57839c4c-936e-4a11-a779-576aa9bbc5e4") // Garima Kaushik Testimonial Id
        .get();

      if (testimonial.data()) {
        setTestimonial(testimonial.data() as Testimonial);
      }
    };

    getTestimonial();
  }, []);

  return (
    <View className="flex-1 flex justify-center items-center relative z-0">
      <View className="w-full aspect-square relative z-0">
        <MediaCard
          media={testimonial?.video || testimonial?.image}
          thumbnail={testimonial?.thumbnail}
          fluid={true}
          fluidResizeMode={isPaused ? "cover" : undefined}
          playInFullScreen={true}
          setIsPaused={setIsPaused}
        />

        <LinearGradient
          colors={["#894FD300", "#5F46C9"]}
          className="absolute left-0 right-0 bottom-0 h-1/3"
          pointerEvents="none"
        />
      </View>

      <View className="flex-1" />

      <View className="absolute left-0 right-0 bottom-0 h-3/5 p-4">
        <Text className="text-[#FEFDFF] text-3xl iphoneX:text-4xl font-medium px-4">
          “Garima <Text className="text-[#C7FF26]">lost 15 Kgs</Text> with
          SocialBoat. You can do it too.”
        </Text>

        <Achieved />
      </View>
    </View>
  );
};

export default LooseWeight;
