import React from "react";
import { useState } from "react";
import { View } from "react-native";
import TaskListByNutriCard from "./TaskListByNutriCard";
import { Activity } from "@models/Activity/Activity";
import { selectedNutriType } from ".";
import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import LoadingSpinner from "@components/LoadingSpinner";

interface Props {
  activities: Activity[];
  nutriType: selectedNutriType;
}

const LIST_SIZE = 8;
const TaskListByNutri: React.FC<Props> = ({ activities, nutriType }) => {
  const [renderArr, setRenderArr] = useState<Activity[]>([]);

  useEffect(() => {
    setRenderArr(activities.slice(0, LIST_SIZE));
  }, [activities]);

  function onNext() {
    if (activities.length > renderArr.length) {
      setRenderArr((prev) => [
        ...prev,
        ...activities.slice(
          renderArr.length - 1,
          renderArr.length - 1 + LIST_SIZE
        ),
      ]);
    }
  }

  const renderItem = ({ item, index }: { item: Activity; index: number }) => (
    <TaskListByNutriCard idx={index} item={item} nutriType={nutriType} />
  );

  return activities.length > 0 ? (
    <View className="flex-1">
      <FlashList
        estimatedItemSize={100}
        data={renderArr}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.8}
        onEndReached={onNext}
        initialScrollIndex={0}
      />
    </View>
  ) : (
    <LoadingSpinner />
  );
};

export default TaskListByNutri;
