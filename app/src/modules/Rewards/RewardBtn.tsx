import { View, Text, TouchableOpacity } from "react-native";

import clsx from "clsx";
interface Props {
  bgColor?: string;
  onPressHandle?: () => void;
  textColorOne?: string;
  textColorTwo?: string;
  btnTextOne?: string;
  btnTextTwo?: string;
  btnTextOneStyle?: string;
  btnTextTwoStyle?: string;
  btnLayout?: string;
  roundedStr?: string;
}
const RewardBtn: React.FC<Props> = ({
  bgColor,
  onPressHandle,
  textColorOne,
  textColorTwo,
  btnTextOne,
  btnTextOneStyle,
  btnTextTwo,
  btnTextTwoStyle,
  btnLayout,
  roundedStr,
}) => {
  return (
    <View className="flex flex-row h-8 iphoneX:h-11">
      <View
        className={clsx("flex-1 ", roundedStr ? roundedStr : "rounded-sm")}
        style={{
          backgroundColor: bgColor ? bgColor : "#292832",
        }}
      >
        <TouchableOpacity onPress={onPressHandle}>
          <View
            className={clsx(
              "h-full  ",
              btnLayout ? btnLayout : "flex flex-row items-center"
            )}
          >
            <Text
              className={clsx(
                "font-bold ",
                btnTextOneStyle ? btnTextOneStyle : "text-base"
              )}
              style={{
                fontFamily: "BaiJamjuree-Bold",
                color: textColorOne ? textColorOne : "#000",
              }}
            >
              {btnTextOne}
            </Text>
            {btnTextTwo ? (
              <Text
                className={clsx(
                  "font-black",
                  btnTextTwoStyle ? btnTextTwoStyle : "text-lg"
                )}
                style={{
                  fontFamily: "BaiJamjuree-Bold",
                  color: textColorTwo ? textColorTwo : "#000",
                }}
              >
                {btnTextTwo}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RewardBtn;
