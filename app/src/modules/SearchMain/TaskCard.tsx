import MediaTile from "@components/MediaCard/MediaTile";
import SvgIcons from "@components/SvgIcons";
import { View, Text } from "react-native";
import WorkoutValues from "./WorkoutValues";
import { getEquipmentNames } from "@modules/Workout/ProgramDetails/CourseTaskPreview/utils";
import { AlgoliaAppSearch } from "@models/AppSearch/interface";
import ImageWithURL from "@components/ImageWithURL";
import { proIconBlack } from "@constants/imageKitURL";
export type cardTypeSearch = "nutrition" | "workout";

export const taskCardHeight = 150;

interface Props {
  item?: AlgoliaAppSearch;
  cardType?: cardTypeSearch;
  arrowColor?: string;
  isPro: boolean;
}

const SearchResultCard: React.FC<Props> = ({
  item,
  cardType,
  arrowColor,
  isPro,
}) => {
  return (
    <View className="flex flex-row items-center justify-between mx-4 p-4 rounded-3xl bg-[#343150]">
      <View className="flex flex-1 flex-row items-center">
        <View className="w-1/3 aspect-square rounded-lg overflow-hidden">
          <MediaTile
            fluid={true}
            media={
              item?.thumbnail || item?.reelThumbnail || item?.videoThumbnail
            }
            fluidResizeMode="cover"
          />
        </View>

        <View className="flex-1 flex justify-between px-4">
          <View className="flex-1">
            <Text
              className="text-white text-xs iphoneX:text-sm"
              style={{ fontFamily: "Nunito-SemiBold" }}
              // numberOfLines={1}
            >
              {item?.name}
            </Text>
            <Text
              className="text-white text-xs iphoneX:text-sm"
              style={{ fontFamily: "Nunito-SemiBold" }}
              // numberOfLines={1}
            >
              {item?.mealTypes}
            </Text>
          </View>

          <WorkoutValues
            cardType={cardType}
            durationMinutes={item?.durationMinutes}
            equipmentNeeded={getEquipmentNames(item?.equipmentNeeded)}
            fitpoints={item?.fitpoints}
            kcal={item?.kcal}
          />
        </View>
      </View>

      {isPro ? (
        <View className="aspect-square self-end">
          <ImageWithURL
            source={{
              uri: proIconBlack,
            }}
            className="w-6 aspect-square"
          />
        </View>
      ) : (
        <View className="w-3.5 iphoneX:w-4 aspect-square self-end">
          <SvgIcons iconType="pointedArrow" color={arrowColor} />
        </View>
      )}
    </View>
  );
};

export default SearchResultCard;
