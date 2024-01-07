import { Platform } from "react-native";
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from "react-native-permissions";

const checkStoragePerm = async () => {
  if (Platform.OS === "android") {
    const perm = await checkMultiple([
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
    // PERMISSIONS.IOS.
    if (
      perm["android.permission.READ_EXTERNAL_STORAGE"] === "granted" &&
      perm["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted"
    ) {
      return true;
    } else {
      return false;
    }
  }

  return true;
};

const getStoragePerm = async () => {
  if (Platform.OS === "android") {
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

  return true;
};

export const handleStoragePermission = async () => {
  const status = await checkStoragePerm();
  if (!status) {
    return await getStoragePerm();
  }

  return status;
};
