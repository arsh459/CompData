import { Platform, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "@modules/Header";
import OnboardLifeStyle from "@modules/LifeStyleMain/OnboardLifeStyle";
import { updateUserField } from "@modules/LifeStyleMain/utils";
import DietFormOptionNode from "@modules/LifeStyleMain/DietFormOptionNode";
import { totalDailyFocus } from "@screens/DailyFocusStart";
import { GoBackParams } from "@modules/NutritionSettingMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { getIntialWeight } from "@modules/JoinBoatMainV3/components/utils2";
import SetWeightNew from "@modules/JoinBoatMainV3/components/SetWeightNew";
import { KeyboardAvoidingView } from "react-native";

const TargetWeight = () => {
  useScreenTrack();
  const route = useRoute();

  const params = route.params as GoBackParams;
  const navigation = useNavigation();

  const { uid, weight } = useUserStore(({ user }) => {
    const initWeight = getIntialWeight(
      user?.weight,
      user?.height,
      user?.gender,
      user?.fitnessGoal
    );
    return {
      uid: user?.uid,
      weight: initWeight,
    };
  }, shallow);

  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    if (weight) {
      setSelected(weight);
    }
  }, [weight]);

  const onProceed = async () => {
    await updateUserField(uid, {
      desiredWeight: selected,
    });

    weEventTrack("dietFormTargetWeight_clickNext", {});

    if (params?.isGoback && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("FamilyHistory", { isGoback: false });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#232136]"
    >
      <Header
        back={true}
        headerColor="#232136"
        tone="dark"
        titleNode={
          <DietFormOptionNode
            progress={1 / totalDailyFocus}
            heading="Daily Focus"
          />
        }
        centerTitle={true}
      />
      <OnboardLifeStyle
        onNext={onProceed}
        disabled={false}
        heading="What is your Target Weight?"
        textStyleTw="text-center"
      >
        <View className="flex-1">
          {typeof selected === "number" ? (
            <SetWeightNew
              initialValue={selected}
              onNumberFieldsUpdate={setSelected}
              target="desiredWeight"
              containerStyleTw="flex-col-reverse"
              scaleStyleTw="mb-10"
              isTransparent={true}
            />
          ) : null}
        </View>
      </OnboardLifeStyle>
    </KeyboardAvoidingView>
  );
};

export default TargetWeight;
