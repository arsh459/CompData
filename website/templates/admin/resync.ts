import axios from "axios";

export interface FirestoreDaySync {
  status?: "success" | "failed";
  details?: { [day: string]: boolean };
}

export interface FirestoreUserSync {
  status?: "success" | "failed";
  details?: { [uid: string]: { [day: string]: boolean } };
}

export const terraResyncDay_internal = async (uid: string, day: string) => {
  try {
    const response = await axios({
      url: "/api/terra/resyncBucket",
      method: "POST",
      params: {
        uid,
        day,
      },
    });

    return response.data as FirestoreDaySync;
  } catch (error) {
    console.log("error", error);
    return {
      status: "failed",
      details: undefined,
    };
  }
};

export const terraResyncUser_internal = async (uid: string) => {
  try {
    const response = await axios({
      url: "/api/terra/resyncUser",
      method: "POST",
      params: {
        uid,
      },
    });

    // const data = response.data as SuccessWidgetResponse;
    return response.data as FirestoreUserSync;
  } catch (error) {
    console.log("error", error);
    return {
      status: "failed",
      details: undefined,
    };
  }
};
