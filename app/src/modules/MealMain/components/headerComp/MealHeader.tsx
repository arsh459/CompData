import MediaCard from "@components/MediaCard";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, useWindowDimensions } from "react-native";
import MealNutriFacts from "../mealNutritionComps/MealNutriFacts";
import { useMealStore } from "../../store/useMealStore";
import { shallow } from "zustand/shallow";
import ImageWithURL from "@components/ImageWithURL";
import { mealImage } from "@constants/imageKitURL";
// import { useRecommendationById } from "@hooks/dayRecs/useRecommendationbyId";

// interface Props {
//   dayRecommendationId?: string;
// }
const MealHeader = () => {
  const { height } = useWindowDimensions();
  const { media, thumbnail, taskName } = useMealStore(({ task }) => {
    return {
      media: task?.videoThumbnail ? task?.videoThumbnail : task?.thumbnails,
      thumbnail: task?.videoThumbnail ? task?.videoThumbnail : task?.thumbnails,
      taskName: task?.name,
    };
  }, shallow);

  return (
    <>
      <View className="relative z-0">
        {media ? (
          <MediaCard
            media={media}
            thumbnail={thumbnail}
            maxHeight={height / 2}
          />
        ) : (
          <View
            className="rounded-xl overflow-hidden "
            style={{ height: height / 2 }}
          >
            <ImageWithURL
              source={{
                uri: mealImage,
              }}
              className="object-cover"
            />
          </View>
        )}

        <LinearGradient
          colors={[
            "#23213600",
            "#2321364F",
            "#232136A8",
            "#232136D8",
            "#232136",
          ]}
          className="absolute left-0 right-0 bottom-0 h-3/5 z-0"
        />
      </View>

      <View className="-mt-[30%] flex justify-end ">
        <Text
          className="capitalize text-base text-white p-5 pl-8"
          style={{ fontFamily: "Poppins-SemiBold" }}
        >
          {taskName}
        </Text>

        <MealNutriFacts />
      </View>
    </>
  );
};

export default MealHeader;
