import { View, Text, TouchableOpacity } from "react-native";
import Header from "@modules/Header";
import { Image } from "react-native";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { infoBtnRing, filterIconWhite } from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";

const WorkoutHeader = () => {
  const { badge } = useSignleBadgeContext();
  const navigation = useNavigation();

  return (
    <Header
      back={true}
      tone="dark"
      titleNode={
        <View className="flex flex-row items-center">
          <Text
            className="text-white text-sm iphoneX:text-base mr-4"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {badge?.name ? `${badge.name}` : "My Workout Plan"}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CoursePageScreen", {
                badgeId: badge?.id || "",
                type: "workout",
              })
            }
          >
            <Image
              source={{ uri: infoBtnRing }}
              className="w-5 aspect-square"
            />
          </TouchableOpacity>
        </View>
      }
      optionNode={
        <TouchableOpacity
          onPress={() =>
            badge &&
            navigation.navigate("WorkoutSettingScreen", {
              badgeId: badge.id,
            })
          }
        >
          <Image
            source={{ uri: filterIconWhite }}
            className="w-4 iphoneX:w-5 aspect-square"
          />
        </TouchableOpacity>
      }
      gradientColors={["#318DF8", "#1F5BF7"]}
    />
  );
};

export default WorkoutHeader;
