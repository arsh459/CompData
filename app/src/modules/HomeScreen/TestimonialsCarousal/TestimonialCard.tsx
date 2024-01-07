import GradientText from "@components/GradientText";
import MediaTile from "@components/MediaCard/MediaTile";
import { Testimonial } from "@models/Testimonial/interface";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
export const itemSize = width * 0.6;

interface Props {
  item: Testimonial;
}

const TestimonialCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation();

  const onPress = () => {
    weEventTrack("home_clickTestimonial", {});
    navigation.navigate("Testimonial", { testimonialId: item.id });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: itemSize }}
      className="bg-[#343150] rounded-3xl overflow-hidden"
    >
      <View className="w-full aspect-[277/316] relative z-0">
        <MediaTile
          media={item?.image || item?.thumbnail}
          fluid={true}
          fluidResizeMode="cover"
        />
        {item.shortAchievement ? (
          <LinearGradient
            colors={["#34315000", "#343150"]}
            className="absolute left-0 right-0 -bottom-1 p-4"
          >
            <Text
              className="text-2xl text-white text-center"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              "{item.shortAchievement}"
            </Text>
          </LinearGradient>
        ) : null}
      </View>
      <View className="p-4 flex justify-center items-center">
        <GradientText
          text="Tap to view"
          colors={["#75E0E0", "#7096FB"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          textStyle={{ fontFamily: "Nunito-Bold" }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TestimonialCard;
