import MediaTile from "@components/MediaCard/MediaTile";
import SvgIcons from "@components/SvgIcons";
import DoneIcon from "./DoneIcon";

import { Task } from "@models/Tasks/Task";
import {
  getCardDetailsV3,
  statusTypes,
} from "@modules/HomeScreen/MyPlan/utils";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
import MealIcon from "./MealIcon";
import ImageWithURL from "@components/ImageWithURL";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavigation } from "@react-navigation/native";

interface Props {
  onMealPress?: () => void;
  onSwapPress?: () => void;
  task?: Task;
  status?: statusTypes;
  isFuture?: boolean;
  isSwapDisabled?: boolean;
}

const MealCardV3: React.FC<Props> = ({
  onMealPress,
  onSwapPress,
  task,
  status,
  isFuture,
  isSwapDisabled,
}) => {
  const color = "#FFFFFFB2";
  const navigation = useNavigation();
  const details = getCardDetailsV3(
    task?.fitPoints ? task.fitPoints : 0,
    task?.kcal || 0,
    task?.durationMinutes ? task?.durationMinutes : 0
  );

  return (
    <View className="flex ">
      <View className="rounded-3xl h-full flex flex-col justify-between items-center relative z-0 ">
        <View className="flex-1 flex-row w-full">
          <View className="flex-1 pl-3.5 pt-3.5   pb-0">
            <Text
              style={{ fontFamily: "Poppins-SemiBold" }}
              className="pb-2 ml-[-1px]  text-base iphoneX:text-base tracking-wider text-[#F1F1F1]"
              numberOfLines={1}
            >
              {task?.mealTypes ? task?.mealTypes : "Breakfast"}
            </Text>
            <Text
              style={{ fontFamily: "Poppins-Regular" }}
              className=" font-normal text-[10px] iphoneX:text-xs text-white/80 pb-4 pr-8"
              numberOfLines={2}
            >
              {task?.name}
            </Text>
            <View className="flex flex-row justify-between items-center flex-wrap flex-1 w-full pr-8">
              {details?.map((item) => (
                <View
                  key={item.icon}
                  className="flex flex-row justify-between items-center mb-2 "
                >
                  <View className="flex items-center justify-center  ">
                    <View className="w-3 aspect-square  mr-1 ">
                      <SvgIcons iconType={item.icon} color={color} />
                    </View>
                  </View>
                  <View className="flex  items-center justify-center  ">
                    <Text
                      style={{
                        color,
                        fontFamily: "Poppins-Regular",
                      }}
                      className="text-[10px]  h-4"
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View className="w-[46%] relative z-0 aspect-[133/136] ">
            {task?.recipeTaskId ? (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RecipeeDetailScreen", {
                    taskId: task.recipeTaskId ? task.recipeTaskId : "",
                  });
                  weEventTrack("DietPlanScreen_viewRecipee", {});
                }}
                className="absolute right-2 top-2 z-10 filter drop-shadow-md"
              >
                <MealIcon />
              </TouchableOpacity>
            ) : null}

            {task?.thumbnails || task?.videoThumbnail ? (
              <MediaTile
                media={
                  task?.videoThumbnail ? task.videoThumbnail : task?.thumbnails
                }
                fluid={true}
                fluidResizeMode="cover"
                roundedStr="rounded-xl rounded-bl-3xl rounded-br-none rounded-tl-none"
              />
            ) : (
              <View className="rounded-xl rounded-bl-3xl rounded-br-none rounded-tl-none overflow-hidden">
                <ImageWithURL
                  source={{
                    uri: "https://ik.imagekit.io/socialboat/Frame%201000001341%20(2)_1zxBEJktlI.png?updatedAt=1698301284302",
                  }}
                  className="object-cover"
                />
              </View>
            )}
          </View>
        </View>
        <View className="flex flex-row justify-evenly w-full px-3.5 py-3">
          <TouchableOpacity
            onPress={onSwapPress}
            disabled={isSwapDisabled}
            className={clsx(
              "border flex-[.5] rounded-xl mr-2 items-center justify-center",
              isSwapDisabled
                ? "text-white/30 border-white/50"
                : " text-[#fff] border-white"
            )}
          >
            <Text
              className={clsx(
                "text-center  py-3.5 text-xs",
                isSwapDisabled ? "text-white/30" : "text-[#fff]"
              )}
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Swap Item
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMealPress}
            className="border  flex-[.5]   flex-row border-white rounded-xl items-center justify-center bg-[#fff] "
          >
            <Text
              className={clsx(
                "text-center  py-2.5 text-xs mr-1",
                status === "done" ? "text-[#188B3F]" : "text-[#654DC8]"
              )}
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {status === "done"
                ? "Done"
                : isFuture
                ? "View Meal"
                : "Track Meal"}
            </Text>

            <View className="w-3 h-3">
              {status === "done" ? (
                <DoneIcon />
              ) : (
                <SvgIcons iconType="rightArrow" color="#6D55D1" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MealCardV3;
