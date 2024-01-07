import { Text, TextInput, View } from "react-native";
import JoinBoatWrapper from "./JoinBoatWrapper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useEffect, useState } from "react";

interface Props {
  onAgeSave: (val?: number, heightDB?: number) => void;
  nextBtnText: string;
  progress?: number;
}

const SetAge: React.FC<Props> = ({ onAgeSave, nextBtnText, progress }) => {
  // console.log("RenderTest SetAge");
  const [age, onAgeUpdate] = useState<number>();

  const { nameDB, ageDB, heightDB } = useUserStore(({ user }) => {
    return {
      nameDB: user?.name,
      ageDB: user?.age,
      heightDB: user?.height,
    };
  }, shallow);

  useEffect(() => {
    if (ageDB) {
      onAgeUpdate(ageDB);
    }
  }, [ageDB]);

  return (
    <JoinBoatWrapper
      nextBtnText={nextBtnText}
      title={`What is your age ${nameDB}?`}
      onNext={() => onAgeSave(age, heightDB)}
      disabled={!age}
      progress={progress}
    >
      <View className="p-4 flex flex-row items-center my-4">
        <Text className="w-3/5 text-white font-popL text-2xl whitespace-nowrap">
          My age is
        </Text>
        <TextInput
          className="w-2/5 p-4 bg-[#343150] font-popL text-white text-xl rounded-xl text-center"
          style={{
            fontFamily: "BaiJamjuree-Bold",
            textAlignVertical: "center",
          }}
          value={(age || 0).toString()}
          onChangeText={(text: string) => onAgeUpdate(parseInt(text))}
          placeholder="24"
          keyboardType="number-pad"
          placeholderTextColor="#75757580"
          blurOnSubmit
        />
      </View>
    </JoinBoatWrapper>
  );
};

export default SetAge;
