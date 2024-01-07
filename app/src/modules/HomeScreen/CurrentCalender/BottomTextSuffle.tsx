import { View, Text } from "react-native";

const BottomTextSuffle = () => {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((previousCount) => previousCount + 1);
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  // const index = count % suffleTextArr.length;
  // return <View className="w-4/5 mx-auto px-4">{suffleTextArr[0]}</View>;
  return (
    <View className="w-4/5 mx-auto px-4">
      <View className="">
        <Text className="text-[#DDDFF4]   text-sm font-sans font-normal">
          Date without a circle means you have not done any activity on that day
        </Text>
      </View>
    </View>
  );
};

export default BottomTextSuffle;
