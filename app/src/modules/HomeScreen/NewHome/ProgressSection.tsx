import clsx from "clsx";
import { View, Text } from "react-native";

interface Props {
  playerOneProg: number;
  split?: boolean;
  notStarted: boolean;
  p1Color: "#0085E0" | "#FF5970";
  p2Color: "#0085E0" | "#FF5970";
}

const ProgressSection: React.FC<Props> = ({
  playerOneProg,
  split,
  p1Color,
  p2Color,
  notStarted,
}) => {
  const playerTwoProg = 100 - playerOneProg;
  return (
    <View>
      <View className={clsx("", " flex flex-row items-center ")}>
        <>
          <View
            style={{
              width:
                notStarted && split
                  ? "50%"
                  : notStarted && !split
                  ? "100%"
                  : `${playerOneProg}%`, // not started && split
            }}
            className={clsx(
              notStarted
                ? "bg-[#100F1A]"
                : p1Color === "#0085E0"
                ? "bg-[#0085E0]"
                : "bg-[#FF5970]",
              "border border-white"
              //   "absolute left-0"
            )}
          >
            <Text
              style={{ fontFamily: "BaiJamjuree-Bold" }}
              className="text-white text-center"
            >
              {notStarted
                ? "0%"
                : playerOneProg > 15
                ? `${playerOneProg}%`
                : "."}
            </Text>
          </View>
          {split ? (
            <View
              style={{
                width:
                  notStarted && split
                    ? "50%"
                    : notStarted && !split
                    ? "100%"
                    : `${100 - playerOneProg}%`,
              }}
              className={clsx(
                notStarted
                  ? "bg-[#100F1A]"
                  : p2Color === "#0085E0"
                  ? "bg-[#0085E0]"
                  : "bg-[#FF5970]",
                "border border-white"
                //   "absolute right-0"
              )}
            >
              <Text
                style={{ fontFamily: "BaiJamjuree-Bold" }}
                className="text-white text-center"
              >
                {notStarted
                  ? "0%"
                  : playerTwoProg > 15
                  ? `${playerTwoProg}%`
                  : "."}
              </Text>
            </View>
          ) : null}
        </>
      </View>
    </View>
  );
};

export default ProgressSection;
