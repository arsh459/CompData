import { waBaseLink } from "@constants/links";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

interface Props {}

const DefaultAwards: React.FC<Props> = ({}) => {
  // const tabBarHeight = useBottomTabBarHeight();
  const { res } = useSubscriptionContext();
  const navigation = useNavigation();

  const isPro = res.currentStatus === "SUBSCRIBED";

  const onPress = () => {
    if (isPro) {
      weEventTrack("click_whatsApp", {});
      Linking.openURL(
        `${waBaseLink}${encodeURI("Hi!\nI want to know about my target")}`
      );
    } else {
      weEventTrack("click_pro", {});
      navigation.navigate("ProScreen", { planType: "pro" });
    }
  };

  return (
    <View className="flex-1 flex items-center" style={{ paddingBottom: 20 }}>
      <Image
        source={{
          uri: isPro
            ? "https://ik.imagekit.io/socialboat/Group_1809_TEqRs52ky.png?updatedAt=1686929163539"
            : "https://ik.imagekit.io/socialboat/Group_1651_wu5HP-yXy.png?updatedAt=1686929163571",
        }}
        className="flex-[4] aspect-square mt-4"
        resizeMode="contain"
      />
      <View className="p-4">
        {isPro ? (
          <Text
            className="text-white text-3xl leading-8"
            style={{ fontFamily: "Canela-Regular" }}
          >
            Your coach will assign you the
            <Text
              className="text-[#A8FF51]"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {` targets `}
            </Text>
            soon
          </Text>
        ) : (
          <Text
            className="text-white text-3xl leading-8"
            style={{ fontFamily: "Canela-Regular" }}
          >
            To get personal monthly targets,
            <Text
              className="text-[#FFE381]"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {" Subscribe to PRO."}
            </Text>
          </Text>
        )}
      </View>
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group_TiFhUWI6t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676106587061",
        }}
        style={{ transform: [{ rotateX: "180deg" }, { rotateZ: "30deg" }] }}
        className="flex-[1] aspect-[0.6] mr-[15%]"
        resizeMode="contain"
      />
      <TouchableOpacity onPress={onPress} className="w-full p-4">
        <LinearGradient
          colors={
            isPro
              ? ["#6D55D1", "#6D55D1"]
              : ["#E4C668", "#F5D161", "#FCEAB9", "#F3D062"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="w-full rounded-xl flex flex-row justify-center items-center py-3"
        >
          <Text
            className="text-base text-center"
            style={{
              fontFamily: "Nunito-Bold",
              color: isPro ? "#FFFFFF" : "#232136",
            }}
          >
            {isPro ? "Talk to coach" : "Subscribe to a better you"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default DefaultAwards;
