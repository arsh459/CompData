import { Linking, Text, TouchableOpacity, View } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import { imgBored, imgStreakStatic } from "@constants/imageKitURL";
// import ArrowDirectionIcon from "@components/SvgIcons/ArrowDirectionIcon";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useUserStore } from "@providers/user/store/useUserStore";
import { getDieticianName } from "./utils";
import { useConfigContext } from "@providers/Config/ConfigProvider";

interface Props {}

const BottomDietView: React.FC<Props> = ({}) => {
  const { badge } = useSignleBadgeContext();

  const { user } = useUserV2(
    badge?.creatorIds?.length ? badge.creatorIds[0].trim() : ""
  );

  const { config } = useConfigContext();

  const name = useUserStore((state) => state.user?.name);
  const label = getDieticianName(user);

  const onCustomiseClick = () => {
    weEventTrack("dietPlan_askCustomization", {});

    const ph = user?.phone
      ? user.phone.replace("+", "")
      : config?.defaultDieticianContact
      ? config?.defaultDieticianContact
      : "919958730020";

    if (ph) {
      const msg = `Hi ${label ? label : "there"}\nThis is ${
        name ? name : "a SocialBoat user"
      }. I would like to get my plan updated.\nPlease suggest a time to chat.`;
      // console.log("msg", msg);

      Linking.openURL(`https://api.whatsapp.com/send?phone=${ph}&text=${msg}`);
    }
  };

  return (
    <View className="w-full relative mt-8 z-0">
      <ImageWithURL
        source={{ uri: imgStreakStatic }}
        className="w-full aspect-[375/243]"
      />
      <View className=" absolute left-0 right-0 top-0 bottom-0 flex justify-center ">
        <View className="flex flex-row items-center w-4/5 mx-auto">
          <ImageWithURL
            source={{ uri: imgBored }}
            className="w-1/3 aspect-square "
          />
          <View className="flex  flex-1 pl-4 ">
            <Text
              className=" text-white text-base"
              style={{ fontFamily: "Nunito-Medium" }}
            >
              Want us to customise your diet plan?
            </Text>
            <TouchableOpacity
              onPress={onCustomiseClick}
              className="flex flex-row items-center pt-2"
            >
              <Text
                className=" text-[#8E73FF] text-sm  "
                style={{ fontFamily: "Nunito-Bold" }}
              >
                DM {label ? label : "us"} now
              </Text>
              <View className="w-4 aspect-square">
                <ArrowIcon color={"#8E73FF"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BottomDietView;
