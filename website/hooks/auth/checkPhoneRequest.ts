import axios from "axios";

export const checkPhoneRequest = async (phone: string) => {
  try {
    const response = await axios({
      url: `/api/checkPhone`,
      method: "POST",
      data: {
        phone: phone,
      },
    });

    const res = response.data as {
      user?: string;
      status: "success" | "failed";
    };
    if (res.user) {
      return res.user;
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};

export const mergeUsers = async (phoneUID: string, annonymUID?: string) => {
  if (phoneUID && annonymUID) {
    await axios({
      url: `/api/mergeUsers`,
      method: "POST",
      data: {
        phoneUID,
        annonymUID,
      },
    });
  }
};
