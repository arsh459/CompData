import Header from "@modules/Header";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { View, TouchableOpacity, FlatList } from "react-native";
import DayHolder from "./DayHolder/DayHolder";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { useEffect, useState } from "react";
import { WorkoutLevel } from "@models/Prizes/Prizes";
import ListHeader from "./ListHeader";
import ListCta from "./ListCta";

const ViewWorkoutMain = () => {
  const navigation = useNavigation();
  const { badge } = useSignleBadgeContext();
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [workoutLevels, setworkoutLevels] = useState<WorkoutLevel[]>([]);

  useEffect(() => {
    if (badge?.workoutLevels?.length) {
      setworkoutLevels([badge.workoutLevels[0]]);
      setCurrIndex((prev) => prev + 1);
    }
  }, [badge?.workoutLevels]);

  const handleNext = () => {
    if (badge?.workoutLevels && currIndex < badge.workoutLevels.length) {
      const toAdd = badge.workoutLevels[currIndex];
      setworkoutLevels((prev) => {
        return [...prev, toAdd];
      });
      setCurrIndex((prev) => prev + 1);
    }
  };

  const renderItem = ({ item }: { item: WorkoutLevel }) => {
    return <DayHolder day={item.day} />;
  };

  return (
    <View className="bg-[#232136] flex-1">
      <Header
        tone="dark"
        headerType="transparent"
        titleNode={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-black/50 rounded-full w-8 aspect-square overflow-hidden p-2"
          >
            <View
              className="w-full h-full"
              style={{ transform: [{ translateX: -1 }] }}
            >
              <ArrowIcon direction="left" color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        }
      />

      {badge?.workoutLevels?.length ? (
        <FlatList
          data={workoutLevels}
          renderItem={renderItem}
          onEndReachedThreshold={0.2}
          onEndReached={handleNext}
          bounces={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => <ListHeader />}
          ListFooterComponent={() => <View className="h-24" />}
        />
      ) : null}

      <ListCta />
    </View>
  );
};

export default ViewWorkoutMain;
