import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import axios from "axios";

interface ClResponse {
  media?: CloudinaryMedia;
  status: "success" | "failed";
}

export const uploadInternalRequest = async (img: string) => {
  const res = await axios({
    url: "/api/cloudinary/upload",
    method: "POST",
    data: {
      img: img,
    },
  });

  //   console.log("response here", res);

  const axiosRes = res.data as ClResponse;

  //   console.log("axiosRes", axiosRes);

  if (axiosRes.status === "success") {
    return axiosRes.media;
  }

  return undefined;
};
