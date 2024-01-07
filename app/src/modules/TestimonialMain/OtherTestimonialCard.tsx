import UserImage from "@components/UserImage";
import { Testimonial } from "@models/Testimonial/interface";
import { View, Text } from "react-native";

interface Props {
  testimonial?: Testimonial;
  cardColor: string;
}

const OtherTestimonialCard: React.FC<Props> = ({ testimonial, cardColor }) => {
  return testimonial?.quote ? (
    <View
      style={{ backgroundColor: cardColor }}
      className="mt-4 p-2.5 border border-white/20 rounded-[20px]"
    >
      <View
        style={{ backgroundColor: cardColor }}
        className="p-4 border border-white/10 rounded-2xl mb-2.5"
      >
        <View className="flex flex-row">
          <UserImage
            image={testimonial.media}
            name={testimonial.name}
            width="w-7"
            height="h-7"
          />
          <Text
            className="text-white text-lg ml-2.5"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {testimonial.name}
          </Text>
        </View>
        {testimonial.achievement ? (
          <Text
            className="text-white text-sm mt-2.5"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {testimonial.achievement}
          </Text>
        ) : null}
      </View>
      <Text
        className="my-2 mx-1 text-white/80 text-sm"
        style={{ fontFamily: "Nunito-Medium" }}
      >
        {testimonial.quote}
      </Text>
    </View>
  ) : null;
};

export default OtherTestimonialCard;
