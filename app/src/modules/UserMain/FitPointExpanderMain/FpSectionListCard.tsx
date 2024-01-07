import { View, Text, Pressable } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import ImageWithURL from "@components/ImageWithURL";
import { format } from "date-fns";
import { pastActivityInterface } from "./hooks/useEarnedTaskSectionsAlgolia";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "@providers/user/store/useUserStore";

const FpSectionListCard: React.FC<{
  icon: {
    icon: any;
    colors: string[];
  };
  item: pastActivityInterface;
}> = ({ icon, item }) => {
  const navigation = useNavigation();

  const viewerUID = useUserStore((state) => state.user?.uid);

  const onPress = () => {
    if (viewerUID === item.authorUID) {
      item.taskType === "steps"
        ? () => {}
        : navigation.navigate("WorkoutDoneScreen", {
            // actId: item.id,
            attemptedDate: item.attemptedDate,
            taskId: item.taskId,
            // taskId: item.taskId,
          });
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className="flex flex-row items-center justify-between p-4 mx-4 rounded-2xl bg-[#343150]"
    >
      <View className="flex-1 flex flex-row items-center">
        <LinearGradient
          colors={icon.colors ? icon.colors : ["transparent", "transparent"]}
          className="w-10 aspect-square p-2 rounded-full"
        >
          <ImageWithURL
            className="w-6 aspect-square  "
            source={{ uri: icon.icon }}
            resizeMode="contain"
          />
        </LinearGradient>
        <View className="flex-1 px-2">
          <Text
            numberOfLines={1}
            className="text-sm pl-1 text-[#F1F1F1]  iphoneX:text-base"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            className="text-xs pl-1 text-[#F1F1F1]/60 "
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {item?.unix ? format(item.unix, "do MMM") : ""}
          </Text>
        </View>
      </View>
      <Text
        className="text-sm pl-1 text-[#F1F1F1]  iphoneX:text-base"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        +{item.fitPoints} Fp
      </Text>
    </Pressable>
  );
};

export default FpSectionListCard;
