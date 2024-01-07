import axios from "axios";

export const callReconcileTerraUser = async (uid: string) => {
  try {
    await axios({
      method: "post",
      url: "https://asia-south1-holidaying-prod.cloudfunctions.net/reconcileTerraUser",
      data: {
        uid,
      },
    });
  } catch (error) {
    return;
  }
};
