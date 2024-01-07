import { View, Text, useWindowDimensions } from "react-native";

import { Testimonial } from "@models/Testimonial/interface";
import MediaTile from "@components/MediaCard/MediaTile";
interface Props {
  testimonial: Testimonial;
}
const ReviewComp: React.FC<Props> = ({ testimonial }) => {
  const { width } = useWindowDimensions();

  return (
    <View
      className=" bg-[#343150]/40  rounded-xl p-4 mr-3"
      style={{ width: width * 0.69 }}
    >
      <View className="w-full flex flex-row justify-between items-center">
        <View className="w-6  aspect-square  rounded-full">
          <MediaTile
            fluid={true}
            media={testimonial.media}
            roundedStr="rounded-full"
          />
        </View>
        <Text
          className="text-white pl-2 text-sm iphoneX:text-base flex-1"
          style={{ fontFamily: "Nunito-Medium" }}
        >
          {testimonial.name}
        </Text>
      </View>

      <Text
        className="text-white  text-xs pb-3 pt-2 w-3/4 capitalize"
        style={{ fontFamily: "Nunito-Bold", lineHeight: 17 }}
      >
        {testimonial.achievement}
      </Text>
      <Text
        numberOfLines={7}
        className="text-[#FFFFFFCC] text-xs"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        {testimonial.quote}
      </Text>
    </View>
  );
};

export default ReviewComp;
