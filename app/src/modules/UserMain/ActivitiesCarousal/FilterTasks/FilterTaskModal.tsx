import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import { completedIconGreenTick } from "@constants/imageKitURL";
import { getGameNameReadable } from "@utils/challange/utils";
import clsx from "clsx";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  selectedGameId: string | undefined;
  setSelectedGameId: (val: string | undefined) => void;
  userGames: string[];
}

const FilterTasksModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  selectedGameId,
  setSelectedGameId,
  userGames,
}) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onCloseModal}
      width="w-full"
      height="h-full"
      fallbackColor="#100F1A"
      blurAmount={35}
      tone="dark"
    >
      <SafeAreaView className="flex-1 flex justify-center">
        <View className="flex flex-row items-center justify-evenly w-full m-5 iphoneX:m-8">
          <Text className="text-white font-extrabold text-2xl">
            Select Task
          </Text>
          <CloseBtn onClose={onCloseModal} color="#FFFFFF" />
        </View>
        <ScrollView className="flex-1" bounces={false}>
          <Pressable
            className={clsx(
              "mx-8 py-2.5 border-white/70 relative cursor-pointer",
              "border-b"
            )}
            onPress={() => {
              setSelectedGameId(undefined);
              onCloseModal();
            }}
          >
            <View className="flex flex-row justify-center">
              <Text
                className={clsx(
                  "pl-2 font-extralight text-white capitalize",
                  !selectedGameId && "font-extrabold"
                )}
              >
                All Tasks
              </Text>
            </View>

            {!selectedGameId && (
              <Image
                source={{
                  uri: completedIconGreenTick,
                }}
                className={clsx(
                  "w-5 h-5 absolute top-1/2 right-0 -translate-y-1/2 mx-4"
                )}
              />
            )}
          </Pressable>

          {userGames.map((id, index, arr) => {
            return (
              <Pressable
                key={id}
                className={clsx(
                  "mx-8 py-2.5 border-white/70 relative cursor-pointer",
                  index !== arr.length - 1 && "border-b"
                )}
                onPress={() => {
                  setSelectedGameId(id);
                  onCloseModal();
                }}
              >
                <View className="flex flex-row justify-center">
                  <Text
                    className={clsx(
                      "pl-2 text-white capitalize font-extralight",
                      id === selectedGameId && "font-extrabold"
                    )}
                  >
                    {getGameNameReadable(id)}
                  </Text>
                </View>

                <Image
                  source={{
                    uri: completedIconGreenTick,
                  }}
                  className={clsx(
                    "w-5 h-5 absolute top-1/2 right-0 -translate-y-1/2 mx-4",
                    id !== selectedGameId && "hidden"
                  )}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </UseModal>
  );
};
export default FilterTasksModal;
