import { SlotObj } from "@models/slots/Slot";
import { checkTime, getShowSlotStr } from "@models/slots/utils";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  slots: SlotObj[];
  isToday: boolean;
  slotTime?: SlotObj;
  setSlotTime: (val: SlotObj) => void;
}

const SlotTime: React.FC<Props> = ({
  slots,
  isToday,
  slotTime,
  setSlotTime,
}) => {
  return (
    <View className="w-full flex-1 flex flex-row flex-wrap p-2">
      {slots.length ? (
        slots.map((each) => {
          const isTimePassed = !checkTime(isToday, each);

          return (
            <View key={each.id} className="w-1/2 p-2">
              <TouchableOpacity
                disabled={isTimePassed || each.status === "BUSY"}
                onPress={() => setSlotTime(each)}
                className={clsx(
                  slotTime === each
                    ? "bg-white"
                    : isTimePassed || each.status === "BUSY"
                    ? "bg-white/10"
                    : "bg-white/30",
                  "w-full py-3 rounded-full"
                )}
              >
                <Text
                  className={clsx(
                    slotTime === each
                      ? "text-[#333333]"
                      : isTimePassed || each.status === "BUSY"
                      ? "text-white/20"
                      : "text-white",
                    "text-center text-sm"
                  )}
                  style={{ fontFamily: "BaiJamjuree-Bold" }}
                  numberOfLines={1}
                >
                  {getShowSlotStr(each)}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text
          className="text-white text-center text-base mx-auto my-4"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          No slots avaliable
        </Text>
      )}
    </View>
  );
};

export default SlotTime;
