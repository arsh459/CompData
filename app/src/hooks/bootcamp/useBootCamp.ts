import { Bootcamp } from "@models/BootCamp";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { dayMS } from "@providers/period/periodStore";
import { useUserContext } from "@providers/user/UserProvider";
export type userBootcampStatus =
  | "INVITE_EXPIRED"
  | "INVITED"
  | "FUTURE"
  | "ONGOING_JOINED"
  | "ONGOING_INVITED"
  | "FINISHED"
  | "UNKNOWN";

export const useBootCamp = (id?: string) => {
  const [bootcamp, setBootcamp] = useState<Bootcamp>();
  const { todayUnix } = useAuthContext();
  const { user } = useUserContext();
  const [bootcampStatus, setBootcampStatus] =
    useState<userBootcampStatus>("UNKNOWN");

  const [start, setStart] = useState<number>(-1);
  const [end, setEnd] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const listener = firestore()
      .collection("bootcamps")
      .doc(id)
      .onSnapshot((snapshot) => {
        setLoading(true);
        if (snapshot.data()) {
          const remBootcamp = snapshot.data() as Bootcamp;

          const startDateObj = new Date(remBootcamp.start);

          const localDayStart = new Date(
            startDateObj.getFullYear(),
            startDateObj.getMonth(),
            startDateObj.getDate(),
            0,
            0,
            0,
            0
          ).getTime();

          const endUnix = localDayStart + remBootcamp.length * dayMS;

          setBootcamp(remBootcamp);
          setStart(localDayStart);
          setEnd(endUnix);

          // joined
          if (user?.bootcampDetails?.started) {
            if (todayUnix >= localDayStart && todayUnix < endUnix) {
              setBootcampStatus("ONGOING_JOINED");
            } else if (todayUnix < localDayStart) {
              setBootcampStatus("FUTURE");
            } else {
              setBootcampStatus("FINISHED");
            }
          }
          // if not joined
          else {
            if (todayUnix >= localDayStart && todayUnix < endUnix) {
              setBootcampStatus("ONGOING_INVITED");
            } else if (todayUnix < localDayStart) {
              setBootcampStatus("INVITED");
            } else {
              setBootcampStatus("INVITE_EXPIRED");
            }
          }
        }
        setLoading(false);
      });

    return () => {
      listener();
    };
  }, [id, todayUnix, user?.bootcampDetails?.started]);

  return { bootcamp, loading, bootcampStatus, start, end };
};
