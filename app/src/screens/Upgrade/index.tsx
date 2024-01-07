import { Linking, View } from "react-native";
// import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import ProMain from "@modules/ProScreenMain/ProMain";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import TalkToUsPopup from "@modules/ProScreenMain/TalkToUsPopup";
// import { weEventTrack } from "@utils/analytics/webengage/userLog";
import Loading from "@components/loading/Loading";
import ProMainV3 from "@modules/ProScreenMain/ProMainV3";
import {
  InteractionProvider,
  useInteractionContext,
} from "@providers/InteractionProvider/InteractionProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { waBaseLink } from "@constants/links";

import ProMainInApp from "@modules/ProScreenMain/ProMainInApp";
import { PAYMENTS_BY } from "@constants/gameStats";

const UpgradeScreenComponent = () => {
  // const tabBarHeight = useBottomTabBarHeight();

  const { subStatus, sbplan } = useSubscriptionContext();

  const { interactionStatus } = useInteractionContext();

  // const { cancelPopup, visible, hidePopup } = usePopup(
  //   10000,
  //   subStatus === "SUBSCRIBED"
  // );
  const { bottom } = useSafeAreaInsets();

  // const hidePopupWithEvent = () => {
  //   // hidePopup();
  //   weEventTrack("upgrade_clickCancelPopup", {});
  // };
  const onHelp = () => {
    weEventTrack("pay_askHelp", {});
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI need help with paid plans")}`
    );
  };

  return subStatus === "PENDING" || !interactionStatus ? (
    <View className="flex-1 flex justify-center items-center">
      <Loading />
    </View>
  ) : subStatus !== "SUBSCRIBED" && PAYMENTS_BY === "RAZORPAY" ? (
    <>
      <ProMain
        noBack={false}
        rightText=""
        topRightOnClick={onHelp}
        paddingBottom={bottom || 16}
        iPlanType="pro"
      />
    </>
  ) : subStatus !== "SUBSCRIBED" ? (
    <>
      <ProMainInApp
        noBack={false}
        btn1={false}
        rightText="Ask Help"
        topRightOnClick={onHelp}
        paddingBottom={bottom || 16}
      />
    </>
  ) : (
    <>
      {sbplan?.planType === "pro" ? (
        <ProMainV3 />
      ) : (
        <ProMainV3
          containerStyleTwGoldShield="bg-[#E769D3]/40"
          isProPlus={true}
        />
      )}
    </>

    // <SubscribedMain paddingBottom={tabBarHeight} />
  );
};

const UpgradeScreen = () => {
  //   const navigation = useNavigation();
  //   const { top } = useSafeAreaInsets();

  //   const onClickChangeBodyType = () => {
  //     weEventTrack("home_clickTodayTarget", {});
  //     navigation.navigate("ChangeBodyTypeScreen");
  //   };

  return (
    <>
      <View className="flex-1 w-full bg-[#13121E] ">
        <InteractionProvider>
          <UpgradeScreenComponent />
        </InteractionProvider>
      </View>
    </>
  );
};

export default UpgradeScreen;
