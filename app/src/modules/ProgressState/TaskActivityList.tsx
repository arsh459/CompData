import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { ActivityUserPts } from "@models/Activity/Activity";
import { SectionList } from "react-native";
import {
  ListActivity,
  sectionListActivityItem,
  useActivityListOfTask,
} from "@hooks/activity/useActivityListOfTask";
import { format } from "date-fns";
import { baseImageKit, fPointsWhite } from "@constants/imageKitURL";
import Loading from "@components/loading/Loading";

interface Props {
  activityList: ActivityUserPts[];
}

const TaskActivityList: React.FC<Props> = ({ activityList }) => {
  const { activitySectionList, isLoading } =
    useActivityListOfTask(activityList);

  return (
    <>
      {!isLoading ? (
        <TaskActivityListCard data={activitySectionList} />
      ) : (
        <View className="flex justify-center items-center flex-1 ">
          <Loading fill="#ff735c" width="w-8" height="h-8" />
        </View>
      )}
    </>
  );
};

export default TaskActivityList;

interface sectionListActivity {
  data: sectionListActivityItem[];
}

const TaskActivityListCard: React.FC<sectionListActivity> = ({ data }) => {
  const initialState: {
    [taskName: string]: boolean;
  } = {};

  data.forEach(({ taskName }) => (initialState[taskName] = false));

  const [sectionVisibility, setSectionVisibility] = useState<{
    [taskName: string]: boolean;
  }>(initialState);

  const toggleSection = (taskName: string) => {
    setSectionVisibility((prevState) => {
      return { ...prevState, [taskName]: !prevState[taskName] };
    });
  };

  return (
    <SectionList
      sections={data}
      renderItem={({ item, section }) => (
        <SectionRenderItem
          item={item}
          section={section}
          sectionVisibility={sectionVisibility}
        />
      )}
      renderSectionHeader={({ section: { taskName, totalFp } }) => (
        <SectionHeader
          taskName={taskName}
          sectionVisibility={sectionVisibility}
          toggleSection={toggleSection}
          totalFp={totalFp}
        />
      )}
      keyExtractor={(item, index) => `${index}_${item.createdOn}`}
    />
  );
};

const SectionHeader: React.FC<{
  taskName: string;
  totalFp: number;
  sectionVisibility: { [taskName: string]: boolean };
  toggleSection: (taskName: string) => void;
}> = ({ taskName, sectionVisibility, toggleSection, totalFp }) => {
  return (
    <View className="flex flex-row justify-between py-2 bg-[#262630] border-t border-white/20 px-4">
      <View className="w-2/3 pr-4">
        <Text
          className="text-[#D9D9D9] text-xs iphoneX:text-sm capitalize"
          style={{ fontFamily: "BaiJamjuree-Medium" }}
        >
          {taskName ? taskName.trim() : "SB Task"}
        </Text>
      </View>

      <TouchableOpacity
        className="w-1/3 flex flex-row justify-between items-end"
        onPress={() => toggleSection(taskName)}
      >
        <View className="">
          <Text
            className="text-[#D9D9D9] text-xs "
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            {totalFp} FP
          </Text>
        </View>
        <Text
          className="text-[#FF8718] text-xs "
          style={{
            fontFamily: "BaiJamjuree-Medium",
            color: sectionVisibility[taskName] ? "#FF8718" : "#189EFF",
          }}
        >
          {sectionVisibility[taskName] ? "Hide all" : "View all"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

interface SectionRenderItemProps {
  item: ListActivity;
  section: sectionListActivityItem;
  sectionVisibility: { [taskName: string]: boolean };
}
const SectionRenderItem: React.FC<SectionRenderItemProps> = ({
  item,
  section,
  sectionVisibility,
}) => {
  return (
    <>
      {sectionVisibility[section.taskName] ? (
        <View className="flex flex-row justify-between items-center px-4 py-3">
          {item.createdOn && (
            <View className="flex-1 pr-2">
              <Text
                style={{ fontFamily: "BaiJamjuree-light" }}
                className="text-xs text-[#B1B1B1]"
              >
                {format(new Date(item?.createdOn), "d MMM h:mmaaa")}
              </Text>
            </View>
          )}
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: `${baseImageKit}/${fPointsWhite}` }}
              className="w-3 aspect-square mr-2"
              resizeMode="contain"
            />
            {item.taskType === "steps" || item.taskType === "path" ? (
              <Text
                className="text-[#B1B1B1] text-xs"
                style={{ fontFamily: "BaiJamjuree-Medium" }}
              >
                {item.userFP} FP
              </Text>
            ) : (
              <Text
                className="text-[#B1B1B1] text-xs"
                style={{ fontFamily: "BaiJamjuree-Medium" }}
              >
                {item.userFP}/{item.taskFp} FP
              </Text>
            )}
          </View>
        </View>
      ) : null}
    </>
  );
};
