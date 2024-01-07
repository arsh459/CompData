import CloseBtn from "@components/Buttons/CloseBtn";
import SvgIcons from "@components/SvgIcons";
import UseModal from "@components/UseModal";
import { SprintObject } from "@models/Event/Event";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import clsx from "clsx";
// import { format } from "date-fns";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  current?: string;
  selected?: string;
  sprints?: SprintObject[];
  setSelected: (val: string) => void;
  // gameStart?: number;
}

const PeriodModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  current,
  selected,
  sprints,
  setSelected,
  // gameStart,
}) => {
  const reversed = sprints?.slice().reverse();

  const handlePress = (id: string) => {
    weEventTrack("ranking_selectMonth", { monthId: id });
    setSelected(id);
    onCloseModal();
  };

  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      bgColor="bg-[#100F1A]"
      tone="dark"
    >
      <SafeAreaView className="flex-1 flex justify-center m-8">
        <View className="flex flex-row justify-between items-center pb-8">
          <Text
            className="text-white text-xl iphoneX:text-2xl"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Choose month
          </Text>
          <TouchableOpacity
            className="bg-[#2E2E3A] rounded-full p-2"
            onPress={onCloseModal}
          >
            <CloseBtn onClose={onCloseModal} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {reversed?.map((each, index) => {
            // const startUnix = gameStart ? gameStart : 0;
            // const endUnix = startUnix + each.length * 24 * 60 * 60 * 1000;

            // const startDate = format(new Date(startUnix), "dMMM");
            // const endDate = format(new Date(endUnix), "dMMM h:mmaaa");
            return (
              <TouchableOpacity
                key={each.id}
                onPress={() => handlePress(each.id)}
              >
                <View
                  className={clsx(
                    "px-4 py-2.5 bg-[#2E2E3A] rounded-xl mb-4 flex flex-row items-center",
                    each.id === selected && "font-bold"
                  )}
                >
                  <View className="flex-1">
                    <View className="flex flex-row items-start-center">
                      <Text
                        className="text-white text-base iphoneX:text-xl capitalize"
                        style={{ fontFamily: "BaiJamjuree-Bold" }}
                      >
                        {each.name}
                      </Text>
                      {each.id === current ? (
                        <Text
                          className="text-[#AFAFAF] text-base iphoneX:text-xl pl-2 font-normal capitalize"
                          style={{ fontFamily: "BaiJamjuree-Bold" }}
                        >
                          (Active)
                        </Text>
                      ) : null}
                    </View>
                    <Text className="text-[#AFAFAF] text-[10px] iphoneX:text-sm">{`${each.startString} - ${each.endString}`}</Text>
                  </View>
                  <View
                    className={clsx(
                      "w-4 aspect-square",
                      each.id !== selected && "hidden"
                    )}
                  >
                    <SvgIcons iconType="tick" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </UseModal>
  );
};

export default PeriodModal;
