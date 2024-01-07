import { Text, View, KeyboardAvoidingView } from "react-native";
// import { useState } from "react";
// import SetHWeight from "@modules/JoinBoatMainV3/components/SetWeight";
import { useUserContext } from "@providers/user/UserProvider";
import Header from "@modules/Header";
import { addWeightToPreviousDay, saveMoodToFirebase } from "./utils";
import { updateUserWeight } from "@models/User/updateUtils";
import { useNavigation } from "@react-navigation/native";
import { useProgressStore } from "@providers/progress/progressStore";
import { useState } from "react";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import WeightEdit from "@modules/JoinBoatMainV3/components/WeightEdit";
import { Platform } from "react-native";
import ClickButton from "@modules/JoinBoatMainV3/components/ClickButton";
// import { useAchieverForKPI } from "@modules/Awards/hook/useAchieverForKPI";

const AddWeightMain = () => {
  const { user } = useUserContext();
  // const currentWeight = 0;
  const initialWeight = user?.weight ? user.weight : 0;
  const [currentWeight, setCurrentWeight] = useState<number>(initialWeight);

  const navigation = useNavigation();

  const toggleUpdate = useProgressStore((state) => state.toggleUpdate);
  //when adding weight add previous date
  const handleSaveDetails = async () => {
    weEventTrack("addWeight_clickSave", {
      ...(user?.weight ? { value: user.weight } : {}),
    });
    await addWeightToPreviousDay(user?.uid, user?.weight);

    await saveMoodToFirebase("weight", "dailyWeight", currentWeight, user?.uid);
    user?.uid &&
      currentWeight &&
      initialWeight !== currentWeight &&
      (await updateUserWeight(user.uid, currentWeight));

    // if (achiever) {
    //   navigation.navigate("AwardWon", { achivementId: achiever.id });
    // } else

    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    toggleUpdate();
  };
  return (
    <>
      {/* <ScrollView
        bounces={false}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-evenly",
          paddingVertical: 20,
        }}
        className="flex-1 bg-[#232136]"
      > */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1  bg-[#232136]"
      >
        <Header headerColor="#232136" tone="dark" back={true} />
        <View className="flex-1 flex flex-col">
          <Text
            numberOfLines={2}
            className="text-white text-xl text-center p-4"
          >
            What is your current weight?
          </Text>

          <View className="py-4">
            <WeightEdit
              unit="Kg"
              color="#FF9E6B"
              target="weight"
              onChange={(val: number) => setCurrentWeight(val)}
              current={user?.weight ? user.weight : 0}
            />
            {/* <SetHWeight
            initialValue={user?.weight ? user.weight : 0}
            onNumberFieldsUpdate={(val: number) => setCurrentWeight(val)}
            target="weight"
            isTransparent={true}
          /> */}
          </View>
        </View>
        {/* <View className="justify-between flex-1  border border-green-500"> */}

        <Text
          numberOfLines={2}
          className="text-white text-xl text-center pt-10"
        >
          Your last Logged Weight is{" "}
          <Text className="text-[#FF9E6B]">{user?.weight} kg</Text>
        </Text>
        <View className="p-4">
          <ClickButton
            disabled={!currentWeight}
            nextBtnText="Save Weight"
            onNext={handleSaveDetails}
          />
          {/* <SaveDetailsButton handleSaveDetails={handleSaveDetails} /> */}
        </View>
        {/* </View> */}
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </>
  );
};

export default AddWeightMain;
