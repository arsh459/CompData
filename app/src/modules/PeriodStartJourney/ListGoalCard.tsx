import { Text, TouchableOpacity } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
interface Props {
  icon: string;
  text: string;
  isSelected: boolean;
  onPress: () => void;
}
const ListGoalCard: React.FC<Props> = ({ icon, text, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={clsx(
      "flex flex-row items-center justify-between p-4  mx-4 my-2 rounded-2xl",
      isSelected ? "bg-[#FFFFFF]" : "bg-[#343150]"
    )}
    disabled={isSelected}
  >
    <Text
      className={clsx(
        " text-lg  ",
        isSelected ? "text-[#232136]" : "text-[#F1F1F1]"
      )}
      style={{ fontFamily: "Nunito-SemiBold" }}
    >
      {text}
    </Text>
    <ImageWithURL source={{ uri: icon }} className="w-8 aspect-square" />
  </TouchableOpacity>
);

export default ListGoalCard;
