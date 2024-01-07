import { View, Text } from "react-native";

interface Props {
  fetch: boolean;
  error: string;
  restDay: boolean;
  future: boolean;
  restString: string;
  futureText: string;

  pastText?: string;
}

const Footer: React.FC<Props> = ({
  restString,
  futureText,
  fetch,
  error,
  restDay,
  future,

  pastText,
}) => {
  return (
    <>
      {pastText ? (
        <View className="flex justify-center items-center p-4 my-12">
          <Text className="text-[#CECCDE] font-medium text-base text-center">
            {pastText}
          </Text>
        </View>
      ) : fetch || error ? (
        <Text className="text-[#CECCDE] font-medium text-base mx-4 my-12">
          {error}
        </Text>
      ) : restDay ? (
        <View className="flex justify-center items-center p-4 my-12">
          <Text className="text-[#CECCDE] font-medium text-base text-center">
            {restString}
          </Text>
        </View>
      ) : future ? (
        <Text className="text-[#CECCDE] font-medium text-base mx-4 my-12">
          {futureText}
        </Text>
      ) : null}
      <View className="w-4 aspect-square" />
    </>
  );
};

export default Footer;
