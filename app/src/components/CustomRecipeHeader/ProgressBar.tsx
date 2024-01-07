import { View } from "react-native";

interface Props {
  progress: number;
  color?: string;
}

const ProgressBar: React.FC<Props> = ({ progress, color }) => {
  return (
    <View className="w-full h-1 bg-white/25 rounded-full overflow-hidden my-2">
      <View
        className={`h-full bg-[${color ? color : "#FE3394"}] rounded-full`}
        style={{
          width: `${100 * (progress > 1 ? 1 : progress < 0 ? 0 : progress)}%`,
        }}
      />
    </View>
  );
};

export default ProgressBar;
