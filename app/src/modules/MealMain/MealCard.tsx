import { View, Text } from "react-native";
import MediaTile from "@components/MediaCard/MediaTile";
import {
  getCardDetailsV2,
  getServingTypeUnit,
  getSubTaskName,
  getTaskIconV2,
} from "@modules/HomeScreen/MyPlan/utils";
import SvgIcons from "@components/SvgIcons";
import { SubTaskElement } from "@models/Tasks/Task";
// import MealCardCta from "./MealCardCta";
import { useMealStore } from "./store/useMealStore";
import { useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import MealCardCta from "./components/obsoleteComp/MealCardCta";

interface Props {
  item: SubTaskElement;
}

const MealCard: React.FC<Props> = ({ item }) => {
  const color = "#FFFFFF";
  const timer = useRef<NodeJS.Timer | null>();
  const [recommendedStr, setrecommendedStr] = useState<string>();
  const [isFirstClick, setIsFirstClick] = useState<boolean>(true);

  const { subTask, qty } = useMealStore((state) => {
    return {
      subTask: state.subTasks && state.subTasks[item.subTaskId],
      qty:
        state.subTaskState[item.subTaskId] &&
        state.subTaskState[item.subTaskId].subTaskQty,
    };
  }, shallow);

  const { config } = useConfigContext();

  const metric =
    subTask.servingType && config?.nutritionMetrics[subTask.servingType];

  const details = getCardDetailsV2(
    subTask?.fp,
    subTask?.kcal,
    metric?.value,
    metric?.unit
  );
  const data = getTaskIconV2(undefined);

  const { recQty, taskStr } = getSubTaskName(
    subTask.taskName,
    item.qty,
    subTask.servingValue,
    subTask.servingType
  );

  // console.log("");
  // console.log("item.qty", item.qty);
  // console.log("selected qty", qty);
  // console.log("servingValue", subTask.servingValue);
  // console.log("servingType", subTask.servingType);
  // console.log("recQty", recQty);
  // console.log("taskStr", taskStr);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (typeof qty === "number" && isFirstClick) {
      setIsFirstClick(false);
    }

    timer.current = setTimeout(() => {
      if (!isFirstClick && recQty && qty !== recQty) {
        // const str = getRecommendedStr(recQty);
        setrecommendedStr(
          `* Recommended value of ${recQty} ${getServingTypeUnit(
            subTask.servingType
          )}`
        );
      } else {
        setrecommendedStr(undefined);
      }
    }, 500);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [qty, recQty, isFirstClick, subTask.servingType]);

  return subTask ? (
    <View
      className="my-2 p-4"
      style={{ backgroundColor: recommendedStr ? "#2A2842" : undefined }}
    >
      <View className="flex flex-row items-center pb-2">
        <View className="w-1/5 aspect-square rounded-2xl">
          {subTask.taskMedia ? (
            <MediaTile
              media={subTask.taskMedia}
              fluid={true}
              fluidResizeMode="cover"
              roundedStr="rounded-2xl"
            />
          ) : null}
        </View>

        <View
          className="flex justify-end flex-1 pl-3"
          style={{ backgroundColor: data?.bgColor }}
        >
          <Text
            numberOfLines={2}
            style={{ color, fontFamily: "Nunito-Bold" }}
            className="text-xs iphoneX:text-sm pb-2"
          >
            {taskStr}
          </Text>

          <View className="flex flex-row pb-3 items-center">
            {details?.map((item) => (
              <View
                key={item.icon}
                className="flex flex-row justify-center items-center mr-4"
              >
                <View className="w-3 iphoneX:w-3 aspect-square mr-1 iphoneX:mr-1.5">
                  <SvgIcons iconType={item.icon} color={color} />
                </View>
                <Text
                  style={{ color, fontFamily: "Nunito-SemiBold" }}
                  className="text-xs"
                >
                  {item.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <MealCardCta
          subTaskId={item.subTaskId}
          isFirstClick={isFirstClick}
          setIsFirstClick={setIsFirstClick}
        />
      </View>

      {recommendedStr ? (
        <Text
          numberOfLines={1}
          style={{ color: "#E5B556", fontFamily: "Nunito-Regular" }}
          className="text-xs text-center"
        >
          {recommendedStr}
        </Text>
      ) : null}
    </View>
  ) : (
    <View />
  );
};

export default MealCard;
