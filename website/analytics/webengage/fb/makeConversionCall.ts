import axios from "axios";
import { FBEventInterfaceRequest } from "./interface";

export const makeConversionCall = async (
  requestData: FBEventInterfaceRequest
) => {
  // console.log(`url`, `${process.env.NEXT_PUBLIC_BACKEND_URL}/addFBEvent`);
  // console.log(`requestData`, requestData);
  await axios({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/addFBEvent`,
    method: "POST",
    data: requestData,
  });
};
