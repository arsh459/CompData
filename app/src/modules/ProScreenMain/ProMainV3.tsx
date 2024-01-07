// import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import Header from "@modules/Header";
import {
  View,
  //   useWindowDimensions,
  ScrollView,
  Linking,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { waBaseLink } from "@constants/links";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import LoadingModal from "@components/loading/LoadingModal";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import GoldenShieldCard from "./GoldenShieldCard";
import FetauresWillGet from "./V3/FetauresWillGet";
import BonusAccess from "./V3/BonusAccess";
import ReviewLists from "./V3/ReviewLists";
import FaqProList from "./V3/FaqProList";

interface Props {
  noBack?: boolean;
  paddingBottom?: number;
  cancelPopup?: () => void;
  containerStyleTwGoldShield?: string;
  isProPlus?: boolean;
}

const ProMainV3: React.FC<Props> = ({
  noBack,
  paddingBottom,
  containerStyleTwGoldShield,
  isProPlus,
}) => {
  //   const { testimonials } = useTestimonials(14);
  //   const { width } = useWindowDimensions();
  // const navigation = useNavigation();
  // const { user } = useUserContext();
  const openWhatsApp = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to start my free consultation")}`
    );

    weEventTrack("ProScreen_clickBookConsultation", {});
  };

  const { loading } = useSubscriptionContext();

  return (
    <View className=" flex-1 bg-[#232136]">
      <Header back={noBack ? false : true} headerColor="#232136" tone="dark" />
      {loading ? <LoadingModal width="w-10" height="h-10" /> : null}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 ">
        <GoldenShieldCard
          containerStyleTw={containerStyleTwGoldShield}
          isProPlus={isProPlus}
        />
        <FetauresWillGet />
        <BonusAccess />
        <ReviewLists />
        <View className="px-2 py-4">
          <FaqProList />
        </View>

        <View className="bg-[#6D55D180] p-1.5 rounded-2xl m-4 mt-10">
          <StartButton
            title="Have Questions? Get Help"
            bgColor="bg-[#6D55D1]"
            textColor="text-white "
            roundedStr="rounded-2xl"
            textStyle="py-4 text-center text-sm iphoneX:text-base "
            fontFamily="Nunito-Bold"
            onPress={openWhatsApp}
          />
        </View>
        <View
          className=" "
          style={{ height: paddingBottom ? paddingBottom : 0 }}
        />
      </ScrollView>
    </View>
  );
};

export default ProMainV3;
