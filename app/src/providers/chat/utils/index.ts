import { Platform } from "react-native";
import {
  PERMISSIONS,
  check,
  checkMultiple,
  request,
  requestMultiple,
} from "react-native-permissions";

export const getStoragePremission = async () => {
  if (Platform.OS === "ios") {
    const perm = await checkMultiple([
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    ]);

    if (
      perm["ios.permission.PHOTO_LIBRARY"] === "granted" &&
      perm["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] === "granted"
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    const perm = await checkMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      perm["android.permission.READ_EXTERNAL_STORAGE"] === "granted" &&
      perm["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted"
    ) {
      return true;
    } else {
      return false;
    }
  }
};
export const getMicPermission = async () => {
  if (Platform.OS === "ios") {
    const perm = await check(PERMISSIONS.IOS.MICROPHONE);
    // console.log("ios microphone permission check", perm)
    return perm;
  } else {
    const perm = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
    return perm;
  }
};
export const requestMicPermission = async () => {
  if (Platform.OS === "ios") {
    const perm = await request(PERMISSIONS.IOS.MICROPHONE);
    // console.log("ios microphone permission request result", perm)
    return perm;
  } else {
    const perm = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    return perm;
  }
};

export const requestStoragePermission = async () => {
  if (Platform.OS === "ios") {
    const perm = await requestMultiple([
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    ]);

    // console.log("storage write permission", perm )

    if (
      perm["ios.permission.PHOTO_LIBRARY"] === "granted" &&
      perm["ios.permission.PHOTO_LIBRARY_ADD_ONLY"] === "granted"
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    const perm = await requestMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      perm["android.permission.READ_EXTERNAL_STORAGE"] === "granted" &&
      perm["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted"
    ) {
      return true;
    } else {
      return false;
    }
  }
};
