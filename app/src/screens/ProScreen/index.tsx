import ProMain from "@modules/ProScreenMain/ProMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { Linking } from "react-native";
import { waBaseLink } from "@constants/links";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import ProMainInApp from "@modules/ProScreenMain/ProMainInApp";
import { PAYMENTS_BY } from "@constants/gameStats";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PlanTypes } from "@models/AppSubscription/AppSubscription";

export interface ProParams {
  planType?: PlanTypes;
}

const ProScreen = () => {
  useScreenTrack();

  const route = useRoute();
  const params = route.params as ProParams;
  const navigation = useNavigation();

  const topRightOnClick = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI need some help with paid plans.")}`
    );
    weEventTrack("ProScreen_clickBookConsultation", {});
  };

  const onBookSlot = () => {
    navigation.navigate("BookZohoSlot", {
      category: "sales",
      nextScreen: "SlotConfirmation",
      nextScreenDoneNav: "HOME",
    });
    weEventTrack("slot_request", { source: "proInApp" });
    weEventTrack("ProScreen_bookZohoSlot", { category: "sales" });
  };

  if (PAYMENTS_BY === "RAZORPAY") {
    return (
      <ProMain
        paddingBottom={20}
        topRightOnClick={topRightOnClick}
        rightText=""
        iPlanType={params?.planType ? params.planType : "pro"}
        onBookSlot={onBookSlot}
      />
    );
  } else {
    return (
      <ProMainInApp
        btn1={false}
        paddingBottom={20}
        topRightOnClick={topRightOnClick}
        rightText="Ask Help"
        onBookSlot={onBookSlot}
      />
    );
  }
};

export default ProScreen;
