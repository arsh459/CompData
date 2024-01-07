import ImageWithURL from "@components/ImageWithURL";
import SvgIcons from "@components/SvgIcons";
import {
  OptionInterface,
  optionTypes,
} from "@models/User/questionResponseInterface ";
import { symptomData, symptomId } from "@models/User/symptoms";
import SymptomCard from "@modules/PeriodTrackerMain/SymptomCard";
import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  option: OptionInterface;
  onPress: (id: symptomId) => void;
  optionType?: optionTypes;
  isSelected?: boolean;
}

const Option: React.FC<Props> = ({
  option,
  onPress,
  optionType,
  isSelected,
}) => {
  const symptom = option.symptomId && symptomData[option.symptomId];
  const text = option.text || symptom?.text;
  const image = option.image || symptom?.image;

  switch (optionType) {
    case "multiSelect":
      return (
        <SymptomCard
          onPress={() => option.symptomId && onPress(option.symptomId)}
          item={text || ""}
          image={image || ""}
          isSelected={isSelected || false}
          textColor="#2F2F2F"
        />
      );
    case "singleSelect":
      return (
        <TouchableOpacity
          onPress={() => option.symptomId && onPress(option.symptomId)}
          className={clsx(
            "rounded-full border-2 flex flex-row justify-center items-center mt-4",
            isSelected
              ? "border-[#FF6069] bg-transparent"
              : "border-transparent bg-[#FAEDEC]"
          )}
        >
          <ImageWithURL
            source={{ uri: image }}
            className="w-5 aspect-square"
            resizeMode="contain"
          />
          <Text
            className="text-lg text-center text-[#2F2F2F] py-2 ml-2 capitalize"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {text}
          </Text>
          {isSelected ? (
            <View className="absolute top-0 bottom-0 right-4 flex justify-center items-center">
              <View className="h-2/5 aspect-square bg-[#FF6069] rounded-full p-1">
                <SvgIcons iconType="tickCheck" color={"#FFF"} />
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      );
    case "noSelect":
      return (
        <View className="flex flex-row items-center px-4 py-2 bg-[#A07EE3] rounded-full m-2">
          {image === "NO_IMG" ? null : (
            <ImageWithURL source={{ uri: image }} className="w-6 h-6 mr-1" />
          )}
          <Text
            className="text-sm iphoneX:text-base text-white capitalize"
            style={{ fontFamily: "Nunito-Medium" }}
          >
            {text}
          </Text>
        </View>
      );
    default:
      return null;
  }
};

export default Option;
