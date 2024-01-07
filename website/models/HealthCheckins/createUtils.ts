import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@config/firebase";
import { CheckIn } from "./interface";

export const createHealthCheckIn = (): CheckIn => {
  const now = Date.now();

  return {
    id: uuidv4(),
    unixStart: now,
    name: "",
    createdOn: now,
    scheduleType: "COACH",
  };
};

export const saveHealthCheckIn = async (userId: string, checkIn: CheckIn) => {
  if (!userId || !checkIn) {
    return;
  }

  const healthCheckinRef = doc(
    doc(db, "users", userId),
    "healthCheckins",
    checkIn.id
  );

  await setDoc(healthCheckinRef, checkIn);
  console.log("Saved", "healthCheckins", userId, checkIn);
};

// id: string;
// unixStart: number;
// name: string;
// scheduleType: "COACH" | "USER";
// createdOn: number;
