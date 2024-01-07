import { Badge } from "@models/Prizes/Prizes";

export const getTargetNutritionValues = (badge?: Badge, dayNumber?: number) => {
  const selectedWKLevel = badge?.workoutLevels?.filter(
    (item) => item.day === dayNumber
  );

  if (selectedWKLevel?.length) {
    // console.log(selectedWKLevel[0]);
    return selectedWKLevel[0].nutrition;
  }

  return undefined;
};

export const getBottomMeterColor = (meterPerc?: number) => {
  if (!meterPerc) {
    return "#6BFF8C";
  } else if (meterPerc <= 20) {
    return "#FF5970";
  } else if (meterPerc > 20 && meterPerc <= 40) {
    return "#FFF96B";
  } else if (meterPerc < 115) {
    return "#6BFF8C";
  } else {
    return "#FF5970";
  }
};

export const getKCalMeterColor = (value?: number, target?: number) => {
  if (!value || !target) {
    return "#FFC931";
  } else if (value > target * 1.15) {
    return "#FF6B6B";
  }

  // else if (value * 1.15 < target) {
  // return "#FFC931";
  // }
  else {
    return "#FFC931";
  }
};

export const getMeterColor = (progress: number) => {
  if (progress > 1.15) {
    return "#FF6B6B";
  } else if (progress >= 0) {
    return "#58FF69";
  } else {
    return "#FFFFFFCC";
  }
};

export const getKCalTextColor = (value?: number, target?: number) => {
  if (!value || !target) {
    return ["#FFE458", "#FFB411"];
  } else if (value > target * 1.15) {
    return ["#FF6B6B", "#FF6B6B"];
  } else {
    return ["#FFE458", "#FFB411"];
  }
};
