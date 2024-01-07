import { View, Text, useWindowDimensions } from "react-native";

interface DataType {
  head: string;
  text: string;
}

const colors: string[] = ["#D79B00", "#DF17B3", "#00BB61", "#00BB61"];

const data: DataType[] = [
  {
    head: "Nutrition",
    text: "Cravings! Tell me a healthy smoothie",
  },
  {
    head: "Menstural",
    text: "मेरा पीरियड नहीं आया। क्या मैं गर्भवती हूँ?",
  },
  {
    head: "Insight",
    text: "You might feel some breast tenderness.",
  },
  {
    head: "Workout",
    text: "Kya mein period mein yoga kar sakti hai?",
  },
  {
    head: "Nutrition",
    text: "तणाव दूर करण्यासाठी हा योग करून पहा.",
  },
  {
    head: "Menstural",
    text: "Try this pranayam. Helps in stress",
  },
  {
    head: "Insight",
    text: "ಸೀಡ್ ಸೈಕ್ಲಿಂಗ್ ನನಗೆ ಸಹಾಯ ಮಾಡಬಹುದೇ?",
  },
  {
    head: "Workout",
    text: "Ovulation is close. You will be glowing!",
  },
];

const Section4 = () => {
  const { width, height } = useWindowDimensions();

  const formatedData: DataType[][] = [];
  for (let i = 0; i < data.length; i += 2) {
    const pair: DataType[] = [data[i]];
    if (data[i + 1]) {
      pair.push(data[i + 1]);
    }
    formatedData.push(pair);
  }

  return (
    <View className="py-16 iphoneX:py-20" style={{ height }}>
      <Text
        className="text-white text-2xl px-5"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Ask
        <Text style={{ color: "#53A2FF" }}> Sakhi </Text>
        everything and anything
      </Text>
      <View className="h-8 iphoneX:h-10" />
      <View className="flex-1 flex justify-center items-center">
        {formatedData.map((each, eachInd) => (
          <View
            key={`each-${eachInd}`}
            style={{
              width: width * 1.2,
              transform: [
                {
                  translateX: eachInd % 2 === 0 ? width * 0.1 : -(width * 0.1),
                },
              ],
            }}
            className="flex flex-row"
          >
            {each.map((item, itemInd) => (
              <ItemContainer
                key={`item-${itemInd}`}
                color={colors[eachInd % colors.length]}
                {...item}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Section4;

const ItemContainer: React.FC<DataType & { color: string }> = ({
  head,
  text,
  color,
}) => {
  return (
    <View className="w-1/2 p-1.5 iphoneX:p-2">
      <View className="bg-white rounded-2xl p-4">
        <Text className="text-[#8A8A8A] text-[10px] iphoneX:text-xs pb-2">
          {head}
        </Text>
        <Text
          style={{ color }}
          className="text-base leading-5 iphoneX:text-lg iphoneX:leading-6"
        >
          {text}
        </Text>
      </View>
    </View>
  );
};
