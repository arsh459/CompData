import ProgressBar from "@components/ProgressBar";
import { statusTypes } from "@modules/HomeScreen/MyPlan/utils";
// import { baseImageKit, lockedIconNoKeyHole } from "@constants/imageKitURL";
// import { userTaskStatus } from "@providers/task/hooks/useIsTaskAllowedV2";
// import { TaskStatusV2 } from "@providers/task/hooks/useIsTaskAllowedV3";
// import { format } from "date-fns";

import { Image, Text, View } from "react-native";

interface Props {
  canPost: boolean;
  possiblePts: number;
  progress: number;
  // unlocksNext?: number;
  taskStatus?: statusTypes;
}

const TaskProgress: React.FC<Props> = ({
  progress,
  possiblePts,
  canPost,
  taskStatus,
  // unlocksNext,
}) => {
  const prog = Math.round(progress * 100);

  return (
    <View className=" ">
      {
        taskStatus === "play" ? (
          <View className="py-2 m-4">
            <View className="flex flex-row justify-between pb-5">
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-sm iphoneX:text-base font-medium text-white"
              >
                {possiblePts} Possible FPs to earn
              </Text>
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-sm iphoneX:text-base font-medium text-white"
              >
                {prog}%
              </Text>
            </View>
            <ProgressBar
              height={5}
              progress={prog}
              activeColor="#FF556C"
              inActiveColor="#100F1A"
            />
          </View>
        ) : taskStatus === "done" ? (
          <View className="bg-white p-2.5 rounded-xl m-4">
            <View className="flex flex-row items-center">
              <Image
                source={{
                  uri: `https://ik.imagekit.io/socialboat/Group_129_vq_xrO-sj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652689883205`,
                }}
                className="w-7 h-7"
                resizeMode="contain"
              />
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-[#00AC45] font-extrabold text-lg pl-2.5"
              >
                Task Completed
              </Text>
            </View>
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="text-[#335E7D] py-3"
            >
              You have completed this task ! Choose the below tasks to Grow more
              .
            </Text>
          </View>
        ) : null

        // : taskStatus === "FUTURE_LOCKED" ? (
        //   <View className="bg-white p-2.5 rounded-xl m-4">
        //     <View className="flex flex-row items-center">
        //       <Image
        //         source={{
        //           uri: `${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`,
        //         }}
        //         className="w-7 h-7"
        //         resizeMode="contain"
        //       />
        //       <Text
        //         style={{ fontFamily: "BaiJamjuree-Bold" }}
        //         className="text-red-500 font-extrabold text-lg pl-2.5"
        //       >
        //         Task Locked
        //       </Text>
        //     </View>
        //     <Text
        //       style={{ fontFamily: "BaiJamjuree-Bold" }}
        //       className="text-[#335E7D] py-3"
        //     >
        //       {unlocksNext
        //         ? `This task will unlock on ${format(
        //             new Date(unlocksNext),
        //             "d MMM"
        //           )}`
        //         : "Task will unlock soon in future"}
        //     </Text>
        //   </View>
        // ) : taskStatus === "PAST_LOCKED" ? (
        //   <View className="bg-white p-2.5 rounded-xl m-4">
        //     <View className="flex flex-row items-center">
        //       <Image
        //         source={{
        //           uri: `${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`,
        //         }}
        //         className="w-7 h-7"
        //         resizeMode="contain"
        //       />

        //       <Text
        //         style={{ fontFamily: "BaiJamjuree-Bold" }}
        //         className="text-red-500 font-extrabold text-lg pl-2.5"
        //       >
        //         Task Locked
        //       </Text>
        //     </View>
        //     <Text
        //       style={{ fontFamily: "BaiJamjuree-Bold" }}
        //       className="text-[#335E7D] py-3"
        //     >
        //       Time to do this task has passed. Explore other tasks now.
        //     </Text>
        //   </View>
        // ) : taskStatus === "RANK_LOCKED" ? (
        //   <View className="bg-white p-2.5 rounded-xl m-4">
        //     <View className="flex flex-row items-center">
        //       <Image
        //         source={{
        //           uri: `${baseImageKit}/tr:w-28,c-maintain_ratio/${lockedIconNoKeyHole}`,
        //         }}
        //         className="w-7 h-7"
        //         resizeMode="contain"
        //       />

        //       <Text
        //         style={{ fontFamily: "BaiJamjuree-Bold" }}
        //         className="text-red-500 font-extrabold text-lg pl-2.5"
        //       >
        //         Task Locked
        //       </Text>
        //     </View>
        //     <Text
        //       style={{ fontFamily: "BaiJamjuree-Bold" }}
        //       className="text-[#335E7D] py-3"
        //     >
        //       This task is accessible to top leaderboard ranks.
        //     </Text>
        //   </View>
        // ) : null}
      }
    </View>
  );
};

export default TaskProgress;
