import {
  View,
  Text,
  ImageBackground,
  // TouchableOpacity,
  SafeAreaView,
} from "react-native";
import UseModal from "@components/UseModal";
// import UploadTaskCta from "./UploadTaskCta";
// import { useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { useGameContext } from "@providers/game/GameProvider";
import { useTaskContext } from "@providers/task/TaskProvider";
import BackBtn from "@components/Buttons/BackBtn";
import BasicCTA from "@components/Buttons/BasicCTA";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const UploadTaskModal: React.FC<Props> = ({ onClose, isOpen }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const navigation = useNavigation();
  // const { game } = useGameContext();
  const {
    task,
    // selectedDayNumber,
    // selectedDayUnix
  } = useTaskContext();

  // const onClose = () => setIsOpen(false);

  const handleCta = () => {
    // navigation.navigate("PostInteraction");
    // navigation.navigate("UploadTask", {
    //   gameId: game ? game.id : "",
    //   // teamId: team ? team.id : "",
    //   taskId: task ? task.id : "",
    //   // selectedDayNumber,

    //   // selectedDayUnix,
    // });

    setTimeout(onClose, 100);
  };

  return (
    <>
      {/* <View
      // style={{ position: 's', left: 0, bottom: 0, right: 0 }}
      //className="flex  justify-center items-center"
      >
        <TouchableOpacity onPress={() => setIsOpen(true)}>
          <UploadTaskCta />
        </TouchableOpacity>
      </View> */}

      <UseModal
        visible={isOpen}
        onClose={onClose}
        width="w-full"
        height="h-full"
        bgColor="bg-[#100F1A]"
        tone="dark"
      >
        <SafeAreaView className="flex-1 flex flex-col mx-4 mb-8 border border-[#565656] rounded-lg">
          <View className="bg-[#1E1E1E] flex-[0.8]">
            <View className="flex flex-row justify-center items-center relative m-4">
              <View className="absolute left-0 top-0 bottom-0 flex justify-center items-center">
                <BackBtn
                  onBack={onClose}
                  color="#FFFFFF"
                  classStr="w-4 h-4 iphoneX:w-6 iphoneX:h-6"
                />
              </View>
              <Text className="text-white text-xl iphoneX:text-[28px] font-bold">
                Let's workout
              </Text>
            </View>
            <View className="flex-1 flex flex-col">
              <ImageBackground
                source={{
                  uri: `https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_1_xlx6itUNwI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659081016743`,
                }}
                resizeMode={"contain"}
                style={{ flex: 1, marginVertical: 12, maxHeight: 500 }}
              />
              <Text className="text-lg iphoneX:text-2xl text-white font-bold text-center my-4">
                {task?.name}
              </Text>
            </View>
          </View>
          <View className="bg-[#565656]" />
          <View className="flex-[0.2] flex justify-between m-4">
            <Text className="text-base text-white text-center px-8">
              We will take your camera access when you workout. This is to give
              you points for your workout
            </Text>
            <View className="">
              {/* <Text className="text-sm text-white text-center px-8 pb-4">
                Note: The video will be processed by AIScan post workout
              </Text> */}
              <BasicCTA
                text="I'm Ready!"
                onPress={handleCta}
                paddingStr="py-4"
              />
            </View>
          </View>
        </SafeAreaView>
      </UseModal>
    </>
  );
};

export default UploadTaskModal;
