import { View } from "react-native";
import GradientText from "@components/GradientText";
import MembersImage from "@components/MembersImage";
import { useParticipants } from "@hooks/challenge/useParticipants";

const ParticipantsComp = () => {
  const { fewParticipents, participantsCount } = useParticipants();

  return fewParticipents.length && participantsCount ? (
    <View className="flex flex-row justify-between items-center p-8 pt-4">
      <GradientText
        text={`${participantsCount}${
          participantsCount > fewParticipents.length ? "+" : ""
        } Participant${participantsCount > 1 ? "s" : ""}\nin this challenge`}
        colors={["#D197FF", "#A2A0FF"]}
        end={{ x: 1, y: 0 }}
        start={{ x: 0, y: 1 }}
        textStyle={{
          fontSize: 20,
          textAlign: "left",
          fontWeight: "700",
          fontFamily: "Nunito-Bold",
          lineHeight: 23,
        }}
      />

      <MembersImage
        members={fewParticipents}
        hidePlusOthers={true}
        ring={true}
        ringColor="#FFFFFF"
        size="small"
      />
    </View>
  ) : null;
};

export default ParticipantsComp;
