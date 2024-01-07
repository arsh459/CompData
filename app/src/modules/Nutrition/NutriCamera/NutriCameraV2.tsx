import { useRef, useState } from "react";
import { View } from "react-native";
import { Camera, CameraCapturedPicture } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import BottomCameraUi from "./BottomCameraUi";
import PreviewImageUi from "./PreviewImageUi";
// import { useNavigation } from "@react-navigation/native";
// import {
//   ACCESS_KEY,
//   BUCKET,
//   S3_AWS_REGION,
//   SECRET_KEY,
// } from "react-native-dotenv";
// import { createAWSMedia } from "@components/MediaPicker/createUtils";
// import { useUserContext } from "@providers/user/UserProvider";
// import { RNS3 } from "react-native-upload-aws-s3";
// import { useTaskContext } from "@providers/task/TaskProvider";
// import {
//   createVideoPost,
//   saveNewPostWithActivityWithTaskParams,
// } from "@utils/post/createUtils";
// import { useGameContext } from "@providers/game/GameProvider";
// import {
//   getTeamCaptainIdFromParticipating,
//   getTeamIdFromParticipating,
// } from "@utils/utills";
// import PermissionWrapper from "./PermissionWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useCameraPermissionV3 } from "@hooks/permissions/useCameraPermissionsV3";
// import Header from "@modules/Header";
import PermissionWrapper from "@modules/Workout/ProgramDetails/TaskSubmitV3/PermissionWrapper";
import Loading from "@components/loading/Loading";
import { nutritionCameraPermissionData } from "@modules/CameraAIScan/utils";

const NutriCameraV2 = () => {
  const cameraRef = useRef<Camera>(null);
  // const { user } = useUserContext();
  // const navigation = useNavigation();
  const [photo, setPhoto] = useState<
    ImagePicker.ImageInfo | CameraCapturedPicture
  >();
  // const { task } = useTaskContext();
  // const { selectedGameId } = useGameContext();

  const setPhotoRequest = (
    img: ImagePicker.ImageInfo | CameraCapturedPicture
  ) => {
    setPhoto(img);

    weEventTrack("nutrition_clickImage", {});
  };

  const takeImage = async (
    media: ImagePicker.ImageInfo | CameraCapturedPicture
  ) => {
    // try {
    //   const fileName = `${new Date().toISOString()}.jpg`;
    //   const fileExtension = "jpg";
    //   const fileSize = media.base64 ? media.base64.length : 0;
    //   const { width, height } = media;
    //   const duration = 0;
    //   const options = {
    //     keyPrefix: `webapp/${user?.uid}/`,
    //     bucket: BUCKET,
    //     region: S3_AWS_REGION,
    //     accessKey: ACCESS_KEY,
    //     secretKey: SECRET_KEY,
    //     successActionStatus: 201,
    //   };
    //   try {
    //     const response = await RNS3.put(
    //       {
    //         uri: media.uri,
    //         name: fileName,
    //         type: "image/jpg",
    //       },
    //       options
    //     ).progress((e: { loaded: number; total: number; percent: number }) => {
    //     });
    //     if (
    //       response.status === 201 &&
    //       response.body.postResponse.location &&
    //       response.body.postResponse.key &&
    //       response.body.postResponse.bucket
    //     ) {
    //       const awsMedia = createAWSMedia(
    //         fileName,
    //         "image",
    //         width,
    //         height,
    //         fileExtension,
    //         fileName,
    //         fileSize,
    //         response.body.postResponse.key,
    //         response.body.postResponse.bucket,
    //         fileName,
    //         S3_AWS_REGION,
    //         response.body.postResponse.location,
    //         duration
    //       );
    //       const leaderId = getTeamCaptainIdFromParticipating(
    //         user?.participatingInGameWithTeam,
    //         selectedGameId
    //       );
    //       const teamId = getTeamIdFromParticipating(
    //         user?.participatingInGameWithTeam,
    //         selectedGameId
    //       );
    //       if (user?.uid && selectedGameId && task?.id) {
    //         const post = createVideoPost(
    //           [awsMedia],
    //           user?.uid,
    //           selectedGameId,
    //           leaderId,
    //           teamId,
    //           task?.id,
    //           user?.name,
    //           user?.profileImage,
    //           undefined
    //         );
    //         saveNewPostWithActivityWithTaskParams(
    //           teamId ? teamId : selectedGameId,
    //           post,
    //           selectedGameId,
    //           task?.id,
    //           0,
    //           task?.name,
    //           task?.thumbnails,
    //           undefined,
    //           undefined,
    //           "nutrition"
    //         );
    //       }
    //       if (navigation.canGoBack()) {
    //         setPhoto(undefined);
    //         navigation.navigate("Community");
    //       }
    //     } else {
    //     }
    //   } catch (error: any) {
    //     console.log((error as Error).message);
    //   }
    // } catch (error: any) {
    //   console.log(error);
    // }
    // weEventTrack("nutrition_submitTask", {});
  };

  const { permissionStatus, requestPermission } = useCameraPermissionV3();

  return (
    <View className="flex flex-1 bg-[#100F1A] pt-12">
      {permissionStatus === "granted" ? (
        <>
          {photo ? (
            <PreviewImageUi
              onCancel={() => setPhoto(undefined)}
              onProceed={() => photo && takeImage(photo)}
              imgUri={photo.uri}
            />
          ) : (
            <View className="w-full flex-1 relative z-0">
              <Camera
                ref={cameraRef}
                className="flex-1 items-center justify-center"
              />
              <BottomCameraUi
                cameraRef={cameraRef}
                setPhoto={setPhotoRequest}
              />
            </View>
          )}
        </>
      ) : permissionStatus === "denied" ? (
        <PermissionWrapper
          ctaPress1={() => {}}
          ctaPress2={requestPermission}
          ctaText2="Give camera Permissions"
          ctaText1=""
          data={nutritionCameraPermissionData}
        />
      ) : permissionStatus === "unavailable" ||
        permissionStatus === "blocked" ||
        permissionStatus === "limited" ? (
        <PermissionWrapper
          ctaPress1={() => {}}
          ctaPress2={requestPermission}
          ctaText2="Give Permissions from Settings"
          ctaText1=""
          data={nutritionCameraPermissionData}
        />
      ) : (
        <View className="flex flex-1 justify-center items-center">
          <Loading width="w-10" height="h-10" />
        </View>
      )}
    </View>
  );
};

export default NutriCameraV2;
