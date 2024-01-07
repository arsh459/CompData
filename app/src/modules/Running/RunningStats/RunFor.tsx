import { View, Text, Image, ScrollView } from "react-native";

import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import FitpointIcon from "@components/SvgIcons/FitpointIcon";
import DistanceIcon from "@components/SvgIcons/DistanceIcon";
import { LinearGradient } from "expo-linear-gradient";
// import { useTaskContext } from "@providers/task/TaskProvider";
import { bottomRunnigStaticImage, staticMap } from "@constants/imageKitURL";
// import { getURLToFetch } from "@utils/media/mediaURL";
// import TaskMedia from "@modules/Workout/ProgramDetails/TaskPreview/TaskMedia";
import MediaCard from "@components/MediaCard";
import { getDistanceToShow } from "./utils";
import { Task } from "@models/Tasks/Task";
// import { useNavigation } from "@react-navigation/native";

interface Props {
  onGetStarted: () => void;
  task?: Task;
}

const RunFor: React.FC<Props> = ({ onGetStarted, task }) => {
  // const navigation = useNavigation();
  // const { task } = useTaskContext();
  return (
    <>
      <ScrollView>
        <View
          className="relative"
          // className="absolute left-0 right-0 top-0 "
          // style={{ aspectRatio: 0.7 }}
        >
          {/* <Image
          source={{ uri: task?.avatar ? getURLToFetch(task.avatar, task.avatar.width, getHe ) : staticMap }}
          className="w-full aspect-[375/408] "
        /> */}
          {task?.avatar ? (
            <MediaCard media={task.avatar} thumbnail={task.thumbnails} />
          ) : (
            <Image
              source={{
                uri: staticMap,
              }}
              className="w-full aspect-[375/408] "
            />
          )}
          {/** SHOW MANUAL IMAGE HERE */}
          {/* <StepsPath coords={coords} aspectRatio={375 / 408} /> */}
          <LinearGradient
            colors={["transparent", "transparent", "#100F1A"]}
            className="z-10 absolute top-0 left-0 right-0 bottom-0"
          />
        </View>
      </ScrollView>
      <View className="pt-8 absolute bottom-0 left-0 right-0">
        <View className="p-4 pb-4">
          <Text
            className="text-[#FFFFFF] text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {task?.name}
          </Text>
        </View>

        <View className="bg-[#262630] p-7   flex items-center     rounded-3xl flex-row justify-evenly aspect-[333/105]">
          <View className="flex items-center">
            <Text
              className="text-white  text-2xl pb-2"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {getDistanceToShow(task?.distance)}
            </Text>

            <View className="  flex-row items-center">
              <View className="w-4 aspect-square">
                <DistanceIcon color="#C8C8C8" />
              </View>
              <Text
                className="text-[#C8C8C8]  text-xs pl-1"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                Kilometers
              </Text>
            </View>
          </View>
          <View className="w-px h-20 bg-[#FFFFFF47]" />
          <View className="flex items-center">
            <Text
              className="text-white  text-2xl pb-2"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              {task?.fitPoints ? `${task.fitPoints} FP` : ""}
            </Text>

            <View className="  flex-row items-center">
              <View className="w-4 aspect-square">
                <FitpointIcon color="#C8C8C8" />
              </View>
              <Text
                className="text-[#C8C8C8]  text-xs pl-1"
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                Fitpoints
              </Text>
            </View>
          </View>
        </View>

        <View className="pt-4">
          <StartButton
            title="Start Run"
            bgColor="bg-[#fff] mx-4"
            textColor="text-[#19334F] "
            roundedStr="rounded-full"
            textStyle="py-3 text-center text-2xl  rounded-md"
            onPress={onGetStarted}
            fontFamily="BaiJamjuree-Bold"
          />
        </View>

        <View className="px-4  py-8 iphoneX:pb-2 ">
          <Image
            source={{ uri: bottomRunnigStaticImage }}
            resizeMode="contain"
            className="w-full h-32 "
          />
        </View>
      </View>
    </>
  );
};

export default RunFor;
