import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
import { isToday, format } from "date-fns";
import { ChatMessage } from "@models/ChatBot/interface";
import { useNavigation } from "@react-navigation/native";
import SvgIcons from "@components/SvgIcons";
import { executeCallBack } from "./Callbacks/executeCallBack";
import {
  DNParseResult,
  handleNavigation,
} from "@providers/dnLinks/hooks/handleLink";

interface Props {
  screenParams: DNParseResult;
  buttonText: string;
  item: ChatMessage;
}
const ButtonView: React.FC<Props> = ({ screenParams, item, buttonText }) => {
  const navigation = useNavigation();
  const handleButtonPress = async () => {
    await executeCallBack(item?.buttonParams);
    handleNavigation(screenParams, navigation);
  };
  return (
    <>
      <View className={clsx("flex justify-center py-2 items-start")}>
        <View className={clsx("flex items-center", "flex-row")}>
          <View
            className={clsx("rounded-xl px-4 py-3", "max-w-[75%]")}
            style={{
              backgroundColor: "#998DE0",
            }}
          >
            <TouchableOpacity
              className="flex flex-row items-center justify-center"
              onPress={() => {
                handleButtonPress();
              }}
            >
              <View className="flex-1">
                <Text className="text-[#FFFFFF]" numberOfLines={4}>
                  {buttonText}
                </Text>
              </View>
              <View className="w-3 h-3 ml-3">
                <SvgIcons iconType="rightArrowSlim" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-white/60 text-xs mt-4">
          {isToday(item.createdOn)
            ? format(item.createdOn, "p")
            : format(item.createdOn, "dd MMM yy")}
        </Text>
      </View>
    </>
  );
};

export default ButtonView;
