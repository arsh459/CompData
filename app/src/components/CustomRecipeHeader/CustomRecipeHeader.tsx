import SvgIcons from "@components/SvgIcons";
import Header from "@modules/Header";
import { View, Text } from "react-native";
import ProgressBar from "./ProgressBar";
import { iconTypes } from "@components/SvgIcons";

interface Props {
  title: string;
  iconType: iconTypes;
  progress: number;
  color?: string;
}

const CustomRecipeHeader: React.FC<Props> = ({
  title,
  iconType,
  progress,
  color,
}) => {
  return (
    <Header
      centerTitle={true}
      titleNode={
        <>
          <View className=" w-full justify-center align-center">
            <View className="flex flex-row items-center justify-center mx-1 ">
              {iconType ? (
                <>
                  <View className="w-5 flex justify-center ">
                    <SvgIcons iconType={iconType} />
                  </View>
                </>
              ) : (
                <></>
              )}

              <View className="h-10 flex justify-center ">
                <Text className="pl-2.5 text-base iphoneX:text-base text-white font-semibold tracking-wide">
                  {title}
                </Text>
              </View>
            </View>

            <View className="w-36 m-auto ">
              <ProgressBar progress={progress} color={color} />
            </View>
          </View>
        </>
      }
      back={true}
      headerColor="#232136"
      tone="dark"
      title=""
      headerType="solid"
    />
  );
};

export default CustomRecipeHeader;
