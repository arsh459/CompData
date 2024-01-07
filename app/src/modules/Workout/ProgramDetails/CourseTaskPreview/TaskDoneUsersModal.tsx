import UseModal from "@components/UseModal";
import UserImage from "@components/UserImage";
import { Activity } from "@models/Activity/Activity";
import { UserInterface } from "@models/User/User";
import Header from "@modules/Header";
import { calculateFPFromCalories } from "@providers/task/hooks/useTaskStream";
import { FlashList } from "@shopify/flash-list";
import { View, Text } from "react-native";
import FastImage from "react-native-fast-image";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  taskDoneLists: { user: UserInterface; act: Activity }[];
  onNext: () => void;
  taskFP: number;
}

const TaskDoneUsersModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  taskDoneLists,
  onNext,
  taskFP,
}) => {
  const renderItem = ({
    item,
  }: {
    item: { user: UserInterface; act: Activity };
  }) => {
    // const { fpAward } = calculateFPFromProgress(item.act.progress || 0, taskFP);

    const fpAward = calculateFPFromCalories(item.act.calories);
    return (
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row items-center">
          <View
            className="rounded-full"
            style={{ borderWidth: 2, borderColor: "#FF5970" }}
          >
            <UserImage image={item.user.profileImage} name={item.user.name} />
          </View>
          <Text className="text-base text-white ml-2">{item.user.name}</Text>
        </View>
        <View className="flex flex-row items-center">
          <FastImage
            source={{
              uri: `https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,f-auto/Frame_1432_mILSIgxCi.png?updatedAt=1680331692444`,
            }}
            className="w-4 aspect-square"
          />
          <Text className="text-base text-white mx-2">{fpAward}FP</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item: { user: UserInterface; act: Activity }) =>
    item.user.uid;

  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      hasHeader={true}
      blurAmount={20}
      fallbackColor="#232136"
    >
      <Header
        back={true}
        onBack={onCloseModal}
        headerColor="transparent"
        tone="dark"
      />
      <Text
        className="text-lg text-white px-4"
        style={{ fontFamily: "Nunito-Semibold" }}
      >
        People who also completed task
      </Text>
      <View className="w-4 aspect-square" />
      <FlashList
        data={taskDoneLists}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onEndReachedThreshold={0.4}
        onEndReached={onNext}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View className="w-4 aspect-square" />}
      />
    </UseModal>
  );
};

export default TaskDoneUsersModal;
