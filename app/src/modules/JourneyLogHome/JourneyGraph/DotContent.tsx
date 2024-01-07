import { View, Text, useWindowDimensions } from "react-native";
import SpreadColorBall from "@components/SpreadColorBall";
import { format } from "date-fns";
import clsx from "clsx";

export const graphHeight = 256;

interface Props {
  index: number;
  activeIndex: number;
  x: number;
  y: number;
  weight: number;
  date?: string;
}

const DotContent: React.FC<Props> = ({
  index,
  activeIndex,
  x,
  y,
  date,
  weight,
}) => {
  const { width } = useWindowDimensions();
  const isActive = activeIndex === index;
  return (
    <>
      {/* <LinearGradient
        colors={["#7E60FF00", "#7E60FF13", "#7E60FF00"]}
        style={{
          position: "absolute",
          left: x - width / 15 / 2,
          top: 0,
          width: width / 15,
          height: 200,
        }}
      /> */}
      <View
        className={clsx(isActive ? "bg-[#7E60FF] " : "bg-[#7E60FF1A]")}
        style={{
          position: "absolute",
          left: x - width / 15 / 2,
          top: isActive ? 20 : 10,
          width: width / 15,
          height: isActive ? 190 : 200,
        }}
      />
      {isActive ? (
        <>
          <View
            style={{
              position: "absolute",
              left: x - 25,
              top: y - 25,
              width: 50,
            }}
            className="aspect-square"
            pointerEvents="none"
          >
            <SpreadColorBall
              color1="#7E60FF"
              color2="#7E60FF"
              opacity1={0.5}
              opacity2={0}
            />
          </View>
          <View
            style={{
              position: "absolute",
              left: x - 8,
              top: y - 8,
              width: 16,
            }}
            className="border border-[#E9E4FF] rounded-full p-0.5"
            pointerEvents="none"
          >
            <View className="w-full aspect-square bg-[#E9E4FF] rounded-full" />
          </View>
          <View
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: width,
              height: graphHeight,
              transform: [
                { translateX: -(width / 2) },
                {
                  translateY:
                    y < graphHeight / 3
                      ? -(graphHeight / 3)
                      : -((graphHeight * 2) / 3),
                },
              ],
            }}
            className="fex justify-center items-center"
            pointerEvents="none"
          >
            <Text className="text-xs text-white/80">
              {date ? format(new Date(date), "do MMMM") : ""}
            </Text>
            <Text className="text-base font-bold text-white">{weight}kg</Text>
          </View>
        </>
      ) : null}
    </>
  );
};

export default DotContent;
