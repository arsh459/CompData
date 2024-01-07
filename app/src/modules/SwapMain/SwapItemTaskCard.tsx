import MediaTile from "@components/MediaCard/MediaTile";
import { View, Text } from "react-native";
import NutritionValues from "./NutritionValues";
import { TouchableOpacity } from "react-native";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { MealTypes } from "@models/Tasks/Task";
export type cardTypeSearch = "nutrition" | "workout";

export const taskCardHeight = 150;

interface Props {
  // item?: AlgoliaAppSearch;

  onSwap: () => void;
  generateNew: boolean;
  name?: string;
  kcal?: number;
  carbs?: number;
  protein?: number;
  mealType?: MealTypes;
  fats?: number;
  fibre?: number;
  img?: AWSMedia | CloudinaryMedia;
}

const SwapItemTaskCard: React.FC<Props> = ({
  // item,
  name,
  kcal,
  protein,
  fats,
  fibre,
  carbs,
  img,
  onSwap,
  generateNew,
  mealType,
}) => {
  return (
    <View className="flex flex-row items-center justify-between px-0 py-4">
      <View className="flex flex-1 flex-row items-center justify-around">
        <View className="w-[46%] flex justify-between">
          <View className="flex-1 pb-2 flex flex-row items-start justify-between">
            <View className="flex-1">
              <Text
                className="text-white text-sm mb-1"
                style={{ fontFamily: "Nunito-SemiBold" }}
                numberOfLines={2}
              >
                {name}
              </Text>
              <Text
                className="text-white/70 text-xs"
                style={{ fontFamily: "Nunito-SemiBold" }}
                numberOfLines={1}
              >
                {kcal ? `${kcal.toFixed(0)} KCal` : ""}
                {mealType ? ` | ${mealType}` : ""}
              </Text>
            </View>
          </View>

          <NutritionValues
            //   nutritionFacts={item.n}
            nutritionFacts={{
              carbs: carbs || 0,
              fats: fats || 0,
              protein: protein || 0,
              fibre: fibre || 0,
            }}
          />
        </View>

        <View className="w-2/5  justify-between  rounded-lg">
          <View className=" aspect-[140/105]  ">
            <MediaTile
              fluid={true}
              media={img}
              fluidResizeMode="cover"
              roundedStr="rounded-lg"
            />
          </View>
          <View className="w-4 aspect-square" />
          <TouchableOpacity
            className=" bg-[#FFF]  rounded-lg "
            onPress={onSwap}
          >
            <Text
              className="px-2 py-2.5 text-center text-xs text-[#232136]"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {generateNew ? "Add Item" : "Swap Item"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SwapItemTaskCard;
