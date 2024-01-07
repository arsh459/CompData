import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import WarnBoxModal from "@modules/HomeScreen/MyProgress/WarnBoxModal";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import NonBodyTypeShowcase from "@modules/SubscribedMain/NonBodyTypeShowcase";
import BodtTypeShocase from "@modules/SubscribedMain/BodtTypeShocase";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { getFitnessGoal } from "@modules/SubscribedMain/utils";

interface Props {
  currentBody?: string;
  desiredBody?: string;
}

const EditGoal: React.FC<Props> = ({ currentBody, desiredBody }) => {
  const navigation = useNavigation();
  const [showWarning, toggleWarning] = useState<boolean>(false);

  const goal = useUserStore(
    ({ user }) => getFitnessGoal(user?.fitnessGoal),
    shallow
  );

  const rightModalClick = async () => {
    setTimeout(() => toggleWarning(false), 500);
    navigation.navigate("JoinBoat", { section: "currentBodyType" });

    weEventTrack("todayFitpoint_editGoal", {});
  };

  const onEditGoalRequest = () => {
    toggleWarning(true);
    weEventTrack("todayFitpoint_editGoalRequest", {});
  };

  const onClose = () => {
    toggleWarning(false);
  };

  return (
    <View className="relative ">
      <Image
        source={{
          uri: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_1100__2__k355u_IYS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675927384593",
        }}
        className={clsx(
          "aspect-[375/345]",
          goal === "lose_weight" && "rounded-b-3xl"
        )}
      />
      <View className="absolute left-0 right-0 top-0 bottom-0 flex flex-row justify-evenly items-end">
        {goal !== "lose_weight" ? (
          <View className="p-4">
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,fo-auto/Frame_1100__1__Sg7DAUSDS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675927381862",
              }}
              className="absolute left-0 right-0 bottom-0 aspect-[375/345]"
            />
            <NonBodyTypeShowcase
              colors={["#867FC140", "#867FC140"]}
              styleStr="border border-white/10"
            />
            <LinearGradient
              colors={["transparent", "black"]}
              className="absolute left-0 right-0 -bottom-1 h-4"
            />
          </View>
        ) : (
          <>
            <BodtTypeShocase
              aspectRatio={1.35}
              textBGColor="#FFFFFF26"
              textColor="#FFFFFF"
              textPosition={{ x: 0, y: 12 }}
              noBg={true}
            />
            <View className="absolute left-0 right-0 bottom-4 flex justify-center items-center">
              <TouchableOpacity
                onPress={onEditGoalRequest}
                className="px-2 py-1.5 rounded-md flex flex-row items-center bg-[#FFFFFF26]"
              >
                <Image
                  source={{
                    uri: "https://ik.imagekit.io/socialboat/tr:w-20,c-maintain_ratio,fo-auto/Vector__56__yOowHeu0D.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673273998290",
                  }}
                  className="w-3 aspect-square"
                />
                <Text
                  className="pl-1 text-xs text-white"
                  style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <WarnBoxModal
        cta1="No"
        cta2="Yes"
        text="Are you sure you want to change the current bodytype?"
        onLeftClick={onClose}
        onRightClick={rightModalClick}
        isOpen={showWarning}
        onClose={onClose}
        colors={["#E433711A", "#E433711A", "#E433711A"]}
      />
    </View>
  );
};

export default EditGoal;
