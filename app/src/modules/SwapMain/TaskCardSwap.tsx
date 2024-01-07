import React from "react";
import SwapItemTaskCard from "./SwapItemTaskCard";
import { Task } from "@models/Tasks/Task";

interface Props {
  item: Task;
  // index: number;
  // filter?: algoliaType;
  onSwap: () => void;
  generateNew: boolean;
}

const TaskCardSwap: React.FC<Props> = ({
  item,
  // index,
  // filter,
  onSwap,
  generateNew,
}) => {
  return (
    <SwapItemTaskCard
      // item={item}
      mealType={item.mealTypes}
      name={item.name}
      kcal={item.kcal}
      protein={item.nutritionFacts?.protein}
      fats={item.nutritionFacts?.fats}
      carbs={item.nutritionFacts?.carbs}
      fibre={item.nutritionFacts?.fibre}
      img={item.videoThumbnail ? item.videoThumbnail : item.thumbnails}
      onSwap={onSwap}
      generateNew={generateNew}
    />
  );
};

export default TaskCardSwap;
