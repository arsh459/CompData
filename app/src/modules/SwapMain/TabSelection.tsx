import { useAlgoliaStore } from "@hooks/algolia/useAlgoliaStore";
import useDietPlanStage from "@modules/Nutrition/store/useDietPlanStage";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { shallow } from "zustand/shallow";
const TabSelection = () => {
  const { recommended, toggleRecommended } = useAlgoliaStore(
    (state) => ({
      recommended: state.recommended,
      toggleRecommended: state.toggleRecommended,
    }),
    shallow
  );
  const [isDietician, setIsDietician] = useState<boolean>(false);

  const { badge } = useDietPlanStage(
    (state) => ({ badge: state.badge }),
    shallow
  );

  useEffect(() => {
    setIsDietician(badge?.creatorIds?.length ? true : false);
    toggleRecommended(badge?.creatorIds?.length ? true : false);
  }, [badge]);

  return (
    <>
      {isDietician ? (
        <View className="px-4 pb-4 flex flex-row items-center justify-start">
          <TouchableOpacity
            className={clsx(
              recommended ? "border-b border-[#F4B73F]" : "",
              "mr-4"
            )}
            onPress={() => {
              toggleRecommended(true);
            }}
          >
            <Text
              className={clsx(
                recommended ? "text-white" : "text-white/60",
                " text-base tracking-tight"
              )}
              style={{ fontFamily: "Nunito-Regular" }}
            >
              Recommened
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={clsx(recommended ? "" : "border-b border-[#F4B73F]")}
            onPress={() => {
              toggleRecommended(false);
            }}
          >
            <Text
              className={clsx(
                recommended ? "text-white/60" : "text-white",
                " text-base tracking-tight text"
              )}
              style={{ fontFamily: "Nunito-Regular px-2" }}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default TabSelection;
