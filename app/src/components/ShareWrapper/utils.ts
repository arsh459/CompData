import axios from "axios";
import { RouteKeys } from "@routes/MainStack";
import { BRANCH_KEY } from "react-native-dotenv";

export const getShareUrl = async (
  navTo?: RouteKeys,
  navToParams?: { [key: string]: string },
  title?: string,
  description?: string,
  image_url?: string,
  saveUrl?: (val: string) => void
): Promise<string | undefined> => {
  const options = {
    method: "POST",
    url: "https://api2.branch.io/v1/url",
    headers: { accept: "application/json", "content-type": "application/json" },
    data: {
      branch_key: BRANCH_KEY,
      channel: "SocialBoat",
      data: {
        navTo,
        ...navToParams,
        $og_title: title,
        $og_description: description,
        $og_image_url: image_url,
        $fallback_url: "https://socialboat.app.link/download",
      },
    },
  };

  try {
    const response = await axios(options);
    console.log("response", response);

    if (response.data.url) {
      const url = response.data.url as string;

      if (saveUrl) {
        saveUrl(url);
      }

      return url;
    }
  } catch (error) {
    console.log(error);
  }
};
