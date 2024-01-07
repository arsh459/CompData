import ImageWithURL from "@components/ImageWithURL";
import { InfoIcon } from "@constants/imageKitURL";
import { TouchableOpacity } from "react-native";
interface Props {
  onInfoIconPress: () => void;
}
const OptionNode: React.FC<Props> = ({ onInfoIconPress }) => {
  return (
    <TouchableOpacity className="w-5 mr-4" onPress={onInfoIconPress}>
      <ImageWithURL
        source={{ uri: InfoIcon }}
        resizeMode={"contain"}
        className={"aspect-square"}
      />
    </TouchableOpacity>
  );
};

export default OptionNode;
