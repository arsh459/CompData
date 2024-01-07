// import { useUserKey } from "@hooks/user/useUserKey";
import TextEntry from "@templates/editEvent/Form/TextEntry";
import { useState } from "react";
// import { useState } from "react";
// import { useState } from "react"

interface Props {
  onButtonPress: (tName?: string) => void;
}

const TeamName: React.FC<Props> = ({ onButtonPress }) => {
  const [tName, setTName] = useState<string>("");
  const [charLeft, setCharLeft] = useState<number>(90);

  const onKeyStroke = (newName: string) => {
    if (newName.length <= 90) {
      setTName(newName);
      setCharLeft(90 - newName.length);
    }
  };

  return (
    <div>
      <TextEntry
        inputMode="text"
        heading="Your team name"
        placeholder="Type here"
        helperText={`${charLeft} characters left`}
        value={tName}
        onChangeText={onKeyStroke}
        buttonText="Next"
        // leftButtonText="Back"
        // leftButtonOnPress={onBack}
        onButtonPress={() => onButtonPress(tName)}
      ></TextEntry>
    </div>
  );
};

export default TeamName;
