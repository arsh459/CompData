import PeriodOnboardWrapper from "../PeriodOnboardWrapper";
import { savePeriodTrackerObj } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "@providers/user/UserProvider";
import { useState } from "react";
import { flowTypes } from "@models/User/User";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import ImageWithURL from "@components/ImageWithURL";
import { Text, TouchableOpacity, View } from "react-native";
import SvgIcons from "@components/SvgIcons";

const icons: { [key: string]: string } = {
  Light:
    "https://ik.imagekit.io/socialboat/Frame_1763_UPL4UFQdE.png?updatedAt=1686314314701",
  Medium:
    "https://ik.imagekit.io/socialboat/Frame_1764_z6Y9G2L2x.png?updatedAt=1686314314324",
  Heavy:
    "https://ik.imagekit.io/socialboat/Group_1763_nMrXUjm-SI.png?updatedAt=1686314314195",
};

interface Props {
  isGoback?: boolean;
}

const YourFlow: React.FC<Props> = ({ isGoback }) => {
  const { user } = useUserContext();
  const { navigate } = useNavigation();
  const [flow, setFlow] = useState<flowTypes | undefined>(
    user?.periodTrackerObj?.initialFlow
  );

  const handleNext = async () => {
    weEventTrack("periodflow_clickSet", {});

    if (user?.periodTrackerObj?.initialFlow !== flow) {
      await savePeriodTrackerObj(
        { ...user?.periodTrackerObj, initialFlow: flow },
        user?.uid
      );
    }
    isGoback
      ? navigate("PeriodOnboardSettingScreen")
      : navigate("AddCurrentCycleLength");
  };

  return (
    <PeriodOnboardWrapper
      title={`How would you characterise your flow?`}
      onNext={flow ? handleNext : undefined}
      progress={1 / 3}
      nextBtnText={isGoback ? "Save" : "Next"}
    >
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Group_1782_DpmsCcS8F.png?updatedAt=1686314301465",
        }}
        className="w-3/4 mx-auto aspect-[300/220]"
        resizeMode="contain"
      />
      <View className="p-4 gap-4">
        {(["light", "medium", "heavy"] as flowTypes[]).map((each, index) => (
          <TouchableOpacity
            key={each}
            onPress={() => setFlow(each)}
            className="rounded-2xl flex flex-row justify-center items-center py-3"
            style={{ backgroundColor: flow === each ? "#FFFFFF" : "#343150" }}
          >
            <ImageWithURL
              source={{ uri: icons[each] }}
              className="w-5 aspect-square"
              resizeMode="contain"
            />
            <Text
              className="text-lg text-center ml-2"
              style={{
                fontFamily: "Nunito-Medium",
                color: flow === each ? "#2F2F2F" : "#FFFFFF",
              }}
            >
              {`${each} Flow`}
            </Text>
            {flow === each ? (
              <View className="absolute top-0 bottom-0 right-4 flex justify-center items-center">
                <View className="h-2/5 aspect-square bg-[#FF6069] rounded-full p-1">
                  <SvgIcons iconType="tickCheck" color={"#FFF"} />
                </View>
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    </PeriodOnboardWrapper>
  );
};

export default YourFlow;
