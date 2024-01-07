// import { db } from "@config/firebase";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
// import { doc, updateDoc } from "firebase/firestore";

import firestore from "@react-native-firebase/firestore";

export const updateUserBriefFields = async (
  uid: string,
  name?: string,
  instagramHandle?: string,
  email?: string,
  img?: CloudinaryMedia | AWSMedia,
  bio?: string
) => {
  await firestore()
    .collection("users")
    .doc(uid)
    .update(
      // doc(db, "users", uid),
      {
        ...(name ? { name } : {}),
        ...(instagramHandle ? { instagramHandle } : {}),
        ...(email ? { email } : {}),
        ...(img ? { profileImage: img } : {}),
        ...(bio ? { bio } : {}),
      }
    );
};
