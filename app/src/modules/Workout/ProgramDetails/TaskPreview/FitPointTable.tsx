import { Task } from "@models/Tasks/Task";
import { View, Text } from "react-native";
interface Props {
  task?: Task;
}

const FitPointTable: React.FC<Props> = ({ task }) => {
  return (
    <>
      {task?.awardLevels?.length ? (
        <View className="flex flex-col  justify-center items-center">
          <View className="w-full bg-[#2B2A34] rounded-lg">
            <View className="flex flex-row justify-between items-center px-4 py-2">
              <Text
                className="text-base iphoneX:text-lg font-bold text-white  "
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                Task
              </Text>
              <Text
                className="text-base iphoneX:text-lg font-bold text-white  "
                style={{ fontFamily: "BaiJamjuree-Bold" }}
              >
                Fit Points
              </Text>
            </View>
            <View className="h-0.5 bg-[#0F0E19]" />
            <View className="py-2 pt-4">
              {task?.awardLevels?.map((item, index) => (
                <View
                  key={`${item.text}-${index}`}
                  className="flex flex-row justify-between items-center px-4 pb-2"
                >
                  <Text
                    className="font-medium text-[11px] iphoneX:text-[13px] text-white"
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                  >
                    {item.text}
                  </Text>
                  <Text
                    className="font-medium text-[11px] iphoneX:text-[13px] text-white"
                    style={{ fontFamily: "BaiJamjuree-Medium" }}
                  >
                    Earn {item.fitPoints}FP
                  </Text>
                </View>
              ))}
            </View>
          </View>
          {task?.note ? (
            <Text
              className="self-start text-xs fonte-medium iphoneX:text-sm text-white mt-4"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Note: {task?.note}
            </Text>
          ) : null}
        </View>
      ) : null}
    </>
  );
};

export default FitPointTable;
