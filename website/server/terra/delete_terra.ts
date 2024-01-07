import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { headers } from "./widget_server";

export const terraDeleteUser_external = async (user_id: string) => {
  try {
    await axios({
      url: "https://api.tryterra.co/v2/auth/deauthenticateUser",
      method: "DELETE",
      headers: headers,
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

export const deleteTerraInFirestore = async (uid: string) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();

  await db
    .collection("users")
    .doc(uid)
    .update({ terraUser: firebase.firestore.FieldValue.delete() });
};

export const parseDeleteQuery = (query: ParsedUrlQuery) => {
  return {
    user_id:
      query.user_id && typeof query.user_id === "string" ? query.user_id : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
  };
};
