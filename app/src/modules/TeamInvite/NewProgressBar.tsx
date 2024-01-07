import { View, useWindowDimensions, Text } from "react-native";

import GoodBadProgress from "./GoodBadProgress";
import GradientText from "@components/GradientText";
interface Props {
  showPercent?: boolean;
}
const NewProgressBar: React.FC<Props> = ({ showPercent }) => {
  const { width: Width } = useWindowDimensions();
  const fullWidth = Math.floor((5 / 7) * 100);
  const overflowWidth = Math.floor((33 / Width) * 100);
  const left =
    fullWidth === 0 ? -overflowWidth - 1 : fullWidth - overflowWidth - 1;

  return (
    <View
      className="overflow-hidden   mx-4   flex justify-center "
      style={{ height: Width * 0.26, paddingBottom: Width * 0.02 }}
    >
      <View className=" bg-[#534D7B]  h-3 relative  rounded-sm ">
        <View
          className="absolute top-1/2  bottom-1/2 "
          style={{
            // left: `${fullWidth - overflowWidth} %`,
            left: `${left}%`,
          }}
        >
          <GoodBadProgress />
        </View>
        {showPercent ? (
          // <Text
          //   className="text-white absolute "
          //   style={{
          //     // left: `${fullWidth - overflowWidth} %`,
          //     left: `${left + overflowWidth - 1}%`,
          //     top: Width * 0.08,
          //   }}
          // >
          //   {Math.floor((5 / 7) * 100)}
          // </Text>
          <View
            className="absolute "
            style={{
              left: `${left - overflowWidth / 2 + 1}%`,
              // top: Width * 0.08,
            }}
          >
            <GradientText
              text={`${Math.floor((5 / 7) * 100)}%`}
              colors={["#51FF8C", "#51FF8C"]}
              textStyle={{
                fontFamily: "BaiJamjuree-Bold",
                textAlign: "center",
                fontSize: 18,
                padding: 25,
              }}
            />
          </View>
        ) : null}
        <View className="overflow-visible ">
          <Text
            className="text-white absolute left-0  z-10"
            style={{ fontFamily: "BaiJamjuree-SemiBold", bottom: Width * 0.04 }}
          >
            Bad
          </Text>
          <Text
            className="text-white absolute right-0 bottom-2"
            style={{ fontFamily: "BaiJamjuree-SemiBold", bottom: Width * 0.04 }}
          >
            Great
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NewProgressBar;
