import { Text } from "react-native";

interface Props {
  title: string;
}

const SwapHeading: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Text
        className="text-white px-8 text-lg pb-5"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        {title}
      </Text>
    </>
  );
};

export default SwapHeading;
