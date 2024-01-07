import { View, Text, TextInput } from "react-native";

import Header from "@modules/Header";
// import { useTeamCreate } from "@modules/JoinBoatMain/hooks/useTeamCreate";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useTeamCreate } from "@modules/JoinBoatMain/hooks/useTeamCreate";
import WelcomeTeam from "../WelcomeTeam.tsx";
interface Props {
  // teamName?: string;
  // setTeamName: (text: string) => void;
  // onTeamCreate?: () => Promise<void>;
  // onGetStarted?: () => void;
}
const CreateTeamEnterName: React.FC<Props> = (
  {
    // teamName,
    // setTeamName,
    // // onGetStarted,
    // onTeamCreate,
  }
) => {
  const { section, setTeamName, teamName, teamId, onTeamCreate, onClose } =
    useTeamCreate();

  return (
    <View className="flex-1 bg-[#14131E] ">
      <Header
        headerType="transparent"
        tone="dark"
        back={true}
        onBack={onClose}
      />
      <>
        {section === "teamName" ? (
          <View className="flex-1 flex justify-between pt-16 iphoneX:pt-24">
            <View className="">
              <Text
                className="text-[#F1F1F1] text-center text-lg pb-5 iphoneX:pb-12  iphoneX:text-xl"
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                Let’s start with your Team name?
              </Text>
              <View className="p-4 ">
                <TextInput
                  className="w-3/4 mx-auto px-4 text-white text-3xl iphoneX:text-4xl text-center border-b border-[#757575]"
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                  value={teamName}
                  onChangeText={(text: string) => setTeamName(text)}
                  placeholder="Team Name"
                  placeholderTextColor={"#565656"}
                  blurOnSubmit
                />
              </View>
            </View>
            <View className="w-4/5 mx-auto pb-10">
              <StartButton
                title="Create My Team"
                bgColor="bg-[#fff]"
                textColor="text-[#100F1A] "
                roundedStr="rounded-full"
                textStyle="py-2 text-center text-xl  "
                onPress={onTeamCreate}
                fontFamily="BaiJamjuree-Bold"
              />
            </View>
          </View>
        ) : (
          <WelcomeTeam teamId={teamId} teamName={teamName} onClose={onClose} />
        )}
      </>
    </View>
  );
};

export default CreateTeamEnterName;
