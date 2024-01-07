import Header from "@modules/Header";
import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";
import { bonusListCard, listCardV3 } from "./utils";
import { proBgImg, proIconWithProText } from "@constants/imageKitURL";
import { waBaseLink } from "@constants/links";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import LoadingModal from "@components/loading/LoadingModal";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { format } from "date-fns";
import BodtTypeShocase from "@modules/SubscribedMain/BodtTypeShocase";
import FeatureListCardV2 from "./FeatureListCardV2";
import clsx from "clsx";
import Congrats from "./Congrats";
import Svg, { Path } from "react-native-svg";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  noBack?: boolean;
  btn1?: boolean;
  paddingBottom?: number;
  cancelPopup?: () => void;
}

const ProMainV2: React.FC<Props> = ({ noBack, paddingBottom, btn1 }) => {
  const openWhatsApp = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI("Hi!\nI want to start my free consultation")}`
    );

    weEventTrack("ProScreen_clickBookConsultation", {});
  };

  const { res, loading } = useSubscriptionContext();

  const { badgeId, nutritionBadgeId, onboardingCallStatus } = useUserStore(
    ({ user }) => {
      return {
        badgeId: user?.badgeId,
        nutritionBadgeId: user?.nutritionBadgeId,
        onboardingCallStatus: user?.onboardingCallStatus,
      };
    },
    shallow
  );

  return (
    <View className=" flex-1 bg-[#232136]">
      <Header back={noBack ? false : true} headerColor="#232136" tone="dark" />
      {loading ? <LoadingModal width="w-10" height="h-10" /> : null}
      <ScrollView className="flex-1 ">
        <View className="m-4 ">
          <BodtTypeShocase
            aspectRatio={1.22}
            textBGColor="#FFFFFF26"
            textColor="#FFFFFF"
            textPosition={{ x: 0, y: 0 }}
            roundedStr="rounded-3xl"
            bgImg={proBgImg}
          />
        </View>
        {res.msLeft !== -1 ? (
          <Congrats
            mainText="Congratulations!"
            validity={
              res.msLeft !== -1
                ? ` ${format(Date.now() + res.msLeft, "do LLLL yyyy")}`
                : "-"
            }
            proIcon={proIconWithProText}
            subText={
              "Your Pro year plan is now ready. Welcome aboard to SocialBoat!"
            }
          />
        ) : null}
        <View className="bg-[#343150]  m-4 rounded-3xl flex-1">
          <View className="">
            <Text
              className="text-sm iphoneX:text-base py-4 pl-5 text-white"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              What I will get
            </Text>
            <View className={clsx(" w-full bg-[#FFFFFF36] ", "mb-4 h-px")} />
          </View>
          {listCardV3.map((plan, index) => (
            <FeatureListCardV2
              heading={plan.heading}
              iconImg={plan.iconUri}
              mainText={plan.mainText || ""}
              key={`${plan.heading}-${index}`}
              highlightFirstItem={
                index === 0 && onboardingCallStatus !== "DONE"
              }
              showNoTick={
                (index === 1 && !badgeId) || (index === 2 && !nutritionBadgeId)
              }
            />
          ))}
          {onboardingCallStatus === "DONE" ? (
            <TouchableOpacity
              onPress={openWhatsApp}
              className="bg-[#6D55D1] flex flex-row items-center justify-between m-4 mt-0 py-3 px-4 rounded-xl flex-1"
            >
              <Text
                className="text-white text-xs flex-1"
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                Not Liking your current Diet or workout plan? Schedule a call to
                customise it
              </Text>
              <View className="w-5  h-8 ">
                {/* <SvgIcons iconType="rightArrow" /> */}
                <Svg className="w-full h-full" viewBox="0 0 16 14" fill="none">
                  <Path
                    d="M15.53 8.53a.75.75 0 000-1.06L10.757 2.7a.75.75 0 10-1.06 1.06L13.938 7l-4.242 4.243a.75.75 0 001.06 1.06l4.773-4.773zM2 8.25h12v-1.5H2v1.5z"
                    fill={"#fff"}
                  />
                </Svg>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
        <View className="bg-[#343150]  m-4 mt-0 rounded-3xl flex-1">
          <View className="">
            <Text
              className="text-sm iphoneX:text-base py-4 pl-5 text-white"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Bonus Access
            </Text>
            <View className={clsx(" w-full bg-[#FFFFFF36] ", " h-px")} />
          </View>
          {bonusListCard.map((plan, index) => (
            <FeatureListCardV2
              heading={plan.mainText}
              iconImg={plan.iconUri}
              // mainText={plan.mainText || ""}
              key={`${plan.heading}-${index}`}
              headingColor="text-[#FFFFFFB2]"
            />
          ))}
        </View>
        {btn1 ? (
          <View className="p-4">
            <StartButton
              title="Questions? Ask Coach"
              bgColor="bg-[#6D55D1]"
              textColor="text-white "
              roundedStr="rounded-2xl"
              textStyle="py-4 text-center text-sm iphoneX:text-base "
              fontFamily="Nunito-Bold"
              onPress={openWhatsApp}
            />
          </View>
        ) : null}
        <View
          className="mt-10 "
          style={{ height: (paddingBottom ? paddingBottom : 0) * 2 }}
        />
      </ScrollView>

      {btn1 ? null : (
        <View className="p-4">
          <StartButton
            title="Questions? Ask Coach"
            bgColor="bg-[#6D55D1]"
            textColor="text-white "
            roundedStr="rounded-2xl"
            textStyle="py-4 text-center text-sm iphoneX:text-base "
            fontFamily="Nunito-Bold"
            onPress={openWhatsApp}
          />
        </View>
      )}
    </View>
  );
};

export default ProMainV2;
