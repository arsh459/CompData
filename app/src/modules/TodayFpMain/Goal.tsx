import ConfirmationModalV2 from "@components/ConfirmationModal/V2";
import ImageWithURL from "@components/ImageWithURL";
import { icons } from "@modules/JoinBoatMainV3/components/AchievementPath/utils/constants";
import CTAButton from "@modules/PeriodTrackerMain/MiddleCircleComponents/CTAButton";
import { useRoadmapUpdateStore } from "@providers/progress/roadmapUpdateStore";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { shallow } from "zustand/shallow";

const Goal = () => {
  const { user } = useUserContext();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigation = useNavigation();

  const setUpdate = useRoadmapUpdateStore((state) => state.setUpdate, shallow);

  const onEdit = () => {
    weEventTrack("editGoalHome_yes", {});
    navigation.navigate("JoinBoat", { section: "fitnessGoal" });
    setUpdate(true);
  };

  const onViewAll = () => {
    navigation.navigate("JoinBoat", {
      section: "achievementPath",
      backOnDone: true,
    });
  };

  return user?.thingsToWorkOn?.length ? (
    <View className="bg-[#F3E8FF] rounded-2xl">
      <View className="flex flex-row justify-between items-center p-4 border-b border-black/10 mb-4">
        <Text
          className="text-[#232136] text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          🎯 My Goal
        </Text>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          className="flex flex-row justify-between items-center"
        >
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_ZRU1Hj496.png?updatedAt=1686130057233",
            }}
            className="w-3 aspect-square mr-1"
            resizeMode="contain"
          />
          <Text
            className="text-[#FF6069] text-xs"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            Reset Goal
          </Text>
        </TouchableOpacity>
      </View>

      {user.thingsToWorkOn.map((item) => (
        <View
          key={item.text}
          className="flex flex-row justify-between items-center px-4 border-b border-black/10 pb-4"
        >
          <Text
            className="text-[#232136] capitalize text-sm iphoneX:text-base"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {item.text}
          </Text>
          <ImageWithURL
            source={{ uri: icons[item.type] }}
            className="w-8 iphoneX:w-10 aspect-square ml-3"
          />
        </View>
      ))}

      <CTAButton
        cta="View Roadmap"
        onPress={onViewAll}
        ctaTextColor="#FFFFFF"
        ctaClassStr="rounded-xl p-4 m-4"
        ctaTextClassStr="text-sm text-center"
        ctaColor="#6D55D1"
      />

      <ConfirmationModalV2
        visible={showModal}
        text="Are you sure you want to edit your goal. By doing this your badges and goals will be reset."
        onNext={onEdit}
        onClose={() => {
          setShowModal(false);
          weEventTrack("editGoal_no", {});
        }}
      />
    </View>
  ) : null;
};

export default Goal;
