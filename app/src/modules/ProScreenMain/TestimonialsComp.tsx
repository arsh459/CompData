import { View, Text, Image } from "react-native";

import { Testimonial } from "@models/Testimonial/interface";
import UserImage from "@components/UserImage";
interface Props {
  testimonial: Testimonial;
}
const TestimonialsComp: React.FC<Props> = ({ testimonial }) => {
  return (
    <View className="h-full bg-[#343150] rounded-xl p-4">
      <View className="w-full flex flex-row justify-between items-center">
        <UserImage
          image={testimonial.image}
          name={testimonial.name}
          width="w-6"
          height="aspect-square"
        />
        <Text
          className="text-white text-sm iphoneX:text-base flex-1 ml-3"
          style={{ fontFamily: "Nunito-Bold" }}
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
        numberOfLines={4}
        className="text-white/70 text-xs iphoneX:text-sm"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {testimonial.quote}
      </Text>
    </View>
  );
};

export default TestimonialsComp;
