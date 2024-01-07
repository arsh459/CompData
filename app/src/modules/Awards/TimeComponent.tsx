import { format } from "date-fns";
import { Text } from "react-native";

interface Props {
  placeholder: string;
  wonOn?: number | null;

  unlockedOn?: number | null;
  expiresOn?: number;

  isUnlocked?: boolean;
  isExpired?: boolean;
}

const TimeComponent: React.FC<Props> = ({
  placeholder,

  wonOn,

  unlockedOn,

  expiresOn,
  isUnlocked,
  isExpired,
}) => {
  return (
    <Text
      numberOfLines={2}
      className="w-full text-[#BFBFBF] text-xs text-center"
      style={{ fontFamily: "Nunito-Regular" }}
    >
      {wonOn
        ? `Earned on ${format(wonOn, "do MMM yy")}`
        : isUnlocked && expiresOn
        ? `Expires ${format(expiresOn, "do MMM yy")}`
        : !isUnlocked && unlockedOn
        ? `Unlocks ${format(unlockedOn, "do MMM yy")}`
        : isExpired && expiresOn
        ? `Expired on ${format(expiresOn, "do MMM yy")}`
        : placeholder}
    </Text>
  );
};

export default TimeComponent;
