// import { TerraUser } from "../../../models/Terra/TerraUser";
import axios from "axios";
import { devId, terraAPIKey } from "../../../constants/terra/constants";
// import { formatDate } from "./utils";
// import * as moment from "moment-timezone";
import { get1159Adder, getDayStartIST, getFormattedDateForUnix } from "./utils";
import { UserInterface } from "../../../models/User/User";
// import { removeTerraUser } from "../../../models/User/terra";
// import { boolean } from "fp-ts";
// import { boolean } from "fp-ts";
// import { getTerraUser } from "../../../models/User/terra";

export const triggerPastUpdates = async (
  terraUsers: UserInterface[],
  deauth: boolean,
) => {
  const now = Date.now();
  const now_7 = now - 7 * 24 * 60 * 60 * 1000;
  const remotePromises = [];
  for (const terraUser of terraUsers) {
    remotePromises.push(handlePast7(now_7, terraUser, deauth));
  }

  try {
    const statusesForUsers = await Promise.all(remotePromises);

    const userDateStatus: { [uid: string]: { [date: string]: boolean } } = {};
    for (let i = 0; i < terraUsers.length; i++) {
      userDateStatus[terraUsers[i].uid] = statusesForUsers[i];
    }

    return userDateStatus;
  } catch (error) {
    console.log("error in Promise all");

    return {};
  }
};

const handlePast7 = async (
  now_7: number,
  terraUser: UserInterface,
  deauth: boolean,
) => {
  const dateStatus: { [date: string]: boolean } = {};
  for (let i = 0; i <= 7; i++) {
    const time = now_7 + i * 24 * 60 * 60 * 1000;

    const unixDate = getDayStartIST(time);

    try {
      if (terraUser.terraUser?.user_id) {
        const endDate = unixDate + get1159Adder();

        console.log(
          `User: ${terraUser?.name} startDate:${unixDate} | endDate:${endDate} | user_id:${terraUser.terraUser?.user_id}`,
        );

        const { status } = await getActivitiesForDate(
          terraUser.uid,
          terraUser.terraUser?.user_id,
          unixDate,
          endDate,
          deauth,
        );

        dateStatus[getFormattedDateForUnix(unixDate)] =
          status === "success" ? true : false;
      }
    } catch (error: any) {
      console.log("error", error.message);

      dateStatus[getFormattedDateForUnix(unixDate)] = false;
    }
  }

  return dateStatus;
};

export const triggerUpdates = async (
  terraUsers: UserInterface[],
  startDate: number,
  endDate: number,
  deauth: boolean,
) => {
  const userStatus: { [uid: string]: boolean } = {};
  for (const terraUser of terraUsers) {
    try {
      // const firestoreUser = await getTerraUser(terraUser.user_id);

      console.log(
        `User: ${terraUser?.name} startDate:${startDate} | endDate:${endDate} | user_id:${terraUser.terraUser?.user_id}`,
      );

      if (terraUser.terraUser?.user_id) {
        const { status } = await getActivitiesForDate(
          terraUser.uid,
          terraUser.terraUser?.user_id,
          startDate,
          endDate,
          deauth,
        );

        userStatus[terraUser.uid] = status === "success" ? true : false;
      }
    } catch (error: any) {
      // console.log("error here", terraUser.user_id);
      console.log("error", error);
      userStatus[terraUser.uid] = false;
    }
  }

  return userStatus;
};

interface ActivityResponse {
  status?: "success";
}

export const getActivitiesForDate = async (
  uid: string,
  user_id: string,
  start_date: number,
  end_date: number,
  deauth: boolean,
) => {
  try {
    const resp = await axios({
      method: "get",
      url: "https://api.tryterra.co/v2/activity",
      headers: {
        "dev-id": devId,
        "x-api-key": terraAPIKey,
      },
      params: {
        user_id: user_id,
        start_date: start_date / 1000,
        end_date: end_date / 1000,
      },
    });

    const result = resp.data as ActivityResponse;
    return {
      status: result.status ? result.status : "failed",
    };
  } catch (error: any) {
    const errorJSON = error.toJSON();

    console.log(errorJSON);
    if (errorJSON.message === "Request failed with status code 424" && deauth) {
      try {
        // await removeTerraUser(uid, user_id);
        console.log("removed");
      } catch (error) {
        console.log("removing errored");
      }
    }

    // console.log("error message", error.toJSON());
    return {
      status: "failed",
    };
  }
};
