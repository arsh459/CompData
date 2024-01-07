import { View, Text } from "react-native";

import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import ImageWithURL from "@components/ImageWithURL";

interface Props {
  mainText?: string;
  iconStr?: string;
  subText?: string;
}
const SettingPeriodCard: React.FC<Props> = ({ mainText, iconStr, subText }) => (
  <View className=" bg-[#232136] ">
    {subText ? (
      <>
        <Text
          className="text-white/80 text-base pl-5 pb-2"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          {mainText}
        </Text>
        <View className="p-4 bg-[#343150] flex flex-row items-center justify-between mx-4 rounded-xl">
          <View className="flex flex-row items-center">
            {iconStr ? (
              <ImageWithURL
                className="w-6 aspect-square"
                source={{ uri: iconStr }}
              />
            ) : null}
            <Text
              className="text-white/80 text-base pl-1.5"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {subText}
            </Text>
          </View>
          <View className="w-3 aspect-square">
            <ArrowIcon direction="right" color={"#FFFFFF"} />
          </View>
        </View>
      </>
    ) : null}
  </View>
);
export default SettingPeriodCard;
