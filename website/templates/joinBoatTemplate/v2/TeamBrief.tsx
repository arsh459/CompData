import TextEntry from "@templates/editEvent/Form/TextEntry";
import { useState } from "react";

interface Props {
  onButtonPress: (tBrief?: string) => void;
}

const TeamBrief: React.FC<Props> = ({ onButtonPress }) => {
  const [tBrief, setBrief] = useState<string>("");
  const [charLeft, setCharLeft] = useState<number>(140);

  const onKeyStroke = (newName: string) => {
    if (newName.length <= 140) {
      setBrief(newName);
      setCharLeft(140 - newName.length);
    }
  };

  return (
    <div>
      <TextEntry
        inputMode="text"
        heading="Short description for team"
        placeholder="Type here"
        helperText={`${charLeft} characters left`}
        multiline={true}
        value={tBrief}
        onChangeText={onKeyStroke}
        buttonText="Create Team"
        onButtonPress={() => onButtonPress(tBrief)}
      ></TextEntry>
    </div>
  );
};

export default TeamBrief;
