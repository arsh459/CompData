import axios from "axios";
import { FBEventInterfaceRequest } from "./interface";
import { BACKEND_URL } from "react-native-dotenv";

export const makeConversionCall = async (
  requestData: FBEventInterfaceRequest
) => {
  await axios({
    url: `${BACKEND_URL}/addFBEvent`,
    method: "POST",
    data: requestData,
  });
};
