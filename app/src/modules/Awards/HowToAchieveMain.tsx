import { View, Text, ScrollView } from "react-native";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import TimeComponent from "./TimeComponent";
import { Achiever, Award } from "@models/Awards/interface";
import AwardMedia from "./AwardMedia";
import StreakComp from "./StreakComp";

const now = Date.now();
const paddingTop = 100;

interface Props {
  award?: Award;
  awardReport: Achiever;
}

const HowToAchieveMain: React.FC<Props> = ({ award, awardReport }) => {
  const navigation = useNavigation();

  const noStreak =
    !awardReport.steps ||
    awardReport.steps === -1 ||
    !Object.keys(awardReport.progress || {}).length;

  const isExpired =
    awardReport?.endTime && awardReport.endTime <= now && !awardReport.unlockOn;
  const isUnlocked =
    awardReport?.startTime && awardReport.startTime <= now ? true : false;

  const onLog = () => {
    if (award?.howToAchieveNavigation) {
      // @ts-ignore
      navigation.navigate(award.howToAchieveNavigation, {});
    }

    weEventTrack("howToAchieve_clickLog", {});
  };

  console.log("awardReport", awardReport);

  return (
    <View className="flex-1 bg-black relative z-0">
      <Header back={true} tone="dark" headerType="transparent" />

      <View
        style={{
          flex: 1,
          backgroundColor: `${award?.themeColor || "#000000"}1A`,
        }}
      >
        <ScrollView style={{ paddingTop }} className="">
          <Text
            className="w-3/4 text-center text-white/90 text-xl mx-auto pb-4"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {award?.name}
          </Text>

          <AwardMedia media={award?.img} themeColor={award?.themeColor} />

          <View className="pt-4 px-4">
            <Text
              className="text-2xl text-white text-center"
              style={{
                fontFamily: "Nunito-SemiBold",
                color: award?.themeColor ? award.themeColor : "#fff",
              }}
            >
              {awardReport?.title ? awardReport.title : award?.name}
            </Text>
            {isExpired ? (
              <Text
                className="text-sm text-white/80 text-center pt-2 "
                style={{ fontFamily: "Nunito-Regular" }}
              >
                This award is expired now. You can checkout another award for
                the month
              </Text>
            ) : (
              <Text
                className="text-sm text-white/80 text-center pt-2"
                style={{ fontFamily: "Nunito-Regular" }}
              >
                {awardReport?.subtitle}
              </Text>
            )}
            <View className="pt-2">
              <TimeComponent
                wonOn={awardReport?.unlockOn}
                expiresOn={awardReport?.endTime}
                isExpired={isExpired ? true : false}
                unlockedOn={awardReport?.unlockOn}
                placeholder=""
                isUnlocked={isUnlocked}
              />
            </View>

            {/* {award?.howToAchieve ? (
              <>
                <Text
                  className="w-3/4 text-center text-white/90 text-lg pt-6 mx-auto"
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  How to Achieve
                </Text>
                {award.howToAchieve.map((each) => (
                  <Text
                    key={each}
                    className="text-sm text-white/80 text-center pt-2"
                    style={{ fontFamily: "Nunito-Regular" }}
                  >
                    {each}
                  </Text>
                ))}
              </>
            ) : null} */}

            {!noStreak && award ? (
              <View className="pt-4">
                <StreakComp achiever={awardReport} award={award} />
              </View>
            ) : null}
          </View>
        </ScrollView>

        {award?.howToAchieveNavigation ? (
          <View className="p-4">
            <StartButton
              onPress={onLog}
              bgColor="bg-[#6D55D1]"
              roundedStr="rounded-2xl"
              textStyle="py-3 text-center text-xl  "
              fontFamily="Nunito-Bold"
              textColor="text-[#fff] "
              title="Log update now"
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default HowToAchieveMain;
