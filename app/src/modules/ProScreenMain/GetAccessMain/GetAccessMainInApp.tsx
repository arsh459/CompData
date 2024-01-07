import {
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "@modules/Header";
import { getAccessBgImg } from "@constants/imageKitURL";
import { LinearGradient } from "expo-linear-gradient";
import { planContent } from "../utils";
import HelpBtn from "@components/Buttons/HelpBtn";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { getDurationString } from "@hooks/purchases/utils";
import { StackActions, useNavigation } from "@react-navigation/native";
import LoadingModal from "@components/loading/LoadingModal";
import { PurchasesPackage } from "react-native-purchases";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";
import ProPlanCardInApp from "../ProPlanCardInApp";

const GetAccessMainInApp = () => {
  const { height, width } = useWindowDimensions();
  const { packages, makePurchase, res, loading } = useSubscriptionContext();

  const navigation = useNavigation();

  const onPrivacyPolicy = () => {
    navigation.navigate("WebViewScreen", {
      source:
        "https://socialboat.notion.site/Privacy-Policy-68079970e2d64d95bddf92bb31114ad8",
    });
  };

  const onTerms = () => {
    navigation.navigate("WebViewScreen", {
      source:
        Platform.OS === "ios"
          ? "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          : "https://socialboat.notion.site/Terms-of-Use-dac5e29234f542b48e826ed54c10f8fe",
    });
  };

  const initiatePurchase = async (plan: PurchasesPackage) => {
    try {
      await makePurchase(plan);
      setPurchaseStatus((p) => p + 1);

      weEventTrack("ProScreen_clickPlan", {
        value: plan.product.price,
        planId: plan.identifier,
        planName: plan.product.title,
      });
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log("error in purchase", error);
    }
  };

  const [purchaseRequested, setPurchaseStatus] = useState<number>(0);
  useEffect(() => {
    if (!loading && res.daysLeft && purchaseRequested) {
      navigation.dispatch(StackActions.pop(2));
    }
  }, [purchaseRequested, loading, res.planIdentifyer]);

  return (
    <>
      <Header
        back={true}
        headerColor="#100F1A"
        tone="dark"
        headerType="transparent"
        optionNode={<HelpBtn />}
      />
      {loading ? <LoadingModal width="w-10" height="h-10" /> : null}
      <View className="flex-1 bg-[#100F1A]">
        <View className="flex-1 ">
          <ImageBackground
            source={{ uri: getAccessBgImg }}
            className="flex-1 w-full  justify-end "
            resizeMode="cover"
            // style={{ aspectRatio: 375 / 833 }}
          >
            <LinearGradient
              colors={[
                "#11101B00",

                "#171625E0",
                "#171625E0",
                "#171625E0",
                "#171624",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ height: height > 700 ? height * 0.58 : height * 0.62 }}
            >
              <ScrollView className="">
                <Text
                  className="text-[#FFFFFF] text-xl px-4"
                  style={{
                    fontFamily: "BaiJamjuree-Bold",
                    paddingTop: width * 0.16,
                  }}
                >
                  Choose Your Plan
                </Text>
                <View className="flex flex-row justify-between py-2 px-4">
                  {packages.slice(0, 3).map((plan, index) => {
                    const planDetails = planContent[index]
                      ? planContent[index]
                      : planContent[0];
                    const duration = getDurationString(
                      plan.packageType,
                      plan.identifier
                    );

                    return (
                      <ProPlanCardInApp
                        // active={index === 0}
                        active={res.planIdentifyer === plan.product.identifier}
                        onPress={async () => {
                          await initiatePurchase(plan);
                        }}
                        plan={planDetails}
                        key={plan.identifier}
                        price={plan.product.price}
                        duration={duration}
                        currency={plan.product.currencyCode}
                      />
                      //
                    );
                  })}
                </View>
                <Text className="font-sans p-4 font-light text-xs text-[#FFFFFF99]">
                  SocialBoat provides custom nutrition, workout and health coach
                  services to all subscription providers. You can reach out to
                  us anytime if you have any questions or would like to
                  change/upgrade your plan or workout style. Any feedback is
                  welcome and will help us achieve our mission of making 100M+
                  women fit around the world
                </Text>
                <View className="flex flex-row items-center justify-center">
                  <TouchableOpacity onPress={onTerms}>
                    <Text className="font-sans underline text-center px-2 font-light text-xs text-[#FFFFFF99]">
                      Terms and conditions
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={onPrivacyPolicy}>
                    <Text className="font-sans underline text-center px-2 font-light text-xs text-[#FFFFFF99]">
                      Privacy Policy
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </LinearGradient>
          </ImageBackground>
        </View>
      </View>
    </>
  );
};

export default GetAccessMainInApp;
