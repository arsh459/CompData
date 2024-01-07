import { backIconCurrentSubscription } from "@constants/imageKitURL";
import { waBaseLink } from "@constants/links";
// import { AppSubscription } from "@models/AppSubscription/AppSubscription";
import Header from "@modules/Header";
// import SubscriptionModal from "@modules/Subscription/SubscriptionModal";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";
// import { useState } from "react";
// import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, View, Linking } from "react-native";
import ButtonPlan from "./ButtonPlan";
import CurrentPlanContainer from "./CurrentPlanContainer";
import Description from "./Description";
import SubButton from "./SubButton";
import TopPlanDetail from "./TopPlanDetail";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
const CurrentPlan = () => {
  //setup subscription context  that gives daysleft currentStatus and appPlan and onSubscribe

  const { res, subStatus } = useSubscriptionContext();
  // const navigation = useNavigation();

  // const [modalState, toggleModal] = useState<boolean>(false);

  // const onOpenModal = () => toggleModal(true);
  // const onCloseModal = () => toggleModal(false);

  // bought in app
  // res.purchaserInformation?.activeSubscriptions.length

  // const { daysLeft, currentStatus } = {
  //   daysLeft: 5,
  //   currentStatus: "SUBSCRIBED",
  // };
  // const appPlan = {
  //   id: "Dolo12",
  //   razorpayId: "Quia error nostrum dolorem.",
  //   cost: res.appPlan?.cost,
  //   currency: res.appPlan?.currency,
  //   duration: "Monthly",
  //   freeTrialDuration: res.daysLeft,
  //   // moneyBackDuration: 8,
  //   gameAcess: ["low_tier"],
  //   name: res.appPlan?.name,
  // };
  const navigation = useNavigation();
  const onOpenModal = () => {
    weEventTrack("click_pro", {});
    navigation.navigate("ProScreen", { planType: "pro" });
  };

  return (
    <>
      <Header
        back={true}
        title="My Subscription Plan"
        headerColor="#100F1A"
        tone="dark"
        headerType="overlay"
      />
      {/* <SubscriptionModal isOpen={modalState} onCloseModal={onCloseModal} /> */}
      <CurrentPlanContainer
        headerText={"My Subscription Plan"}
        headerBackIcon={backIconCurrentSubscription}
        showHelp={true}
      >
        <ScrollView className="flex-1 bg-[#100F1A]" bounces={false}>
          {subStatus === "SUBSCRIBED" ? (
            <>
              <View className=" p-4 border-t border-b border-[#F5F5F7] ">
                <TopPlanDetail
                  daysLeft={res.daysLeft}
                  text={res.planName}
                  leftText={true}
                />
              </View>
              <View className="px-4 py-6 flex-1">
                <Description
                  description={res.planDescription}
                  // cost={res.appPlan?.cost}
                  // currency={res.appPlan?.currency}
                />
              </View>

              <View className="flex m-4 flex-col justify-around flex-1">
                <Pressable onPress={onOpenModal}>
                  <ButtonPlan color={"#F5F5F7"} text={"View all plans"} />
                </Pressable>
                <Pressable
                  onPress={() => {
                    weEventTrack("click_wa", {});
                    Linking.openURL(
                      `${waBaseLink}${encodeURI(
                        "Hi!\nI need some help with my plan"
                      )}`
                    );
                  }}
                >
                  <ButtonPlan color={"#FF93A1"} text={"Request Assistance"} />
                </Pressable>
              </View>
            </>
          ) : (
            <SubButton onSubscribe={onOpenModal} />
          )}
        </ScrollView>
      </CurrentPlanContainer>
    </>
  );
};
export default CurrentPlan;
