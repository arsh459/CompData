import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { useRoute } from "@react-navigation/native";
import Loading from "@components/loading/Loading";
import { waBaseLink } from "@constants/links";
// import CongratulationMain from "@modules/Awards/CongratulationMain";
import { useAwardReport } from "@modules/Awards/hook/useAwardReport";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
// import { useUserStore } from "@providers/user/store/useUserStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { View, Text, Linking } from "react-native";
// import { shallow } from "zustand/shallow";
import CongratulationMainV2 from "@modules/Awards/CongratulationsMainV2";

export interface AwardWonParams {
  achivementId: string;
}

const AwardWon = () => {
  const route = useRoute();
  const params = route.params as AwardWonParams | undefined;
  const { awardReport, loading, award } = useAwardReport(params?.achivementId);

  // console.log("awardReport", awardReport);

  const onWAHelp = () => {
    Linking.openURL(
      `${waBaseLink}${encodeURI(
        "Hi!\nI need help with my awards. Unable to see progress"
      )}`
    );

    weEventTrack("awardsHelp_clickTalkCoach", {});
  };

  // const unseenAwards = useUserStore(
  //   (state) => state.user?.unseenAwards,
  //   shallow
  // );
  useScreenTrack();

  // console.log("loading", params?.achivementId, awardReport?.awardStatus);

  return (
    <View className="flex-1 bg-black relative z-0">
      {loading === "FETCHING" ? (
        <View className="flex-1 justify-center items-center">
          <Loading />
        </View>
      ) : loading === "ERROR" ? (
        <View className="flex-1 justify-center items-center">
          <Text
            className="text-2xl text-white"
            style={{ fontFamily: "Nunito-SemiBold" }}
          >
            Award not found.
          </Text>
          <View className="w-1/2 pt-4 px-8">
            <StartButton
              title="Get Help"
              bgColor="bg-[#6D55D1]"
              textColor="text-[#fff] "
              roundedStr="rounded-2xl"
              textStyle="py-3 text-center text-xl"
              onPress={onWAHelp}
              fontFamily="Nunito-Medium"
            />
          </View>
        </View>
      ) : loading === "DONE" ? (
        <>
          {(awardReport?.awardStatus === "WON" ||
            awardReport?.awardStatus === "TARGET") &&
          award ? (
            <CongratulationMainV2
              achiever={awardReport}
              award={award}
              // idArr={
              //   unseenAwards?.length
              //     ? unseenAwards
              //     : params?.achivementId
              //     ? [params.achivementId]
              // : []
              // }
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text
                className="text-2xl text-white"
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                This award has expired
              </Text>
            </View>
          )}
        </>
      ) : null}
    </View>
  );
};

export default AwardWon;
