import { Testimonial } from "@models/Testimonial/interface";
import UserImage from "@components/UserImage";
import { Text, View } from "react-native";

interface Props {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<Props> = ({ testimonial }) => {
  return (
    <View className="w-full h-full p-2 iphoneX:p-4 border rounded-xl bg-gray-900 bg-opacity-30 ">
      <View className="flex flex-row items-center">
        <UserImage
          height="h-4 iphoneX:h-6"
          width="w-4 iphoneX:w-6"
          image={testimonial?.media}
          name={testimonial?.name}
        />
        <Text
          numberOfLines={1}
          className=" ml-2  w-full flex-1 text-base  font-heavy text-gray-100"
        >
          {testimonial.name}
        </Text>
      </View>
      {testimonial.quote ? (
        <View className="pt-1">
          <Text
            numberOfLines={1}
            className="text-sm py-1 iphoneX:tex-base capitalize text-white"
          >
            {testimonial.achievement?.toLocaleLowerCase()}
          </Text>
          <Text
            numberOfLines={3}
            className="text-[.6rem] iphoneX:text-xs flex-1  text-gray-300"
          >
            {testimonial.quote}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default TestimonialCard;
