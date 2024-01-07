import { View } from "react-native";
import React from "react";

import TextBetween from "@components/TextBetween/TextBetween";
import {
  carbsIconWhiteFrame12,
  eggIconWhiteFrame12,
  fatsIconWhiteFrame12,
  fibreIconWhiteFrame12,
} from "@constants/imageKitURL";
import { NutritionFacts } from "@models/Tasks/Task";
interface Props {
  nutritionFacts?: NutritionFacts;
}
const NutritionValues: React.FC<Props> = ({ nutritionFacts }) => {
  return (
    <View className="bg-[#292743] flex-1 aspect-[176/110] rounded-lg flex justify-center  ">
      <TextBetween
        imgStr={eggIconWhiteFrame12}
        textRight={`${
          nutritionFacts?.protein
            ? `Protein: ${nutritionFacts.protein.toFixed(1)}`
            : `Protein: 0`
        } g`}
        imgStyle={{ imgStyle: "w-2.5 aspect-square" }}
        containerStyle="flex-row-reverse justify-start items-center  self-start py-0 "
        textRightStyle="text-white/50 text-[10px]  tracking-tight leading-3 pl-1.5"
        fontFamily="Nunito-Regular"
      />

      <TextBetween
        imgStr={carbsIconWhiteFrame12}
        textRight={`${
          nutritionFacts?.carbs
            ? `Carbs: ${nutritionFacts.carbs.toFixed(1)}`
            : `Carbs: 0`
        } g`}
        imgStyle={{ imgStyle: "w-2.5 aspect-square" }}
        containerStyle="flex-row-reverse justify-start items-center  self-start pb-0 "
        textRightStyle="text-white/50 text-[10px]  tracking-tight leading-3 pl-1.5"
        fontFamily="Nunito-Regular"
      />
      <TextBetween
        imgStr={fatsIconWhiteFrame12}
        textRight={`${
          nutritionFacts?.fats
            ? `Fats: ${nutritionFacts.fats.toFixed(1)}`
            : `Fats: 0`
        } g`}
        imgStyle={{ imgStyle: "w-2.5 aspect-square" }}
        containerStyle="flex-row-reverse justify-start items-center  self-start pb-0 "
        textRightStyle="text-white/50 text-[10px] tracking-tight leading-3 pl-1.5"
        fontFamily="Nunito-Regular"
      />

      <TextBetween
        imgStr={fibreIconWhiteFrame12}
        textRight={`${
          nutritionFacts?.fibre
            ? `Fibre: ${nutritionFacts.fibre.toFixed(1)}`
            : `Fibre: 0`
        } g`}
        imgStyle={{ imgStyle: "w-2.5 aspect-square" }}
        containerStyle="flex-row-reverse justify-start items-center  self-start pb-0 "
        textRightStyle="text-white/50 text-[10px]  tracking-tight leading-3 pl-1.5"
        fontFamily="Nunito-Regular"
      />
    </View>
  );
};

export default NutritionValues;
