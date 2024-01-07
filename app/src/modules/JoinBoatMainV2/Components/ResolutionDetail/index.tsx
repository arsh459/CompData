import GradientText from "@components/GradientText";
import { BodyTypeData } from "@constants/Avatar/BodyTypeData";
import { getEvolutionFitpoints } from "@constants/Avatar/utils";
import { customBodyScanIcon, customWorkoutIcon } from "@constants/imageKitURL";
import { LocalUser } from "@hooks/user/useLocalUserV2";
import { View, Image, Text, ScrollView } from "react-native";
import TransformationView from "./TransformationView";

interface Props {
  localUser: LocalUser | undefined;
}

const ResolutionDetail: React.FC<Props> = ({ localUser }) => {
  return (
    <ScrollView
      className="flex-1 p-4"
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <GradientText
        text={`${
          localUser?.name ? localUser.name : "User"
        }, your resolution for 2023 should be`}
        colors={["#48FFDE", "#48AFFF", "#9E71FF"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        textStyle={{
          fontFamily: "BaiJamjuree-SemiBold",
          fontSize: 22,
        }}
      />

      <TransformationView user={localUser}>
        <View className="flex flex-row justify-between items-center bg-[#2B2B3A] rounded-2xl overflow-hidden p-5">
          <Text
            className="text-[#F1F1F1] text-sm w-3/5"
            style={{
              fontFamily: "BaiJamjuree-Regular",
            }}
          >
            Your daily target FitPoints
          </Text>
          <Text
            className="text-white text-center text-xl w-1/3"
            style={{
              fontFamily: "BaiJamjuree-Bold",
            }}
          >
            {`${
              localUser?.difficulty
                ? getEvolutionFitpoints(localUser.difficulty)
                : 0
            }FP`}
          </Text>
        </View>
      </TransformationView>

      <View className="px-2 py-5">
        <Text
          className="text-[#F1F1F1] text-lg flex-1 px-1 mb-6"
          style={{
            fontFamily: "BaiJamjuree-Bold",
          }}
        >
          How to achieve goal
        </Text>

        {localUser?.desiredBodyType &&
        BodyTypeData[localUser.desiredBodyType].workoutNote ? (
          <View className="flex flex-row justify-between items-center mb-6">
            <Image
              source={{ uri: customBodyScanIcon }}
              className="w-1/5 mr-4 aspect-square"
              resizeMode="contain"
            />
            <Text
              className="text-[#F1F1F1] text-sm flex-1"
              style={{
                fontFamily: "BaiJamjuree-Regular",
              }}
            >
              {BodyTypeData[localUser.desiredBodyType].workoutNote}
            </Text>
          </View>
        ) : null}

        <View className="flex flex-row justify-between items-center mb-6">
          <Image
            source={{ uri: customWorkoutIcon }}
            className="w-1/5 mr-4 aspect-square"
            resizeMode="contain"
          />
          <Text
            className="text-[#F1F1F1] text-sm w-4/5"
            style={{
              fontFamily: "BaiJamjuree-Regular",
            }}
          >
            Try finishing the daily FP target by tracking steps, following our
            workout programs and diet plans.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ResolutionDetail;
