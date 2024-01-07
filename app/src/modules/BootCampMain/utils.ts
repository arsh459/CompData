import axios from "axios";
import { BACKEND_URL } from "react-native-dotenv";

export const startBootcamp = async (
  uid: string,
  bootcampId: string,
  badgeId: string,
  nutritionBadgeId: string,
  bootcampStart: number
) => {
  const payload = {
    uid,
    bootcampId,
    badgeId,
    nutritionBadgeId,
    workoutStart: bootcampStart,
    nutritionStart: bootcampStart,
  };

  // update start
  await axios({
    url: `${BACKEND_URL}/bootcamp`,
    method: "POST",
    params: payload,
    data: payload,
  });
};
