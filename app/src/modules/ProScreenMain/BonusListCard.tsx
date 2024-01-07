import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { rightArrowIconBonusList, rightTickIcon } from "@constants/imageKitURL";
import clsx from "clsx";
import { ListCardBonus } from "./utils";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
interface Props {
  plan: ListCardBonus;
  headingColor?: string;
  disabled?: boolean;
}
const BonusListCard: React.FC<Props> = ({ plan, disabled, headingColor }) => {
  const { width } = useWindowDimensions();
  const { user } = useUserContext();
  // const openWhatsApp = () => {
  //   Linking.openURL(
  //     `${waBaseLink}${encodeURI("Hi!\nI want to start my free consultation")}`
  //   );

  //   weEventTrack("ProScreen_clickBookConsultation", {});
  // };
  const navigation = useNavigation();
  const handleOnPress = () => {
    if (plan.navigateTo === "WorkoutSettingScreen" && user?.badgeId) {
      navigation.navigate("WorkoutSettingScreen", {
        badgeId: user.badgeId,
      });
    } else if (plan.navigateTo) {
      navigation.navigate(plan.navigateTo as any, { ...plan.navParam });
    }
  };
  return (
    <View className="flex-1 ">
      <Pressable
        disabled={disabled}
        onPress={handleOnPress}
        className={clsx(
          "flex flex-row  px-2.5 m-4 my-3   items-center ",
          "rounded-[20px]   "
        )}
      >
        <View style={{ width: width * 0.1 }} className="">
          <Image
            source={{
              uri: plan.iconUri,
            }}
            className="w-full aspect-square rounded-full"
          />
        </View>
        <View className="flex-1  p-2.5 ">
          {plan.mainText ? (
            <Text
              className={clsx(
                "text-sm   ",
                headingColor ? headingColor : "text-white"
              )}
              numberOfLines={2}
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {plan.mainText}
            </Text>
          ) : null}
        </View>

        <Image
          source={{ uri: disabled ? rightTickIcon : rightArrowIconBonusList }}
          className={clsx("w-5 iphoneX:w-7 aspect-square")}
        />
      </Pressable>
    </View>
  );
};

export default BonusListCard;
