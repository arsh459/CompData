import { waBaseLink } from "@constants/links";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  isBooCamp?: boolean;
}

const DefaultNutrition: React.FC<Props> = ({ isBooCamp }) => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { subStatus } = useSubscriptionContext();

  const onStartMtPlan = () => {
    weEventTrack("nutrition_clickPro", {});
    navigation.navigate("ProScreen", { planType: "pro" });
  };

  const openWhatsApp = () => {
    weEventTrack("nutrition_clickWA", {});
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to get health consultation")}`
    );
  };

  const proExplore = subStatus === "SUBSCRIBED" && isBooCamp;

  return (
    <View className="flex-1 flex items-center">
      <Image
        source={{
          uri: isBooCamp
            ? "https://ik.imagekit.io/socialboat/Group_1651_GzZVDYmMO.png?updatedAt=1686810891691"
            : "https://ik.imagekit.io/socialboat/tr:w-400,c-maintain_ratio,fo-auto/Group_1257_EJIrDQRhVA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677672378005",
        }}
        className="flex-[4] aspect-square mt-4"
        resizeMode="contain"
      />
      <View className="p-4">
        {isBooCamp ? (
          <Text
            className="text-white text-3xl leading-8"
            style={{ fontFamily: "Canela-Regular" }}
          >
            Your
            <Text
              className="text-[#A8FF51]"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {` Bootcamp `}
            </Text>
            has ended
          </Text>
        ) : (
          <Text
            className="text-white text-3xl leading-8"
            style={{ fontFamily: "Canela-Regular" }}
          >
            <Text
              className="text-[#FFE381]"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Subscribe to SocialBoat
            </Text>{" "}
            to get your custom diet plan
          </Text>
        )}
        <Text
          className="text-sm text-white/80 pt-4"
          style={{ fontFamily: "Nunito-Regular" }}
        >
          {!proExplore
            ? "You can do the following to continue using SocialBoat"
            : proExplore
            ? "Explore other workouts or reach out to us for a personalised plan."
            : "Unlimited revisions | 24 X 7 Chat & Call Support"}
        </Text>
      </View>
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group_TiFhUWI6t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676106587061",
        }}
        style={{ transform: [{ rotateX: "180deg" }, { rotateZ: "30deg" }] }}
        className="flex-[1] aspect-[0.6] mr-[15%]"
        resizeMode="contain"
      />

      <TouchableOpacity onPress={onStartMtPlan} className="w-full p-4">
        <LinearGradient
          colors={
            proExplore
              ? ["#6D55D1", "#6D55D1"]
              : ["#E4C668", "#F5D161", "#FCEAB9", "#F3D062"]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          className="w-full rounded-xl flex flex-row justify-center items-center py-3"
        >
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Subtract_HSSp5WkIO.png?updatedAt=1686810466837",
            }}
            className="w-5 aspect-square mr-2"
            resizeMode="contain"
          />
          <Text
            className="text-[#232136] text-base text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {subStatus !== "SUBSCRIBED"
              ? "Subscribe to our plan"
              : "Explore Workout plans"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View className="w-full px-4" style={{ paddingBottom: bottom || 16 }}>
        <TouchableOpacity
          onPress={openWhatsApp}
          className="rounded-xl border-2 border-[#6D55D1] p-3"
        >
          <Text
            className="text-[#6D55D1] text-base text-center"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Get Health Consultation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DefaultNutrition;
