import { View, Text, Image, TouchableOpacity } from "react-native";
import { toggleDownIcon, toggleUpIcon } from "@constants/imageKitURL";

interface Props {
  isOpen: boolean;
  setIsOpen?: () => void;
  sectionName?: string;
  toggler: () => void;
}

const ToggleDropDown: React.FC<Props> = ({
  sectionName,
  isOpen,
  setIsOpen,
  toggler,
}) => {
  const uri = isOpen ? toggleUpIcon : toggleDownIcon;
  return (
    <TouchableOpacity
      onPress={toggler}
      className="flex flex-row justify-center items-center flex-1 p-4 bg-[#262630] rounded-xl"
    >
      <Text
        className=" flex-1 text-sm iphoneX:text-base text-white "
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        {sectionName}
      </Text>
      <View className="pl-2">
        <Image
          source={{ uri }}
          className="w-4 iphoneX:w-6 aspect-square"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default ToggleDropDown;
