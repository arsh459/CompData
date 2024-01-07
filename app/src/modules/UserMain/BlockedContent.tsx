import { unblockUser } from "@models/Reports/createUtils";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, View } from "react-native";

interface Props {
  blockedUID?: string;
}

const BlockedContent: React.FC<Props> = ({ blockedUID }) => {
  const { state } = useAuthContext();

  const onUnblock = async () => {
    if (state?.uid && blockedUID) {
      await unblockUser(state?.uid, blockedUID);
    }
    weEventTrack("user_clickUnblock", {
      gameId: state.gameId,
      blockedUID: blockedUID ? blockedUID : "no_blockedUID",
    });
  };

  return (
    <View className="bg-black h-full flex justify-center items-center">
      <Text
        style={{ fontFamily: "BaiJamjuree-Bold" }}
        className="text-white text-2xl text-center pb-2"
      >
        You have blocked this user
      </Text>
      <View className="pt-4">
        <StartButton
          title="Unblock User"
          bgColor="bg-[#fff] mx-4 px-4"
          textColor="text-[#19334F] "
          roundedStr="rounded-md"
          textStyle="py-2 text-center text-lg font-bold rounded-md"
          onPress={onUnblock}
        />
      </View>
    </View>
  );
};

export default BlockedContent;
