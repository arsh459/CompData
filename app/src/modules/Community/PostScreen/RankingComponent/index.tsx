import NestedScrollFlatList from "@components/NestedScrollFlatList";
import { TaskDoneType } from "@hooks/task/useTaskDoneLists";
import { FlatList, Text, View } from "react-native";
import { useState } from "react";
import SvgIcons from "@components/SvgIcons";
import TopRank from "./TopRank";

interface Props {
  taskDoneLists: TaskDoneType[];
  onNextTaskDone: () => {};
}

const RankingComponent: React.FC<Props> = ({
  taskDoneLists,
  onNextTaskDone,
}) => {
  const [viewWidth, setViewWidth] = useState<number>(0);

  return (
    <View
      className="rounded-2xl m-4 bg-[#333240]"
      onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
    >
      <View className="flex flex-row items-center p-4">
        <View className="w-4 h-4 iphoneX:w-5 iphoneX:h-5 mr-4">
          <SvgIcons iconType="ranking" color="#FFFFFF" />
        </View>
        <Text
          className="flex-1 iphoneX:text-xl font-bold text-white"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          Top Ranks for the Task
        </Text>
      </View>
      <View className="h-px bg-[#100F1A]" />
      <NestedScrollFlatList horizontal={true} width={viewWidth}>
        <FlatList
          data={taskDoneLists}
          renderItem={({ item, index }) => (
            <>
              <TopRank taskDone={item} index={index} />
              {index! !== taskDoneLists.length - 1 ? (
                <View className="h-px bg-[#EFECFF36]" />
              ) : null}
            </>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ width: viewWidth, height: 200 }}
          onEndReached={onNextTaskDone}
          bounces={false}
        />
      </NestedScrollFlatList>
    </View>
  );
};

export default RankingComponent;
