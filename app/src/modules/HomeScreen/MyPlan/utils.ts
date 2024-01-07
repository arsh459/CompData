import { DifficultyLevelsTypes } from "@components/SvgIcons/DifficultyLevelsIcon";
import {
  afternoonSnackIconWhiteFrame20,
  breakFastIconWhiteFrame20,
  dinnerIconWhiteFrame20,
  lunchIconWhiteFrame20,
} from "@constants/imageKitURL";
import { NutritionMetric } from "@models/config/config";
import {
  MealTypes,
  servingType,
  SubTask,
  weightType,
} from "@models/Tasks/Task";
import { detailTypes } from "./CardContent";

export type statusTypes =
  | "locked"
  | "live"
  | "pending"
  | "pro"
  | "proPlus"
  | "done"
  | "play"
  | "expired";

const icons: { [key in statusTypes]: string } = {
  locked:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_82_q9RBjv-nM-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670413583265",
  live: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_81_XNYi-j6SmR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670413582947",
  pending:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_78_QYxh7L08X.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670413583304",
  pro: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_80_MILhX8agB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670413582908",
  proPlus:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Group%201000001183%20(1)_hUdTUHBKH.png?updatedAt=1693569925081",

  done: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_79_2NPrtrrdjf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670413582903",
  play: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_77_uzixXTG5z.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670413582792",
  expired:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_77_uzixXTG5z.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670413582792",
};
export const iconsV2: { [key in statusTypes]: string } = {
  locked:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_110_N9OfndCd0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674216966118",
  live: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_220_DiQUUpCjU5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674218269460",
  pending:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Frame_221_q3-ZfWHHB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674219592748",
  // pro: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_2__11__OrwQtXEbHj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674217869453",
  pro: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Group_1798_Om5n0qk4F.png?updatedAt=1686646144537",
  proPlus:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Group%201000001183%20(1)_hUdTUHBKH.png?updatedAt=1693569925081",
  done: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Vector__58__EPKC67xXDn.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674216121183",
  play: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Frame_1423_VvSqtGmGE.png?updatedAt=1679912132226",
  expired:
    "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Component_1__23__Kji07AG2Y.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674201935536",
};

export const getOverlayColors = (status?: statusTypes, playColor?: string) => {
  switch (status) {
    case "play":
    case "live":
    case "pro":
      return [
        "transparent",
        "transparent",
        playColor ? playColor : "transparent",
      ];
    case "locked":
    case "expired":
      return ["#343150", "#343150"];
    case "done":
      return ["#229A4BD9", "#229A4BD9"];
    case "pending":
      return ["#A08217D9", "#A08217D9"];
    default:
      return ["transparent", "transparent"];
  }
};
export const getOverlayColorsV2 = (
  status?: statusTypes,
  playColor?: string
) => {
  switch (status) {
    case "play":
    case "live":
    case "pro":
    case "proPlus":
      return ["#343447", "#343447"];
    case "locked":
    case "expired":
      return ["#343150", "#343150"];
    case "done":
      return ["#1DAC4D", "#1DAC4D"];
    case "pending":
      return ["#AC841D", "#AC841D"];

    default:
      return ["transparent", "transparent"];
  }
};

export const getTaskIcon = (status?: statusTypes) => {
  switch (status) {
    case "play":
    case "expired":
      return { icon: icons.play, bgColor: "#FFFFFF" };
    case "live":
      return { icon: icons.live, bgColor: "#FF5970" };
    case "pro":
      return { icon: icons.pro, bgColor: "#000000" };
    case "proPlus":
      return { icon: icons.proPlus, bgColor: "#000000" };
    case "locked":
      return { icon: icons.locked, bgColor: "#FFFFFF" };
    case "done":
      return { icon: icons.done, bgColor: "#34D76B" };
    case "pending":
      return { icon: icons.pending, bgColor: "#CAD734" };
    default:
      return null;
  }
};
export const getTaskIconV2 = (status?: statusTypes) => {
  switch (status) {
    case "play":
    case "expired":
    case "live":
      return { icon: iconsV2.play, bgColor: "#FFFFFF" };
    // case "live":
    //   return { icon: iconsV2.live, bgColor: "#FF5970" };
    case "pro":
      return { icon: iconsV2.pro, bgColor: "#000000" };
    case "proPlus":
      return { icon: iconsV2.proPlus, bgColor: "#000000" };
    case "locked":
      return { icon: iconsV2.locked, bgColor: "#FFFFFF" };
    case "done":
      return { icon: iconsV2.done, bgColor: "#1DAC4D" };
    case "pending":
      return { icon: iconsV2.pending, bgColor: "#CAD734" };
    default:
      return null;
  }
};

