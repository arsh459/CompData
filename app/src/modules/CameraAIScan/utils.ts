import {
  aiEncryptIcon,
  aiLiveIcon,
  aiNutriEncrypt,
  aiNutriIcon,
  aiPostureIcon,
  cameraAiScanBg,
  cameraNutriAiScanBg,
} from "@constants/imageKitURL";

export interface CameraPermissionData {
  mainBgImg: string;
  text: string;
  featureArr: { imgUrl: string; text: string }[];
  dataFor?: "workout" | "nutrition";
}

export const workoutCameraPermissionData: CameraPermissionData = {
  dataFor: "workout",
  mainBgImg: cameraAiScanBg,
  text: "Need camera access to enable AI Scan",
  featureArr: [
    { imgUrl: aiPostureIcon, text: `AI posture \ncorrection` },
    {
      imgUrl: aiLiveIcon,
      text: `Interactive\nLive`,
    },
    {
      imgUrl: aiEncryptIcon,
      text: `Encrypted & \nPrivate`,
    },
  ],
};
export const nutritionCameraPermissionData: CameraPermissionData = {
  dataFor: "nutrition",
  mainBgImg: cameraNutriAiScanBg,
  text: "Need camera access to enable AI Scan",
  featureArr: [
    {
      imgUrl: aiNutriIcon,
      text: `AI based nutrition \ntracking`,
    },
    {
      imgUrl: aiNutriEncrypt,
      text: `Encrypted & \nPrivate scanning`,
    },
  ],
};
