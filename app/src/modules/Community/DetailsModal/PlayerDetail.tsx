import CloseBtn from "@components/Buttons/CloseBtn";
import { UserRank } from "@models/Activity/Activity";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFPsToDisplay } from "@modules/HomeScreen/NewHome/utils";
import { useGameContext } from "@providers/game/GameProvider";
import UserProfile from "@components/UserProfile";
import { useUserV2 } from "@hooks/auth/useUserV2";

interface Props {
  userRank: UserRank;
  onCloseModal: () => void;
}

const PlayerDetail: React.FC<Props> = ({ userRank, onCloseModal }) => {
  const navigation = useNavigation();
  const { params } = useGameContext();
  const { user } = useUserV2(userRank.uid);

  const handleProfileClick = () => {
    navigation.navigate("User", {
      userId: userRank.uid,
    });
    onCloseModal();
  };

  return (
    <>
      <View className=" flex flex-row justify-end  ">
        <CloseBtn onClose={onCloseModal} color="#FFFFFF" />
      </View>

      <View className="rounded-xl my-4 bg-[#2E2C3E] flex flex-row justify-center p-4">
        <Pressable onPress={handleProfileClick}>
          <UserProfile user={user} size={40} />
        </Pressable>
        <View className="px-3 flex-1 ">
          <View className="flex flex-row items-center">
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              numberOfLines={1}
              className="text-white text-base"
            >
              {userRank.authorName}
            </Text>
          </View>
          {userRank.teamName ? (
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              numberOfLines={1}
              className="text-xs text-white"
            >
              @{userRank.teamName}
            </Text>
          ) : null}
        </View>
        <View className="flex-[30%] flex flex-row justify-end items-center font-bold">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white pl-2 text-sm iphoneX:text-base"
          >
            {getFPsToDisplay(userRank, params?.currentSprint?.id)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default PlayerDetail;
