import ImageWithURL from "@components/ImageWithURL";
import UseModal from "@components/UseModal";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  isOpen: boolean;
  imgURI?: string;
  text?: string;
  onClose: () => void;
  onBackdrop: () => void;
}

const ListPlanModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onBackdrop,
  imgURI,
  text,
}) => {
  return (
    <UseModal
      visible={isOpen}
      onClose={onClose}
      width="w-full"
      height="h-full"
      fallbackColor="#13121E"
      blurAmount={35}
      tone="dark"
      hasHeader={true}
      classStr="flex justify-center items-center p-6"
    >
      <View className="w-screen h-screen bg-black/70 flex justify-center items-center relative z-0">
        <TouchableOpacity
          className="absolute inset-0 -z-10"
          onPress={onClose}
        />

        <View className="  p-5  relative z-0">
          <View className="  bg-white/10 backdrop-blur-3xl m-1 rounded-3xl">
            <View className="flex flex-col justify-between   ">
              <View className="px-4 py-4 ">
                <View className="w-full">
                  <ImageWithURL
                    source={{ uri: imgURI }}
                    className="w-full aspect-[336/151] rounded-2xl"
                  />
                </View>
                <View className="pt-4 ">
                  <Text className="text-white/60 text-base">{text}</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            className="absolute  bottom-full right-5 p-2 rounded-full cursor-pointer bg-white/10 backdrop-blur-3xl"
            onPress={onClose}
          >
            <Text className="w-5 aspect-[10/7] text-center text-white font-bold">
              X
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </UseModal>
  );
};

export default ListPlanModal;
