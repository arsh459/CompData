import { useEffect, useState } from "react";
import Swiper from "@components/Swiper";
import { useTestimonials } from "@hooks/testimonials/useTestimonial";
import Header from "@modules/Header";
import { ResizeMode, Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TestimonialsComp from "./TestimonialsComp";
import { faqContent, listCardV2 } from "./utils";
import FeatureListCard from "./FeatureListCard";
import FAQComp from "./FAQComp";
import { useNavigation } from "@react-navigation/native";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import LoadingModal from "@components/loading/LoadingModal";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import ProCta from "./ProCta";
import ImageWithURL from "@components/ImageWithURL";
import BonusAccess from "./V3/BonusAccess";
import OurPlansInApp from "./OurPlansInApp";

interface Props {
  noBack?: boolean;
  btn1?: boolean;
  paddingBottom?: number;
  cancelPopup?: () => void;
  rightText?: string;
  noTopRightIcon?: boolean;
  topRightOnClick?: () => void;
  onSlotBook?: (id: string) => void;
  onBookSlot?: () => void;
}

const ProMainInApp: React.FC<Props> = ({
  noBack,
  paddingBottom,
  btn1,
  cancelPopup,
  rightText,
  topRightOnClick,
  onBookSlot,
}) => {
  const { testimonials } = useTestimonials(14);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const onClickGetAccess = () => {
    cancelPopup && cancelPopup();
    navigation.navigate("GetAccessScreen");
    weEventTrack("ProScreen_clickGetAccess", {});
  };

  const { res, loading } = useSubscriptionContext();

  const [purchaseRequested, setPurchaseStatus] = useState<number>(0);
  useEffect(() => {
    if (!loading && res.daysLeft && purchaseRequested) {
      // navigation.goBack();
      navigation.navigate("WelcomePro");
    }
  }, [purchaseRequested, loading, res.planIdentifyer]);

  return (
    <>
      <Header
        back={noBack ? false : true}
        headerColor="#232136"
        tone="dark"
        headerType="transparent"
        optionNode={
          <TouchableOpacity
            onPress={() => {
              weEventTrack("fScanConsultationSlot_clickSkipForNow", {});
              topRightOnClick && topRightOnClick();
            }}
            className="flex flex-row items-center rounded-full bg-white backdrop-blur-3xl px-4 py-1"
          >
            <Text className="text-[#1C1C1C] text-sm font-medium">
              {rightText}
            </Text>
            <ImageWithURL
              source={{
                uri: "https://ik.imagekit.io/socialboat/Arrow_137_MJE_BtTvd.png?updatedAt=1686137643237",
              }}
              className="w-3 aspect-1 ml-1"
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      />

      {loading ? <LoadingModal width="w-10" height="h-10" /> : null}

      <View className="flex-1 bg-[#232136]">
        <ScrollView className="" bounces={false}>
          <View className="relative ">
            <Video
              source={{
                uri: "https://d2cjy81ufi4f1m.cloudfront.net/videoo.MP4",
              }}
              style={{
                aspectRatio: 375 / 352,
              }}
              isMuted={true}
              isLooping={true}
              shouldPlay={true}
              resizeMode={"cover" as ResizeMode}
            />

            <LinearGradient
              colors={["transparent", "#232136"]}
              className="absolute left-0 right-0 bottom-0 p-4"
            >
              <OurPlansInApp
                purchaseRequested={purchaseRequested}
                setPurchaseStatus={setPurchaseStatus}
              />
            </LinearGradient>
          </View>

          <View className="px-4">
            <Text
              className="text-[#FFFFFF] text-lg py-4"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              What I will get
            </Text>
            {listCardV2.map((plan, index) => (
              <FeatureListCard
                featureList={plan}
                key={`${plan.heading}-${index}`}
                isLast={index === listCardV2.length - 1}
                borderStr="my-4"
                rounded={true}
              />
            ))}
          </View>

          <View className="pt-8">
            <BonusAccess disabled={true} />
          </View>

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

          <Text
            className="text-[#FFFFFF] text-xl px-4"
            style={{
              fontFamily: "Nunito-Bold",
              paddingTop: width * 0.16,
            }}
          >
            FAQs
          </Text>
          {faqContent.map((faq, index) => (
            <View key={faq.id}>
              {index === 0 ? <View className="my-4" /> : null}
              <FAQComp faq={faq} borderStr="my-4" />
            </View>
          ))}
          <View pointerEvents="none" style={{ opacity: 0 }}>
            <ProCta
              btn1={btn1}
              createCalendlySession={onBookSlot}
              onClickGetAccess={onClickGetAccess}
            />
          </View>
        </ScrollView>

        <ProCta
          btn1={btn1}
          createCalendlySession={onBookSlot}
          onClickGetAccess={onClickGetAccess}
          paddingBottom={paddingBottom}
        />
      </View>
    </>
  );
};

export default ProMainInApp;