export const getCardDetails = (
  fitpoints?: number,
  steps?: number,
  time?: number,
  kCal?: number,
  difficultyLevels?: DifficultyLevelsTypes
): detailTypes[] => {
  const cardDetails: detailTypes[] = [];

  if (fitpoints) {
    cardDetails.push({ icon: "fitpoint", text: `${fitpoints}FP` });
  }
  if (steps) {
    cardDetails.push({ icon: "steps", text: `${steps}Steps` });
  }
  if (!steps && time) {
    cardDetails.push({ icon: "time", text: `${time}Min` });
  }
  if (!steps && !time && kCal) {
    cardDetails.push({ icon: "dining", text: `${kCal}KCal` });
  }

  let difficultyText = difficultyLevels
    ? difficultyLevels[0].toUpperCase() + difficultyLevels.substring(1)
    : "Easy";
  if (kCal) {
    difficultyText = difficultyLevels
      ? difficultyLevels === "easy"
        ? "Light"
        : difficultyLevels === "medium"
        ? "Moderate"
        : difficultyLevels === "hard"
        ? "Heavy"
        : difficultyText
      : "Light";
  }
  cardDetails.push({ icon: "difficultyLevels", text: difficultyText });

  return cardDetails;
};
export const getCardDetailsV2 = (
  fitpoints?: number,
  kCal?: number,
  wtValue?: number,
  wtType?: weightType
): detailTypes[] => {
  const cardDetails: detailTypes[] = [];

  if (fitpoints) {
    cardDetails.push({ icon: "fitpoint", text: `${fitpoints} FP` });
  }

  if (kCal) {
    cardDetails.push({ icon: "dining", text: `${kCal} KCal` });
  }

  if (wtType && wtValue) {
    cardDetails.push({
      icon: "gramIcon",
      text: `${wtValue} ${getWeightTypeUnit(wtType)}`,
    });
  }

  return cardDetails;
};
export const getCardDetailsV3 = (
  fitpoints?: number,
  kCal?: number,
  time?: number
): detailTypes[] => {
  const cardDetails: detailTypes[] = [];

  if (fitpoints) {
    cardDetails.push({ icon: "fitpoint", text: `${fitpoints} FP` });
  }
  if (kCal) {
    cardDetails.push({ icon: "dining", text: `${kCal.toFixed()} KCal` });
  }
  if (time) {
    cardDetails.push({ icon: "time", text: `${time}Min` });
  }

  return cardDetails;
};

export const getCardDetailsV4 = (
  kCal?: number,
  wtValue?: number,
  wtType?: string
): detailTypes[] => {
  const cardDetails: detailTypes[] = [];

  if (kCal) {
    cardDetails.push({ icon: "dining", text: `${kCal.toFixed(1)} KCal` });
  }

  if (wtType && wtValue) {
    cardDetails.push({
      icon: "gramIcon",
      text: `${Math.round(wtValue)} ${getServingTypeUnit(wtType)}`,
    });
  }

  return cardDetails;
};
export const getMetricDetails = (
  subTask: SubTask,
  nutritionMetrics?: Record<servingType, NutritionMetric>
) => {
  if (
    subTask &&
    subTask.servingType &&
    nutritionMetrics &&
    nutritionMetrics[subTask.servingType]
  ) {
    return nutritionMetrics[subTask.servingType];
  } else if (subTask && subTask.servingType && subTask.servingValue) {
    return { unit: subTask?.servingType, value: subTask.servingValue };
  } else if (subTask && subTask.gptInfo) {
    return { unit: "gram", value: subTask.gptInfo.gramEquivalent };
  } else {
    return null;
  }
};
export const getServingTypeUnit = (serving?: string) => {
  if (serving === "count") {
    return "piece";
  } else if (serving) {
    return `${serving}`;
  } else {
    return "";
  }
};

export const getWeightTypeUnit = (wt?: weightType) => {
  if (wt) {
    return wt;
  }
};

export const getSubTaskName = (
  taskName?: string,
  qty?: number,
  servingValue?: number,
  serving?: string
): { recQty: number; taskStr: string } => {
  if (servingValue && serving) {
    // const servingStr = getServingTypeUnit(serving);
    const finalValue = (qty ? qty : 1) * servingValue;
    return {
      taskStr: `${taskName}`,
      recQty: finalValue,
    };
  } else if (qty) {
    return {
      recQty: qty,
      taskStr: ` ${taskName}`,
    };
  } else {
    return { recQty: 1, taskStr: taskName ? taskName : "" };
  }
};

export const getRecQuantity = (
  qty?: number,
  servingValue?: number,
  serving?: string
) => {
  let recQty = 1;
  let servingStr = getServingTypeUnit(serving);
  if (servingValue) {
    recQty = (qty ? qty : 1) * servingValue;
  } else if (qty) {
    recQty = qty;
  }
  return {
    recQty: recQty,
    recString: `* Recommended value of ${recQty} ${servingStr}`,
    recQtyString: `${recQty} ${servingStr}`,
  };
};

export const getQuantityDetails = (
  qty?: number,
  servingValue?: number,
  serving?: string
) => {
  let servingStr = getServingTypeUnit(serving);
  if (qty && servingValue) {
    return {
      quantity: qty * servingValue,
      quantityStr: `${qty * servingValue} ${servingStr}`,
    };
  } else if (qty) {
    return {
      quantity: qty,
      quantityStr: `${qty} ${servingStr}`,
    };
  } else {
    return {
      quantity: 0,
      quantityStr: `0 ${servingStr}`,
    };
  }
};

export const getTaskSectionIcon = (mealType?: MealTypes) => {
  switch (mealType) {
    case "Lunch":
      return { icon: lunchIconWhiteFrame20 };
    case "Breakfast":
      return { icon: breakFastIconWhiteFrame20 };
    case "Dinner":
      return { icon: dinnerIconWhiteFrame20 };

    default:
      return { icon: afternoonSnackIconWhiteFrame20 };
  }
};
