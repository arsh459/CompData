import {
  TouchableOpacity,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import clsx from "clsx";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
// import {
//   BUCKET,
//   S3_AWS_REGION,
//   SECRET_KEY,
//   ACCESS_KEY,
// } from "react-native-dotenv";
// import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";
// import {
//   getFileDetails,
//   getFileWidthHeight,
// } from "@components/MediaPicker/utils";
// import { createAWSMedia } from "@components/MediaPicker/createUtils";
import useCameraImage from "@modules/ImageCaptureScreen/store/useCameraImage";
import { shallow } from "zustand/shallow";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  defaultBtnText?: string;
  setMedia: (media: (CloudinaryMedia | AWSMedia)[]) => void;
  setProgress?: (val: number) => void;
  onFailed?: (msg: string) => void;
  uid: string;
  mediaSelectType?: "Videos" | "Images";
}

const UploadViaPhone: React.FC<Props> = ({
  children,
  className,
  style,
  defaultBtnText,
  setMedia,
  setProgress,
  onFailed,
  uid,
  mediaSelectType,
}) => {
  const route = useRoute();
  const { _pickGalleryPhoto, _retakePicture, setStage } = useCameraImage(
    (state) => ({
      _pickGalleryPhoto: state._pickGalleryPhoto,
      _retakePicture: state._retakePicture,
      setStage: state.setStage,
    }),
    shallow
  );

  const pickImage = async () => {
    weEventTrack("UploadMedia_PickImage", { screenName: route.name });
    try {
      setStage("loadingImage");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaSelectType
          ? ImagePicker.MediaTypeOptions[mediaSelectType]
          : ImagePicker.MediaTypeOptions.All,
      });
      _pickGalleryPhoto(result);
    } catch (error: any) {
      crashlytics().recordError(error);
      console.log(error);
      _retakePicture();
    }
  };

  return (
    <View
      className={clsx(
        !className && !style
          ? "flex-1 flex justify-center items-center"
          : className
      )}
      style={style}
    >
      {children ? (
        <TouchableOpacity onPress={pickImage}>{children}</TouchableOpacity>
      ) : (
        <TouchableOpacity className="w-max" onPress={pickImage}>
          <Text className="font-medium">
            {defaultBtnText ? defaultBtnText : "Upload Media"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UploadViaPhone;
