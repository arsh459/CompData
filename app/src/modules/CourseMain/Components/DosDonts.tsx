import { View, Text } from "react-native";

interface Props {
  dos?: string[];
  donts?: string[];
}
const DosDonts: React.FC<Props> = ({ donts, dos }) => {
  return (
    <>
      {donts && dos ? (
        <View className="bg-[#343150] rounded-2xl mx-4">
          <Text className="text-white p-4">✅Do’s and ❌ don’t</Text>
          <View className="h-px w-full bg-[#FFFFFF33]" />
          <View className="p-4">
            {dos?.map((i, index) => (
              <Text className="text-xs pb-2.5 " key={`${i}_${index}`}>
                ✅{" "}
                <Text
                  className="text-[#FFFFFF99] "
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  {i}
                </Text>
              </Text>
            ))}
          </View>
          <View className="h-px w-full bg-[#FFFFFF33]" />
          <View className="p-4">
            {donts?.map((i, index) => (
              <Text
                className="text-xs pb-2.5 text-[#FFFFFF99]"
                key={`${i}_${index}`}
              >
                ❌ <Text className="text-[#FFFFFF99]">{i}</Text>
              </Text>
            ))}
          </View>
        </View>
      ) : null}
    </>
  );
};

export default DosDonts;
