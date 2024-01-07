import * as ScreenOrientation from "expo-screen-orientation";

export async function changeOrientationToLandscape() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  );
}

export async function changeOrientationToPortrait() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.PORTRAIT_UP
  );
}

export async function unlockAsyncFunc() {
  await ScreenOrientation.unlockAsync().catch((e) =>
    console.log("error unlocking")
  );
}
