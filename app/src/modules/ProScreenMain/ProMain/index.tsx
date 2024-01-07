import { useState } from "react";
import Swiper from "@components/Swiper";
import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import Header from "@modules/Header";
import { View, Text, useWindowDimensions, ScrollView } from "react-native";
import TestimonialsComp from "../TestimonialsComp";
import { faqContent } from "../utils";
import FAQComp from "../FAQComp";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import LoadingModal from "@components/loading/LoadingModal";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import OurPlans, { paddingY } from "./OurPlans";
import HelpButton from "../HelpButton";
import ImageWithURL from "@components/ImageWithURL";
import { useSbPlans } from "@hooks/purchases/useSbPlans";
import FreeForeverList from "../FreeForeverList";
import ComparePlanList from "../ComparePlanList";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import LinearGradient from "react-native-linear-gradient";
import { PlanTypes } from "@models/AppSubscription/AppSubscription";
import Policy from "@modules/Auth/PhoneAuth/PhoneInput/Policy";

interface Props {
  noBack?: boolean;
  btn1?: boolean;
  paddingBottom?: number;
  cancelPopup?: () => void;
  rightText?: string;
  noTopRightIcon?: boolean;
  topRightOnClick?: () => void;
  onSlotBook?: (id: string) => void;
  iPlanType: PlanTypes;
  onBookSlot?: () => void;
}

const ProMain: React.FC<Props> = ({
  noBack,
  paddingBottom,
  rightText,
  topRightOnClick,
  iPlanType,
  onBookSlot,
}) => {
  const { testimonials } = useTestimonials(14);
  const { width } = useWindowDimensions();
  const { sbplans: plans } = useSbPlans();

  const { loading } = useSubscriptionContext();
  const [paymentLoading, setLoading] = useState<boolean>(false);
  const [planType, setPlanType] = useState<PlanTypes>(iPlanType);

  const sbplans = plans?.filter((each) => each.planType === planType);

  return (
    <>
      <Header
        back={noBack ? false : true}
        headerColor="#232136"
        tone="dark"
        title={
          rightText
            ? ""
            : iPlanType === "proPlus"
            ? "Upgrade your plan"
            : "Select your plan"
        }
        centerTitle={false}
        headerType="transparent"
        optionNode={
          rightText ? (
            <HelpButton
              onPress={() => {
                weEventTrack("fScanConsultationSlot_clickSkipForNow", {});
                topRightOnClick && topRightOnClick();
              }}
              text={rightText}
            />
          ) : null
        }
      />

      {loading || paymentLoading ? (
        <LoadingModal width="w-10" height="h-10" />
      ) : null}
      <View className="flex-1 bg-[#232136] relative z-0">
        <ImageWithURL
          source={{
            uri: "https://ik.imagekit.io/socialboat/SB%20main%20mob%2057_YEnNKIQtu.png?updatedAt=1691128508275",
          }}
          className="absolute top-0 bottom-0 left-0 right-0"
          resizeMode="cover"
        />
        <ScrollView
          className="flex-1"
          style={{ paddingVertical: paddingY }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {sbplans ? (
            <>
              <OurPlans
                setLoading={setLoading}
                sbplans={sbplans}
                planType={planType}
                iPlanType={iPlanType}
                setPlanType={setPlanType}
              />

              <View className="pt-8">
                <Policy />
              </View>

              <Text className="text-white text-center capitalize font-popM text-2xl pt-20 pb-4">
                Compare plans
              </Text>
              <ComparePlanList sbplans={sbplans} />

              <View className="px-4">
                <Text className="text-white text-center capitalize font-popM text-2xl pt-20 pb-8">
                  Free Forever Offering
                </Text>
                <FreeForeverList />
              </View>
            </>
          ) : null}

          <View className="pt-12 flex-1">
            <Text
              className="text-[#FFFFFF] text-lg p-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Reviews
            </Text>
            <Swiper slideWidth={width / 1.2} spaceBetween={16} marginX={8}>
              {testimonials.map((item) => (
                <TestimonialsComp key={item.id} testimonial={item} />
              ))}
            </Swiper>
          </View>

          <View className="pt-12">
            <Text
              className="text-[#FFFFFF] text-xl px-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              FAQs
            </Text>
            {faqContent.map((faq, index) => (
              <View key={faq.id}>
                {index === 0 ? <View className="my-4" /> : null}
                <FAQComp faq={faq} borderStr="my-4" />
              </View>
            ))}
          </View>
        </ScrollView>

        <View className="h-4" />
        <LinearGradient
          colors={["#23213600", "#232136", "#232136", "#232136"]}
          style={{ paddingBottom }}
          className={
            paddingBottom ? "absolute left-0 right-0 bottom-0 p-4" : "p-4"
          }
        >
          <StartButton
            onPress={onBookSlot}
            bgColor="p-3"
            title="Book FREE Consultation"
            textColor="text-black"
            textStyle="text-center text-base iphoneX:text-lg"
            roundedStr="rounded-2xl bg-white"
            fontFamily="Nunito-Bold"
          />
        </LinearGradient>
      </View>
    </>
  );
};

export default ProMain;
