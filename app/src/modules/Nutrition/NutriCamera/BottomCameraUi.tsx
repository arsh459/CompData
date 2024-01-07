import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  cameraClickIcon,
  focusAreaIcon,
  nutritionClickPic,
  pickGallaryIcon,
  skipIcon,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

interface Props {
  cameraRef: React.RefObject<Camera>;
  setPhoto: (pic: ImagePicker.ImageInfo | CameraCapturedPicture) => void;
}

const BottomCameraUi: React.FC<Props> = ({ cameraRef, setPhoto }) => {
  const navigation = useNavigation();

  const takePic = async () => {
    const newPhoto = await cameraRef.current!.takePictureAsync({
      skipProcessing: true,
    });
    setPhoto(newPhoto);
  };

  const pickPhoto = async () => {
    // const options = {
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   base64: false,
    //   exif: false,
    // };
    // const newPhoto = await ImagePicker.launchImageLibraryAsync(options);
    // if (newPhoto.cancelled) {
    //   return;
    // }
    // setPhoto(newPhoto);
  };

  return (
    <View className="absolute left-0 right-0 top-0 bottom-0 z-10">
      <View className="flex-1 flex justify-center items-center">
        <Image
          source={{ uri: focusAreaIcon }}
          className="w-1/2 aspect-square"
        />
      </View>
      <View className="w-full rounded-t-3xl bg-black/40 p-4">
        <View className="w-full flex flex-row">
          <Image
            source={{ uri: nutritionClickPic }}
            className="w-1/4 aspect-[72/96]"
          />
          <View className="w-4 aspect-square" />
          <View className="flex-1">
            <Text
              className="text-base text-white"
              style={{ fontFamily: "BaiJamjuree-Bold" }}
            >
              Click to add this to Meal Tracker
            </Text>
            <Text
              className="text-xs text-[#FFFFFFD9]"
              style={{ fontFamily: "BaiJamjuree-Regular" }}
            >
              Click a picture of the meal to get fitpoints or you can skip as
              well by Clicking on skip will lose the fitpoints.
            </Text>
          </View>
        </View>
        <View className="w-4 aspect-square" />
        <View className="w-full flex flex-row justify-between items-center">
          <TouchableOpacity
            className="w-1/5 aspect-square p-1"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <Image
              source={{ uri: skipIcon }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-1/5 aspect-square" onPress={takePic}>
            <Image
              source={{ uri: cameraClickIcon }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="w-1/5 aspect-square p-4"
            onPress={pickPhoto}
          >
            <Image
              source={{ uri: pickGallaryIcon }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BottomCameraUi;
