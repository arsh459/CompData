import { View, Text } from "react-native";
import ImageWithURL from "@components/ImageWithURL";
import { tickIcon } from "@constants/imageKitURL";

interface Props {
  label?: string;
  value?: string | number | boolean;
  isImage?: boolean;
}

const ListPlanItem: React.FC<Props> = ({ label, value, isImage }) => {
  return (
    <View className="py-4 flex items-center flex-1 relative z-0">
      <Text className="text-white text-xs flex-1 opacity-0">{label}</Text>
      <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
        {isImage ? (
          <ImageWithURL
            source={{ uri: tickIcon }}
            className="w-4 aspect-square"
          />
        ) : (
          <Text className="text-white text-center  ">{value}</Text>
        )}
      </View>
    </View>
  );
};

export default ListPlanItem;
