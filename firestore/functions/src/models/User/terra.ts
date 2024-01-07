import * as admin from "firebase-admin";
import { TerraUser } from "../Terra/TerraUser";
import { UserInterface } from "./User";
import axios from "axios";
import { devId, terraAPIKey } from "../../constants/terra/constants";

export const saveTerraUser = async (uid: string, terraUser: TerraUser) => {
  await admin.firestore().collection("users").doc(uid).update({
    terraUser: terraUser,
  });
};

export const terraDeleteUser_external = async (user_id: string) => {
  try {
    await axios({
      url: "https://api.tryterra.co/v2/auth/deauthenticateUser",
      method: "DELETE",
      headers: {
        "dev-id": devId,
        "x-api-key": terraAPIKey,
      },
      params: {
        user_id: user_id,
      },
    });

    // console.log("res", response);

    return {
      status: "success",
    };
  } catch (error) {
    console.log("error");
    return {
      status: "failed",
    };
  }
};

export const removeTerraUser = async (uid: string, user_id?: string) => {
  if (user_id) {
    await terraDeleteUser_external(user_id);
  }

  await admin.firestore().collection("users").doc(uid).update({
    terraUser: admin.firestore.FieldValue.delete(),
  });
};

export const getTerraUser = async (terraUserId: string) => {
  const firestoreUser = await admin
    .firestore()
    .collection("users")
    .where("terraUser.user_id", "==", terraUserId)
    .get();

  if (firestoreUser.docs.length > 0) {
    return firestoreUser.docs[0].data() as UserInterface;
  }

  return undefined;
};
