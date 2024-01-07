import { View, Text, TouchableOpacity } from "react-native";

import UseModal from "@components/UseModal";
import ProfileButton from "./ProfileButton";
import CloseBtn from "@components/Buttons/CloseBtn";
import FitpointIcon from "@components/SvgIcons/FitpointIcon";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
// import { useGameContext } from "@providers/game/GameProvider";
// import { useUserContext } from "@providers/user/UserProvider";
// import { getTeamId } from "@utils/utills";
interface Props {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  fitPoints: number;
}

const FitPointModal: React.FC<Props> = ({ isOpen, setIsOpen, fitPoints }) => {
  // const { user } = useUserContext();
  // const { game } = useGameContext();
  const navigation = useNavigation();
  // const teamId = getTeamId(user, game?.id);

  const handleWorkoutClick = () => {
    navigation.navigate("Home");
    weEventTrack("user_fpModalStartWorkoutClick", {});
    setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <UseModal
      visible={isOpen}
      onClose={() => setIsOpen(false)}
      fallbackColor="#100F1A"
      width="w-full"
      height="h-full"
      blurAmount={30}
      classStr="px-4"
      tone="dark"
    >
      <View className="self-end">
        <CloseBtn onClose={() => setIsOpen(false)} />
      </View>

      <View className="flex flex-row items-center justify-between p-2 rounded-lg my-8 bg-white">
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-lg font-bold"
        >
          Your Current FitPoints
        </Text>
        <View className="flex flex-row items-center">
          <View className="w-3 iphoneX:w-4 aspect-square mx-2">
            <FitpointIcon color="#000000" />
          </View>
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-lg font-bold "
          >
            {fitPoints} FP
          </Text>
        </View>
      </View>

      <View className="p-4 bg-[#292832] rounded-lg">
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-white text-center pb-4 rounded-lg text-xl font-semibold"
        >
          Want to earn more fitpoints?
        </Text>
        <TouchableOpacity onPress={handleWorkoutClick}>
          <ProfileButton
            fontStyle="bg-[#FF5970] justify-center text-center flex-1  py-2"
            text="Start Workout"
            textStyle="text-xl iphoneX:text-2xl font-bold text-center text-white whitespace-nowrap"
          />
        </TouchableOpacity>
      </View>
    </UseModal>
  );
};

export default FitPointModal;
