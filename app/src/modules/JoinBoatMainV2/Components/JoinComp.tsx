import Swiper from "@components/Swiper";
import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import { Testimonial } from "@models/Testimonial/interface";
import Header from "@modules/Header";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  Image,
  // TouchableOpacity,
} from "react-native";
import GetStarted from "./GetStarted";

interface Props {
  // onSkip: () => void;
  onBookConsultation: () => void;
}

const JoinComp: React.FC<Props> = ({ onBookConsultation }) => {
  const { testimonials } = useTestimonials(14);
  const { width } = useWindowDimensions();

  return (
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        headerType="overlay"
        // optionNode={
        //   <TouchableOpacity onPress={onSkip}>
        //     <Text className="text-white text-base">Skip for now</Text>
        //   </TouchableOpacity>
        // }
      />
      <SafeAreaView className="flex-1 bg-[#100F1A]">
        <Video
          source={{
            uri: "https://d2cjy81ufi4f1m.cloudfront.net/videoo.MP4",
          }}
          className="absolute left-0 right-0 top-0"
          style={{ aspectRatio: 0.7 }}
          isMuted={true}
          isLooping={true}
          shouldPlay={true}
          resizeMode={"cover" as ResizeMode}
        />
        <View className="flex-1" />
        <LinearGradient
          colors={["transparent", "#100F1A", "#100F1A", "#100F1A"]}
        >
          <View className="h-32">
            <Swiper slideWidth={width / 1.2} spaceBetween={16} marginX={8}>
              {testimonials.map((item) => (
                <TestimonialComp key={item.id} testimonial={item} />
              ))}
            </Swiper>
          </View>
          <View className="flex-1 flex justify-center items-center px-8 my-12">
            <Text
              className="text-[#F1F1F1] text-xl iphoneX:text-2xl"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Make a change in your life and join our fitness revolution!
            </Text>
          </View>
          <GetStarted
            text="Book a free consultation"
            onGetStarted={onBookConsultation}
          />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
};

export default JoinComp;

interface TestimonialProps {
  testimonial: Testimonial;
}

const TestimonialComp: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <View className="h-full bg-[#100F1A]/40 border border-white/20 rounded-xl p-4">
      <View className="w-full flex flex-row justify-between items-center">
        <Text
          className="text-[#F1F1F1] text-sm iphoneX:text-base flex-1"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {testimonial.name}
        </Text>
        <View className="w-16 iphoneX:w-20" style={{ aspectRatio: 72 / 12 }}>
          <View
            style={{ width: `${(5 / 5) * 100}%` }} // Here first 5 will be rating from 0 to 5
            className="h-full overflow-hidden"
          >
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/Component_49_8kdkqM6tF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666176307073",
              }}
              className="w-16 iphoneX:w-20 h-full"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <View className="h-2" />
      <Text
        numberOfLines={3}
        className="text-[#C5C5C5] text-xs iphoneX:text-sm"
        style={{ fontFamily: "BaiJamjuree-Medium" }}
      >
        {testimonial.quote}
      </Text>
    </View>
  );
};
