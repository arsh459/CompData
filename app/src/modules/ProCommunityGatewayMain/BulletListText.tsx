import { Text } from "react-native";

interface Props {
  text: string;
}
const BulletListText: React.FC<Props> = ({ text }) => {
  return (
    <Text
      style={{ fontFamily: "Nunito-Medium" }}
      className="text-white/70 text-sm py-2"
    >{`\u2022 ${text}`}</Text>
  );
};

export default BulletListText;
