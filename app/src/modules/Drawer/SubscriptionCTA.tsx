// import SubscriptionModal from "@modules/Subscription/SubscriptionModal";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";

const SubscriptionCTA = () => {
  const navigation = useNavigation();

  // const isFocussed = useIsFocused();

  const drawerStatus = useDrawerStatus();
  const { res, setRefresh } = useSubscriptionContext();

  useEffect(() => {
    if (drawerStatus === "open") {
      setRefresh((p) => p + 1);
    }
  }, [drawerStatus]);

  // const [subVisible, onToggleModal] = useState<boolean>(false);

  // const onShowModal = () => {
  //   navigation.navigate("ProScreen");
  //   weEventTrack("drawer_clickOnSubscribe", {});
  // };

  // const onClickMyPlan = () => {
  //   navigation.navigate("MyCurrentPlan");
  //   weEventTrack("clickMySubscription", {});
  // };

  const onProClick = () => {
    if (res.currentStatus === "SUBSCRIBED") {
      weEventTrack("home_proClick", {});
      navigation.navigate("UpgradeScreen");
    } else {
      weEventTrack("home_subscribeClick", {});
      navigation.navigate("ProScreen", { planType: "pro" });
    }
  };
  // const onCloseModal = () => onToggleModal(false);

  return (
    <>
      {res.currentStatus === "PENDING" ? null : (
        <TouchableOpacity
          // onPress={() =>
          //   res.currentStatus === "SUBSCRIBED" ? onClickMyPlan() : onShowModal()
          // }
          onPress={onProClick}
        >
          <LinearGradient
            colors={
              res.currentStatus === "SUBSCRIBED"
                ? ["#E0C068", "#92762C"]
                : ["#FF556C", "#FF556C"]
            }
            className=" my-2.5 iphoneX:my-4 p-2.5 iphoneX:p-4 flex justify-center items-center"
          >
            <Text className="text-sm iphoneX:text-base text-white font-medium">
              {res.currentStatus === "SUBSCRIBED"
                ? "My Subscription plan"
                : "Subscribe Now!"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      {/* <SubscriptionModal isOpen={subVisible} onCloseModal={onCloseModal} /> */}
    </>
  );
};

export default SubscriptionCTA;
