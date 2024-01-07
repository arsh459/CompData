import { View } from "react-native";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { plusIconWhiteWithoutBorder } from "@constants/imageKitURL";
interface Props {
  icon?: string;
  onPress: () => void;
  text: string;
  bgColor?: string;
}
const TrackerButton: React.FC<Props> = ({ icon, onPress, text, bgColor }) => {
  return (
    <View className=" w-full  px-4 py-5">
      <ButtonWithIcon
        iconUrl={icon ? icon : plusIconWhiteWithoutBorder}
        title={text}
        textColor="text-[#fff] "
        textStyle="pl-2 text-base iphoneX:text-lg "
        roundedStr="rounded-2xl py-2.5 px-3.5 w-full  flex flex-row  justify-center  items-center"
        iconStyle="w-3 aspect-square "
        fontFamily="Nunito-Bold"
        layoutStyle={{
          backgroundColor: bgColor ? bgColor : "#6D55D1",
          alignItems: "center",
        }}
        onPress={onPress}
      />
    </View>
  );
};

export default TrackerButton;
