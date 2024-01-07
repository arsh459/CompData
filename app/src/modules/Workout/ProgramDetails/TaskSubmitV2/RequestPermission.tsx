import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress: () => void;
  text: string;
  cta: string;
}

const RequestPermission: React.FC<Props> = ({ text, onPress, cta }) => {
  return (
    <View className="w-full flex-1 flex justify-center items-center px-4">
      <Text className="text-white text-lg text-center">{text}</Text>
      {cta ? (
        <TouchableOpacity onPress={onPress}>
          <Text className="text-sky-500 text-xl pt-2 underline">{cta}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default RequestPermission;
