import { View, Text, TouchableOpacity } from "react-native";

// import { useUserContext } from "@providers/user/UserProvider";
import CirclePercent from "@components/CirclePercent";
import { getLevelColor } from "@utils/level/levelColor";
import UserImage from "@components/UserImage";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useNavigation } from "@react-navigation/native";
import { acceptInvite, rejectInvite } from "@modules/TeamMain/utils";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getUserTotalFP } from "@modules/HomeScreen/utills/getUserTotalFP";
// import { useGameContext } from "@providers/game/GameProvider";
interface Props {
  // requesterName?: string;
  teamId: string;
  id: string;
  requestedBy?: string;
}
const RequestCard: React.FC<Props> = ({
  // fpString,
  teamId,
  id,
  requestedBy,
}) => {
  const { user } = useUserV2(requestedBy);
  const { state } = useAuthContext();

  const navigation = useNavigation();
  const lvl = user?.userLevelV2 ? user.userLevelV2 : 0;

  const lvlColor = getLevelColor(lvl);
  const activeColor = lvlColor.color;

  const onAccept = async () => {
    if (requestedBy) {
      await acceptInvite(teamId, requestedBy, state.gameId);
    }
  };
  const onReject = async () => {
    await rejectInvite(state.gameId, id);
  };

  return (
    <View className="flex-1 mb-5">
      <View className="flex flex-row items-center w-full p-4 bg-[#2A2933] border-b-[1px] border-b-[#100F1A] rounded-t-xl">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("User", { userId: user?.uid ? user.uid : "" })
          }
        >
          <CirclePercent
            circleSize={40}
            percent={
              typeof user?.progressV2 === "number" ? user.progressV2 : 100
            }
            activeColor={activeColor}
            inActiveColor={"#14131E"}
            strokeWidth={3}
            padding={2}
            showInactive={true}
            startAngle={207}
            circleRatio={0.85}
          >
            <UserImage
              image={user?.profileImage}
              name={user?.name}
              width="w-full"
              height="h-full"
            />
          </CirclePercent>
        </TouchableOpacity>
        <Text
          className="text-xs iphoneX:text-sm text-white  flex-1 mx-3"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          <Text style={{ fontFamily: "BaiJamjuree-Bold" }}>{user?.name}</Text>{" "}
          {`sent you a request to join your team`}
        </Text>
        <Text
          className="text-white text-xs iphoneX:text-sm"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {getUserTotalFP(user?.fpCredit, user?.fpDebit)} FP
        </Text>
      </View>
      <View className="bg-[#2A2933]  flex flex-row  justify-evenly  w-full rounded-b-xl">
        <TouchableOpacity onPress={onAccept}>
          <Text
            className="text-[#2BA9FF] text-sm iphoneX:text-base py-3 "
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Confirm Request
          </Text>
        </TouchableOpacity>

        <View className="bg-[#100F1A] text-white px-px" />
        <TouchableOpacity onPress={onReject}>
          <Text
            className="text-[#FF6F82] text-sm iphoneX:text-base py-3"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Reject Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestCard;
