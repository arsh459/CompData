import firestore from "@react-native-firebase/firestore";

export const play =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame_1391_jtLOu55kT.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677582535966";
export const pause =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Pause_TmhCOE2YM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677578248524";
export const mute =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Union_LPYgXx7ZU.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677578728469";
export const unmute =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector__2__lxkBT1nOz.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677578249442";
export const mute1 =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component%20140_gpo-7UzZK.png?updatedAt=1692887579993";
export const unmute1 =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component%20141_8wgshi-Zh.png?updatedAt=1692887585705";
export const backward10Sec =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector__1__gY53eO5uHS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677578248541";
export const forward10Sec =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector_42Z9avEEH.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677578249018";
export const back =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/arrowhead-left_voUo9MpSu.png?updatedAt=1678955851843";
export const next =
  "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/arrowhead-right_7BiyEtnFI.png?updatedAt=1678955851132";

export const getPositionFormat = (num: number) => {
  const numInSec = num / 1000;
  const min = Math.floor(numInSec / 60).toString();
  const sec = Math.floor(numInSec % 60).toString();
  return `${min.length <= 1 ? "0" : ""}${min}:${
    sec.length <= 1 ? "0" : ""
  }${sec}`;
};

export const saveTaskShareDeepLink = async (
  taskId?: string,
  deepLink?: string
) => {
  if (taskId && deepLink) {
    await firestore().collection("tasks").doc(taskId).update({ deepLink });
  }
};
