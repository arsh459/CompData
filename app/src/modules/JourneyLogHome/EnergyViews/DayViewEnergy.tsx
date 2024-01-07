import { Text } from "react-native";

import { DayTrack } from "../DayTrack";
import { getIconByEnergy } from "../utils";
interface Props {
  todaysValue: number;
}
const DayViewEnergy: React.FC<Props> = ({ todaysValue }) => {
  return (
    <DayTrack
      imgUrl={getIconByEnergy(todaysValue).icon}
      footerMainText="Since you Joined SocialBoat your Mood has been uplifting by"
      // footerSubText={increaseAfterSocialBoat}
      type="energy"
    >
      <Text className="text-white w-3/4 text-xl ">
        Your average energy of the day is{" "}
        <Text className="text-[#51FF8C]">
          {getIconByEnergy(todaysValue).text}{" "}
        </Text>
        as compared to normal days
      </Text>
    </DayTrack>
  );
};

export default DayViewEnergy;
