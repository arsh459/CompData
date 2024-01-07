import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";

export const addPeriodTodayClick = async (
  uid: string,
  today: string,
  action: "add" | "remove"
) => {
  await axios({
    url: `${BACKEND_URL}/markPeriod`,
    method: "POST",
    params: { uid, date: today, action: action },
    data: { uid, date: today, action: action },
  });
};
