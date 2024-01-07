import { postProfile } from "./interface";
import * as admin from "firebase-admin";

export const saveProfileData = async (body: postProfile) => {
  if (body.uid) {
    await admin
      .firestore()
      .collection("assignment")
      .doc(body.uid)
      .set(
        {
          uid: body.uid,
          ...(body.name && typeof body.name === "string"
            ? { name: body.name }
            : {}),
          ...(body.age && typeof body.age === "number"
            ? { age: body.age }
            : {}),
          ...(body.bio && typeof body.bio === "string"
            ? { bio: body.bio }
            : {}),
          ...(body.linkedIn && typeof body.linkedIn === "string"
            ? { linkedIn: body.linkedIn }
            : {}),
          ...(body.fb && typeof body.fb === "string" ? { fb: body.fb } : {}),
          ...(body.instagram && typeof body.instagram === "string"
            ? { instagram: body.instagram }
            : {}),
          ...(body.img && typeof body.img === "string"
            ? { img: body.img }
            : {}),
        },
        { merge: true },
      );
  }
};
