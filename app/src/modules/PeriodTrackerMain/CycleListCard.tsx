import { View, Text } from "react-native";

import { Cycle } from "@models/User/User";
import { format } from "date-fns";
interface Props {
  item: Cycle;
  title: string;
}
const CycleListCard: React.FC<Props> = ({
  title,
  item: { length, startUnix, endUnix, status },
}) => {
  return (
    <View className="flex flex-row justify-between bg-[#343150] py-5">
      <View className="">
        <Text
          className="text-sm text-white "
          style={{
            fontFamily: "Nunito-Medium",
            lineHeight: 16,
          }}
        >
          {title}
        </Text>
        <Text
          className="text-xs text-white pt-1"
          style={{
            fontFamily: "Nunito-Regular",
            lineHeight: 16,
          }}
        >
          {startUnix ? format(new Date(startUnix), "do MMM yy") : ""}
          {"  "}-{"  "}
          {format(new Date(endUnix), "do MMM yy")}
        </Text>
      </View>
      <View className="">
        <Text
          className="text-sm text-white"
          style={{
            fontFamily: "Nunito-Bold",
            color: status === "regular" ? "#30E763" : "#FFAA29",
          }}
        >
          {length} days
        </Text>
        <Text
          className="text-xs text-white capitalize text-right"
          style={{
            fontFamily: "Nunito-Regular",
          }}
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

export default CycleListCard;
