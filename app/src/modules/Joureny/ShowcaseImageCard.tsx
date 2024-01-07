import { View, Image, Linking } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonWithIcon from "@modules/TeamInvite/ButtonWithIcon";
import { Journey } from "@models/Jounrney/Jourrney";
import { useUserContext } from "@providers/user/UserProvider";
import { JourneyContent, JourneyMedia } from "./HelperComponents";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  journey: Journey[];
  canShare?: boolean;
}
const ShowcaseImageCard: React.FC<Props> = ({ journey, canShare }) => {
  const first = journey[journey.length - 1];
  const last = journey[0];
  const { user } = useUserContext();

  const onWA = () => {
    weEventTrack("journey_clickTalkToCoach", {});
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI need help to transform myself")}`
    );
  };

  function addMonths(timestamp: number, months: number) {
    const date = new Date(timestamp);
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != date.getDate()) {
      date.setDate(0);
    }
    return date.getTime();
  }

  return (
    <LinearGradient
      colors={["#E384FB", "#5B4DA8"]}
      className="flex-1 rounded-2xl px-4 py-6 m-4"
    >
      <View className="flex flex-row justify-between items-center">
        <JourneyMedia journey={first} width="w-[40%]" />
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Component_59_m4dAMGNm0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668251573022",
          }}
          className="flex-1 mx-4 aspect-square"
          resizeMode="contain"
        />
        {journey.length > 1 ? (
          <JourneyMedia journey={last} width="w-[40%]" />
        ) : (
          <JourneyMedia
            journey={first}
            width="w-[40%]"
            blur={true}
            create={true}
          />
        )}
      </View>
      <View className="h-4" />
      <View className="flex flex-row justify-between items-stretch">
        <JourneyContent
          type="Earlier"
          weight={first.currWeight}
          timestamp={first.createdOn}
          width="w-[40%]"
        />
        {journey.length > 1 ? (
          <JourneyContent
            type="Now"
            weight={last.currWeight}
            timestamp={last.createdOn}
            width="w-[40%]"
          />
        ) : (
          <JourneyContent
            type="In progress"
            weight={user?.desiredWeight ? user.desiredWeight : 0}
            timestamp={addMonths(
              first.createdOn,
              user?.paceOfAchievementInMonth
                ? user?.paceOfAchievementInMonth
                : 0
            )}
            width="w-[40%]"
          />
        )}
      </View>
      {canShare ? (
        <>
          <View className="h-6" />
          <ButtonWithIcon
            iconUrl="https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_2_Qi5YiiglY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668078601964"
            title={"Talk to Coach"}
            textColor="text-[#100F1A]"
            textStyle="pl-2 text-sm iphoneX:text-base"
            roundedStr="bg-white rounded-xl py-3 flex flex-row justify-center items-center"
            iconStyle="w-5 aspect-square"
            fontFamily="BaiJamjuree-Bold"
            onPress={onWA}
          />
        </>
      ) : null}
    </LinearGradient>
  );
};

export default ShowcaseImageCard;
