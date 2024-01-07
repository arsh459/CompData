import { View, SectionList, Text } from "react-native";
import { renderItemFpHome, renderSectionHeaderFpHome } from ".";
import Loading from "@components/loading/Loading";
import { useEarnedTasksSectionsAlgolia } from "./hooks/useEarnedTaskSectionsAlgolia";
import { useUserStore } from "@providers/user/store/useUserStore";

const StepsFp = () => {
  const uid = useUserStore((state) => state.user?.uid);
  const { onNext, sections, init } = useEarnedTasksSectionsAlgolia(
    uid,
    "steps"
  ); //to check on dev
  if (!init && !sections.length) {
    return (
      <View className="flex justify-center items-center flex-1">
        <Loading fill="#ff735c" width="w-16" height="h-16" />
      </View>
    );
  }
  return init && !sections.length ? (
    <View className="flex justify-center items-center flex-1">
      <Text
        className="text-[#FFFFFF8C] text-base iphoneX:text-lg py-12 text-center"
        style={{ fontFamily: "BaiJamjuree-SemiBold" }}
      >
        No Activites Found
      </Text>
    </View>
  ) : (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItemFpHome}
      renderSectionHeader={renderSectionHeaderFpHome}
      ItemSeparatorComponent={() => <View className="w-3 aspect-square" />}
      onEndReached={onNext}
    />
  );
};

export default StepsFp;
