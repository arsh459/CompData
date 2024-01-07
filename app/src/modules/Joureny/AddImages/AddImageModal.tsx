import CloseBtn from "@components/Buttons/CloseBtn";
import UseModal from "@components/UseModal";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@modules/Header";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { cameraIcon, galleryIcon } from "@constants/imageKitURL";
import { useState } from "react";
import { ImagePickerExpoRN } from "./ImagePickerExpo";
import { Camera } from "expo-camera";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddImageModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [photo, setPhoto] = useState();
  const [startCamera, setStartCamera] = useState(false);

  console.log(photo, "for phot.uri");
  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
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
    >
      <LinearGradient
        colors={["#859EFF3D", "#C285FF70"]}
        className="flex-1 justify-center"
      >
        <Header
          headerColor="transparent"
          tone="dark"
          optionNode={
            <View>
              <CloseBtn onClose={onClose} color="#FFFFFF" />
            </View>
          }
        />
        {!startCamera ? (
          <View className="bg-[#262630] mx-4 rounded-3xl border border-[#FFFFFF70]">
            <Text
              className="text-white text-base text-center  py-3 iphoneX:text-lg"
              style={{ fontFamily: "BaiJamjuree-SemiBold" }}
            >
              Choose Option
            </Text>
            <View className="bg-[#FFFFFF70] w-full h-px" />
            <View className="flex flex-row justify-evenly ">
              <Pressable className="py-5" onPress={() => __startCamera()}>
                <Image
                  source={{ uri: cameraIcon }}
                  className="w-14 aspect-square"
                  resizeMode="contain"
                />
              </Pressable>
              <View className="bg-[#FFFFFF70] w-px h-full" />

              <View className="py-5">
                <Image
                  source={{ uri: galleryIcon }}
                  className="w-14 aspect-square"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        ) : (
          <ImagePickerExpoRN
            setPhoto={setPhoto}
            onStartCamera={__startCamera}
            setStartCamera={setStartCamera}
            startCamera={startCamera}
          />
        )}
        <View className="flex-1 mx-auto">
          {/* {photo && (
            <Image source={{ uri: photo }} className="w-full aspect-square" />
          )} */}
        </View>
      </LinearGradient>
    </UseModal>
  );
};

export default AddImageModal;
