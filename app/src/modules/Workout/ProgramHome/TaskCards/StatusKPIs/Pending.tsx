import Loading from "@components/loading/Loading";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

interface Props {
  overlay?: boolean;
}

const Pending: React.FC<Props> = ({ overlay }) => {
  return (
    <LinearGradient
      colors={
        overlay ? ["transparent", "#000000DB"] : ["transparent", "transparent"]
      }
      className={clsx(
        "w-full absolute left-0 right-0 top-0 bottom-0 pb-2 px-4 z-50"
      )}
    >
      {/* flex flex-col items-center justify-center */}
      <View className="absolute left-0 right-0 top-0 bottom-0 justify-center items-center flex z-50">
        <View className="pb-2">
          <Loading width="w-12" height="h-12" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Pending;
