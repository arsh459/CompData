import { View, Text, useWindowDimensions } from "react-native";

import { FlashList } from "@shopify/flash-list";

const AiScrollCarousal = () => {
  const { width } = useWindowDimensions();

  const data = ["1", "2", "3", "4"];
  const estimatedItemSize = width * 0.5;

  const renderItem = ({ item }: { item: string }) => {
    return ChatPromptText(item);
  };

  return (
    <FlashList
      data={data}
      // className="flex-1"
      renderItem={renderItem}
      horizontal={true}
      estimatedItemSize={estimatedItemSize}
      bounces={false}
      ListFooterComponent={
        <>
          {data.length ? null : (
            <View className="h-full flex justify-center items-center">
              <Text className="text-base text-white">No Match Found</Text>
            </View>
          )}
        </>
      }
      ItemSeparatorComponent={() => <View className="w-2 aspect-square" />}
    />
  );
};

function ChatPromptText(item: string) {
  return (
    <View
      className="bg-[#8461DC] px-4  flex justify-center rounded-2xl w-3/5 aspect-[189/80] "
      key={item}
    >
      <Text
        className="text-[#f1f1f1]  text-xs"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Lorem ipsum dolor sit amet consectetur. Adipiscing pellentesque ut
        pellentesque turpis vitae commodo.
      </Text>
    </View>
  );
}

export default AiScrollCarousal;
