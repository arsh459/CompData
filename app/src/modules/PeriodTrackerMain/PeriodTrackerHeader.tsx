import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";
import { infoBtnRing } from "@constants/imageKitURL";
import Header from "@modules/Header";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, Text, TouchableOpacity } from "react-native";
import { useOnboardContext } from "./PeriodGuidedOnboard/OnboardProvider";
import { useState } from "react";
import InfoModal from "./InfoModal";

const PeriodTrackerHeader = () => {
  const { infoBtn } = useOnboardContext();
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  return (
    <>
      <Header
        titleNode={
          <View className="flex flex-row items-center">
            <View className="w-5 iphoneX:w-6 aspect-square bg-[#FF6069] rounded-full p-1">
              <SvgIcons iconType="period" color="#FFFFFF" />
            </View>
            <Text
              className="text-2xl pl-2.5 text-white"
              style={{
                fontFamily: "Nunito-Bold",
              }}
            >
              Period Tracker
            </Text>
          </View>
        }
        optionNode={
          <TouchableOpacity
            onPress={() => {
              setShowInfoModal(true);
              weEventTrack("period_clickIButton", {});
            }}
          >
            <View collapsable={false} ref={infoBtn}>
              <ImageWithURL
                source={{ uri: infoBtnRing }}
                className="w-5 aspect-square"
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        }
        headerColor="#343150"
        tone="dark"
      />
      <InfoModal
        visible={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </>
  );
};

export default PeriodTrackerHeader;
