import {
  TouchableOpacity,
  StyleProp,
  Text,
  View,
  ViewStyle,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import clsx from "clsx";
import { getFileDetails, getFileWidthHeight } from "./utils";
import { RNS3 } from "react-native-upload-aws-s3";
import { createAWSMedia } from "./createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import {
  BUCKET,
  S3_AWS_REGION,
  SECRET_KEY,
  ACCESS_KEY,
} from "react-native-dotenv";
import { useRoute } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import crashlytics from "@react-native-firebase/crashlytics";
import { handleStoragePermission } from "@modules/LifeStyleMain/permissionHandler";
import { openSettings } from "react-native-permissions";

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

const UploadMedia: React.FC<Props> = ({
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

  const pickImage = async () => {
    weEventTrack("UploadMedia_PickImage", { screenName: route.name });

    const permissionStatus = await handleStoragePermission();
    weEventTrack(`galleryPermissionStatus_${permissionStatus}`, {});

    if (permissionStatus) {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: mediaSelectType
            ? ImagePicker.MediaTypeOptions[mediaSelectType]
            : ImagePicker.MediaTypeOptions.All,
          // allowsEditing: true,
          // allowsMultipleSelection: true,
          // aspect: [4, 3],
          // quality: 1,
        });

        //

        handleImagePicked(result);
      } catch (error: any) {
        crashlytics().recordError(error);
        console.log(error);
      }
    } else {
      Alert.alert(
        "No Permissions",
        "Please provide permissions to access the gallery",
        [{ text: "Go to Settings", onPress: () => openSettings() }]
      );
    }
  };

  const handleImagePicked = async (
    pickerResult: ImagePicker.ImagePickerResult
  ) => {
    try {
      if (pickerResult.canceled) {
        return;
      } else {
        const assets = pickerResult.assets;

        if (assets.length) {
          const { fileName, type, fileExtension, fileSize } = getFileDetails(
            assets[0]
          );

          const { width, height, duration } = await getFileWidthHeight(
            assets[0],
            type
          );

          const options = {
            keyPrefix: `webapp/${uid}/`,
            bucket: BUCKET,
            region: S3_AWS_REGION,
            accessKey: ACCESS_KEY,
            secretKey: SECRET_KEY,
            successActionStatus: 201,
          };

          try {
            const response = await RNS3.put(
              {
                uri: assets[0].uri,
                name: fileName,
                type: "image/jpg",
              },
              options
            ).progress(
              (e: { loaded: number; total: number; percent: number }) => {
                setProgress && setProgress(e.percent);
              }
            );

            if (
              response.status === 201 &&
              response.body.postResponse.location &&
              response.body.postResponse.key &&
              response.body.postResponse.bucket
            ) {
              const awsMedia = createAWSMedia(
                fileName,
                type === "image/jpg" ? "image" : "video",
                width,
                height,
                fileExtension,
                fileName,
                fileSize,
                response.body.postResponse.key,
                response.body.postResponse.bucket,
                fileName,
                S3_AWS_REGION,
                response.body.postResponse.location,
                duration
              );

              setMedia([awsMedia]);
            } else {
              onFailed
                ? onFailed("Failed to upload media to S3.")
                : console.log("Failed to upload media to S3: ", response);
            }
          } catch (error: any) {
            onFailed
              ? onFailed((error as Error).message)
              : console.log((error as Error).message);

            crashlytics().recordError(error);
          }
        }
      }
    } catch (e: any) {
      console.log("e", e);
      onFailed ? onFailed((e as Error).message) : alert("Upload failed");
      crashlytics().recordError(e);
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

export default UploadMedia;
