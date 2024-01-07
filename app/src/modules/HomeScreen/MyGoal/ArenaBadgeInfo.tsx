import { View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@components/GradientText";
import { Badge } from "@models/Prizes/Prizes";
import NewBadge from "../NewHome/NewBadge";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
interface Props {
  text1?: string;
  text2?: string;
  badge?: Badge;
  athleteImage?: CloudinaryMedia | AWSMedia;
}
const ArenaBadgeInfo: React.FC<Props> = ({
  text1,
  text2,
  badge,
  athleteImage,
}) => {
  return (
    <LinearGradient
      colors={["#001B3C", "#000000"]}
      end={[1, 0]}
      start={[0, 1]}
      className="p-4   rounded-t-[11px] rounded-b-[3px] flex flex-row items-center "
    >
      <View className=" flex-1  ">
        {text1 ? (
          <GradientText
            text={text1}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            colors={["#53B5FF", "#3E73E1"]}
            textStyle={{ fontFamily: "BaiJamjuree-Bold", fontSize: 18 }}
            // txtTlStyle="text-base iphoneX:text-lg  flex-1"
          />
        ) : null}
        {text2 ? (
          <View className="pt-1">
            <GradientText
              text={text2}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              colors={["#53B5FF", "#3E73E1"]}
              textStyle={{ fontFamily: "BaiJamjuree-SemiBold" }}
              txtTlStyle="iphoneX:text-sm text-sm flex-1"
            />
          </View>
        ) : null}
      </View>
      <View className="flex flex-row items-center w-[19.5%] ">
        {badge?.badgeId === "independent" ? (
          <NewBadge
            colorOne="#0085E0"
            colorTwo="#2C46C5"
            unLockedHeight={100}
            athleteImage={athleteImage}
            percentageHidden={true}
          />
        ) : badge?.badgeId === "relative" ? (
          <NewBadge
            colorOne="#EADAA6"
            colorTwo="#9C874E"
            unLockedHeight={100}
            athleteImage={athleteImage}
            percentageHidden={true}
          />
        ) : null}
      </View>
    </LinearGradient>
  );
};

export default ArenaBadgeInfo;
