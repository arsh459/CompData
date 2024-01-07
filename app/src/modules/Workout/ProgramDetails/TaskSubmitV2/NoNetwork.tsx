import { View, Text, TouchableOpacity } from "react-native";
import BlurBG from "@components/BlurBG";
import { Path, Svg } from "react-native-svg";
// import { useState } from "react";

interface Props {
  text: string;
  cta: string;
  onRetry?: () => void;
}

// const getModalState = (net: NetInfoState) => {
//   if (net.type === "unknown") {
//     return false;
//   }

//   if (net.isConnected) {
//     return false;
//   }

//   if (net.isInternetReachable) {
//     return false;
//   }

//   return true;
// };

const NoNetwork: React.FC<Props> = ({ onRetry, text, cta }) => {
  // const [loading, setloading] = useState(false);
  // const netInfo = useNetInfo();

  // const onRetry = async () => {
  //   setloading(true);
  //   await NetInfo.refresh();
  //   setloading(false);
  // };

  return (
    <>
      <View className="relative z-0 rounded-2xl overflow-hidden px-6 py-4">
        <BlurBG
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          blurAmount={20}
          fallbackColor="#FFFFFF26"
          blurType="dark"
        />
        <View className="flex flex-row items-center pb-3">
          <Text
            className="text-2xl font-medium mr-3 max-w-[100px]"
            style={{
              color: "#FF467E",
            }}
          >
            {text ? text : "Network Error"}
          </Text>
          <Svg width={37} height={36} fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.784 21.342l-.163.162c-.612.612-1.62.54-2.16-.144-1.638-2.124-2.52-4.68-2.52-7.237 0-2.556.882-5.112 2.52-7.237.54-.684 1.548-.756 2.16-.144l.127.126c.504.486.576 1.297.126 1.837C9.63 10.235 9 12.179 9 14.123c0 1.818.648 3.763 1.927 5.4.432.54.342 1.333-.144 1.819zM29.577 2.548l.144-.144c.595-.594 1.585-.522 2.125.144 2.736 3.384 4.158 7.399 4.158 11.575 0 4.159-1.278 8.173-4.104 11.557-.558.684-1.602.756-2.232.126-.559-.558-.649-1.458-.145-2.052 2.287-2.772 3.42-6.265 3.42-9.63 0-3.367-1.151-6.878-3.42-9.632-.468-.576-.486-1.404.054-1.944zM6.283 2.404l.144.144c.54.54.522 1.368.054 1.944-2.287 2.772-3.42 6.265-3.42 9.631 0 3.367 1.133 6.859 3.42 9.631.468.576.486 1.404-.054 1.944l-.144.144c-.594.612-1.585.522-2.125-.144C1.422 22.314 0 18.3 0 14.123c0-4.176 1.422-8.19 4.158-11.575.54-.666 1.53-.738 2.125-.144zm21.314 18.884c-.558.738-1.62.81-2.269.162-.54-.54-.611-1.386-.143-1.962 1.206-1.53 1.818-3.439 1.818-5.365 0-1.818-.648-3.762-1.909-5.418-.431-.54-.341-1.332.144-1.819l.145-.144a1.435 1.435 0 012.16.162c1.602 2.125 2.376 4.68 2.52 7.22 0 2.52-.846 5.04-2.466 7.164zM16.777 9.785c3.007-.792 5.725 1.458 5.725 4.338 0 1.368-.612 2.556-1.566 3.385l5.329 15.967a1.708 1.708 0 11-3.24 1.08l-.81-2.43h-8.408l-.81 2.43a1.703 1.703 0 01-1.62 1.17 1.7 1.7 0 01-1.62-2.25l5.329-15.968c-1.26-1.08-1.945-2.844-1.369-4.752.432-1.44 1.62-2.592 3.06-2.97zm1.225 9.739l-3.006 9h6.012l-3.006-9z"
              fill={"#FF467E"}
            />
            <Path d="M1 1l32.5 32.5" stroke={"#FFFFFF"} />
          </Svg>
        </View>
        {/* <Text className="text-white text-base text-center">
          Check connection
        </Text> */}
      </View>
      {onRetry ? (
        <TouchableOpacity
          onPress={onRetry}
          className="bg-[#6D55D1] rounded-2xl my-4 py-3"
        >
          <Text className="text-white text-base text-center">{cta}</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default NoNetwork;
