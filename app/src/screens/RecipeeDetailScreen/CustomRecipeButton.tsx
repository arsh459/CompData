import { View } from "react-native";
import { iconTypes } from "@components/SvgIcons";
import CustomRecipeButtonWithIcon from "./CustomRecipeButtonWithIcon";
interface Props {
  icon?: string;
  onPress: () => void;
  text: string;
  bgColor?: string;
  isIconSvg?: boolean;
  iconType?: iconTypes;
}
const CustomRecipeButton: React.FC<Props> = ({
  onPress,
  text,
  bgColor,
  isIconSvg,
  iconType,
}) => {
  return (
    <View className="w-full px-4 py-5 bg-#333">
      <CustomRecipeButtonWithIcon
        isIconSvg={isIconSvg}
        iconType={iconType}
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

export default CustomRecipeButton;
