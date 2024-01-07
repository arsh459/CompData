import { Image } from "react-native";

interface Props {
  img: string;
}

const PNGBadge: React.FC<Props> = ({ img }) => {
  return (
    <Image
      source={{ uri: img }}
      className="w-full h-full"
      resizeMode="contain"
    />
  );
};

export default PNGBadge;
