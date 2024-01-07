import MediaTile from "@components/MediaCard/MediaTile";
import UserImage from "@components/UserImage";
import { Task } from "@models/Tasks/Task";

import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";
import ReelDuration from "./ReelDuration";
import { useUserV3 } from "@hooks/auth/useUserV3";

interface Props {
  item: Task;
}

const ReelsCard: React.FC<Props> = ({ item }) => {
  const { user } = useUserV3(item.userId);
  const navigation = useNavigation();

  const onPress = () => {
    if (item.tags?.includes("Recipes")) {
      navigation.navigate("RecipeeDetailScreen", { taskId: item.id });
    } else {
      navigation.navigate("ReelView", { taskId: item.id });
    }

    weEventTrack("nutrition_clickReel", {
      taskName: item.name ? item.name : "no name",
    });
  };

  return (
    <View className="relative z-0 rounded-xl overflow-hidden w-full h-full">
      <MediaTile
        media={item.reelThumbnail}
        fluid={true}
        fluidResizeMode="cover"
        paused={true}
      />
      <ReelDuration mediaDuration={item.reelMedia?.duration} />

      <LinearGradient
        colors={["#5D588C00", "#5D588CC7", "#5D588C"]}
        className="absolute left-0 right-0 bottom-0 h-1/2 z-10 p-4 flex justify-end"
      >
        <View className="flex flex-row items-center">
          <UserImage
            image={user?.profileImage}
            width="w-4 iphoneX:w-5"
            height="h-4 iphoneX:h-5"
          />
          <Text
            className="flex-1 text-white text-xs iphoneX:text-sm ml-1"
            style={{ fontFamily: "Nunito-Regular" }}
            numberOfLines={1}
          >
            {user?.name}
          </Text>
        </View>
        <View className="w-1 aspect-square" />
        <Text
          className="h-8 iphoneX:h-10 text-white text-xs iphoneX:text-sm"
          style={{ fontFamily: "Nunito-Regular" }}
          numberOfLines={2}
        >
          {item.name}
        </Text>
      </LinearGradient>

      <Pressable
        onPress={onPress}
        className="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center"
      >
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Group_1327_PVUcBr8-B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677506140902",
          }}
          className="w-12 aspect-square"
        />
      </Pressable>
    </View>
  );
};

export default ReelsCard;
