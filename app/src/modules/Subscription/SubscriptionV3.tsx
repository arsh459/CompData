import LoadingModal from "@components/loading/LoadingModal";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
// import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import PlanCardV2 from "./PlanCardV2";

interface Props {
  // subscriptionDuration: string;
  // topText: string;
  onCloseModal: () => void;
}
const SubscriptionV3: React.FC<Props> = ({
  // subscriptionDuration,
  // topText,
  onCloseModal,
}) => {
  // const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { res, makePurchase, packages, loading } = useSubscriptionContext();

  const colorsArr = [
    ["#3DB5E9", "#54FFD6"],
    ["#FF6577", "#FFAB70"],
    ["#E376FF", "#FF57A2"],
  ];

  const navigation = useNavigation();
  // const subscriptionFeatures = [
  //   "3 Day Free Trial",
  //   "Unlimited access to all games",
  //   "Rewards > ₹1,00,000",
  // ];

  const onPrivacyPolicy = () => {
    onCloseModal();

    setTimeout(
      () =>
        navigation.navigate("WebViewScreen", {
          source:
            "https://socialboat.notion.site/Privacy-Policy-68079970e2d64d95bddf92bb31114ad8",
        }),
      1000
    );
  };

  const onTerms = () => {
    onCloseModal();

    setTimeout(
      () =>
        navigation.navigate("WebViewScreen", {
          source:
            Platform.OS === "ios"
              ? "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              : "https://socialboat.notion.site/Terms-of-Use-dac5e29234f542b48e826ed54c10f8fe",
        }),
      1000
    );
  };

  return (
    <ScrollView className="bg-[#100F1A]" bounces={false}>
      {loading ? <LoadingModal width="w-10" height="h-10" /> : null}
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-400,h-300/Screenshot_2022-07-25_at_2.01_1__1__BZFt09JHN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658838777384",
        }}
        style={{
          flex: 1,
          width: width,
          height: width * (3 / 4),
          resizeMode: "cover",
        }}
      />
      <LinearGradient
        colors={["transparent", "#100F1A"]}
        locations={[0.6, 1]}
        style={{
          flex: 1,
          position: "absolute",
          width: width,
          height: width * (3 / 4),
          zIndex: 50,
        }}
      />
      <Text
        className="text-[#F5F5F7] text-center font-bold text-3xl px-4"
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        Choose Your Plan
      </Text>
      <View className="flex flex-row justify-center pb-4 items-center">
        <TouchableOpacity onPress={onPrivacyPolicy}>
          <Text className="text-[#E9EBFF] text-sm underline">
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <Text className="text-[#E9EBFF] text-sm font-light px-1">and</Text>
        <TouchableOpacity onPress={onTerms}>
          <Text className="text-[#E9EBFF] text-sm underline">Terms of use</Text>
        </TouchableOpacity>
      </View>
      {packages.map((item, index) => (
        <View key={item.product.identifier} className="p-4">
          <PlanCardV2
            active={res.planIdentifyer === item.product.identifier}
            currency={item.product.currencyCode}
            amount={`${item.product.price}`}
            durationLabel={item.packageType}
            description={item.product.description}
            id={item.product.identifier}
            onClick={async () => {
              await makePurchase(item);
              // if (result) {
              //   onCloseModal();
              // }
            }}
            colors={colorsArr[index % colorsArr.length]}
          />
        </View>
      ))}
    </ScrollView>
  );
};
export default SubscriptionV3;
