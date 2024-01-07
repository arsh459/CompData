import React from "react";
import { AlgoliaAppSearch } from "@models/AppSearch/interface";
import SwapItemTaskCard from "./SwapItemTaskCard";

interface Props {
  item: AlgoliaAppSearch;
  // index: number;
  // filter?: algoliaType;
  onSwap: () => void;
  generateNew: boolean;
}

const SwapItemCard: React.FC<Props> = ({
  item,
  // index,
  // filter,
  onSwap,
  generateNew,
}) => {
  return (
    <SwapItemTaskCard
      // item={item}
      name={item.name}
      mealType={item.mealTypes}
      kcal={item.kcal}
      protein={item.nutritionFacts?.protein}
      fats={item.nutritionFacts?.fats}
      carbs={item.nutritionFacts?.carbs}
      fibre={item.nutritionFacts?.fibre}
      img={item.thumbnail ? item.thumbnail : item.videoThumbnail}
      onSwap={onSwap}
      generateNew={generateNew}
    />
  );
};

export default SwapItemCard;
