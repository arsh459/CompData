import useQuestCalendar from "@hooks/quest/useQuestCalendar";

import { timimgGap } from "@modules/ChallengesMain/utils";

import { View, Text } from "react-native";
import { shallow } from "zustand/shallow";

const ChallengeStatusComp = () => {
  // const { today } = useAuthContext();

  const { currentDate } = useQuestCalendar(
    (state) => ({
      currentDate: state.active?.unix,
    }),
    shallow
  );

  const startIn = timimgGap(currentDate);
  return (
    <>
      {startIn ? (
        <>
          <View className="flex items-center mt-6">
            <Text
              className=" text-white/70 text-sm"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              Unlocking In{" "}
              <Text
                className="text-[#FFA826] text-sm"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                {startIn}
              </Text>
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default ChallengeStatusComp;
