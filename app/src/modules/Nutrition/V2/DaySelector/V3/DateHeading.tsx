import { DownIcon } from "@constants/imageKitURL";
import { format } from "date-fns";
import { Pressable, View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { useDayContext } from "../provider/DayProvider";
import { useAuthContext } from "@providers/auth/AuthProvider";

interface Props {
  visible: boolean;
  setVisible: (newSt: boolean) => void;
}

const DateHeading: React.FC<Props> = ({ visible, setVisible }) => {
  const { selectedtDate, selectedUnix } = useDayContext();

  const { today } = useAuthContext();

  return (
    <View className="flex flex-row items-center justify-between p-4">
      <Pressable
        style={({ pressed }) => [pressed ? { opacity: 0.9 } : {}]}
        // onPress={() => setVisible(!visible)}
        className="flex-grow "
      >
        <Text
          className="text-base iphoneX:text-lg text-white "
          style={{ fontFamily: "Poppins-Medium" }}
        >
          {selectedtDate === today
            ? `Today, ${format(new Date(selectedUnix), "do LLL yyyy")}`
            : format(new Date(selectedUnix), "do LLL yyyy")}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [pressed ? { opacity: 0.9 } : {}]}
        className="w-6 iphoneX:w-8 aspect-square  mr-2"
        onPress={() => setVisible(!visible)}
      >
        <FastImage
          style={{ transform: [{ rotate: visible ? "180deg" : "0deg" }] }}
          source={{ uri: DownIcon }}
          className="w-full aspect-square"
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default DateHeading;
