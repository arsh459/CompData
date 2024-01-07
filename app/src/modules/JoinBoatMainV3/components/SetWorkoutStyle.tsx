import { workoutStyleTypes } from "@models/User/User";
import { useUserStore } from "@providers/user/store/useUserStore";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { shallow } from "zustand/shallow";
import JoinBoatWrapper from "./JoinBoatWrapper";
import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";

export const workoutStylesObject: Partial<
  Record<
    workoutStyleTypes,
    { key: workoutStyleTypes; text: string; img: string; title: string }
  >
> = {
  Yoga: {
    key: "Yoga",
    title: "Self Paced Yoga",
    text: "PCOS course designed by Influencer-teacher Greesha",
    img: "https://ik.imagekit.io/socialboat/Group%201000001361_4lSuTeSkl.png?updatedAt=1699012420755", // "https://ik.imagekit.io/socialboat/Group%201000001147_gO1XMufas.png?updatedAt=1693044485786",
  },
  LiveYoga: {
    key: "LiveYoga",
    title: "Live Yoga Classes",
    text: "PCOS Live yoga classes - 4 days / week by Swati Kain.",
    img: "https://ik.imagekit.io/socialboat/Group%201000001363_5ccFrgJ8v.png?updatedAt=1699012420870", //"https://ik.imagekit.io/socialboat/Group%201000001147_gO1XMufas.png?updatedAt=1693044485786",
  },
  HIIT: {
    key: "HIIT",
    title: "HIIT by Arja Bedi",
    text: "Intense and strength oriented workouts by Arja Bedi",
    img: "https://ik.imagekit.io/socialboat/Group%201000001149_PCEcykGX2.png?updatedAt=1693044485854",
  },
  // Running: {

  //   key: "Running",
  //   text: "Running program by Asics Coach Ravinder",
  //   img: "https://ik.imagekit.io/socialboat/Group%201000001151_H-XJqCq6d.png?updatedAt=1693044485819",
  // },
};

interface Props {
  onWorkoutStyleSave: (val?: workoutStyleTypes) => void;
  nextBtnText: string;
  progress?: number;
}

const SetWorkoutStyle: React.FC<Props> = ({
  onWorkoutStyleSave,
  nextBtnText,
  progress,
}) => {
  const [workoutStyle, onWorkoutStyleUpdate] = useState<workoutStyleTypes>();

  const workoutStyleDB = useUserStore(
    (state) => state.user?.workoutStyle,
    shallow
  );

  useEffect(() => {
    if (workoutStyleDB) {
      onWorkoutStyleUpdate(workoutStyleDB);
    }
  }, [workoutStyleDB]);

  const onWorkoutStyleClick = (newVal: workoutStyleTypes) => {
    onWorkoutStyleUpdate(newVal);
    onWorkoutStyleSave(newVal);
  };

  return (
    <JoinBoatWrapper
      title="What is your preferred workout style?"
      onNext={() => onWorkoutStyleSave(workoutStyle)}
      disabled={!workoutStyle}
      nextBtnText={`${nextBtnText} ${"With " + workoutStyle || ""}`}
      progress={progress}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="flex-1 flex px-8"
      >
        {Object.values(workoutStylesObject).map((each) => (
          <TouchableOpacity
            key={each.key}
            onPress={() => onWorkoutStyleClick(each.key)}
            className="relative z-0 my-4"
          >
            <ImageWithURL
              className="w-full aspect-[305/320]"
              source={{ uri: each.img }}
              resizeMode="contain"
            />

            <View className="absolute left-0 right-0 top-0 p-8">
              <Text
                className="text-[#343150] text-base iphoneX:text-lg"
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                {each.title}
              </Text>
              <View className="w-2 aspect-square" />
              <Text
                className="text-[#343150] text-sm iphoneX:text-base"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                {each.text}
              </Text>
            </View>

            {workoutStyle === each.key ? (
              <View className="absolute -top-2 -right-0 w-8 aspect-square bg-[#8F75FF] rounded-full">
                <SvgIcons iconType="tick" color="#FFFFFF" />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </JoinBoatWrapper>
  );
};

export default SetWorkoutStyle;
