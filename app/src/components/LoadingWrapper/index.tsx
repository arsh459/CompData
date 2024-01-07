import { View } from "react-native";
import Loading from "@components/loading/Loading";

interface Props {
  children: React.ReactNode;
  loading: boolean;
}

const LoadingWrapper: React.FC<Props> = ({ children, loading }) => {
  return loading ? (
    <View className="flex-1 justify-center items-center">
      <Loading width="w-12" height="h-12" />
    </View>
  ) : (
    <>{children}</>
  );
};

export default LoadingWrapper;
