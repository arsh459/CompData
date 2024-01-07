import { useEffect, useState } from "react";
import { db } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { createHealthCheckIn } from "@models/HealthCheckins/createUtils";
import { CheckIn } from "@models/HealthCheckins/interface";

export const useNewHealthCheckIn = (uid: string, id?: string) => {
  const [healthCheckins, setHealthCheckins] = useState<CheckIn>();
  useEffect(() => {
    const getCheckIn = async () => {
      console.log({ id });
      if (id && uid) {
        const document = await getDoc(
          doc(doc(db, "users", uid), "healthCheckins", id)
        );
        const data = document.data();
        if (data) {
          const sd = data as CheckIn;
          setHealthCheckins(sd);
        } else {
          setHealthCheckins(createHealthCheckIn());
        }
      }
    };
    if (id && uid) {
      getCheckIn();
    }
  }, [uid, id]);

  // id: string;
  // unixStart: number;
  // name: string;
  // scheduleType: "COACH" | "USER";
  // createdOn: number;

  const onUpdateUnixStart = (newVal: string) => {
    setHealthCheckins((prev) => {
      if (prev) {
        return {
          ...prev,
          unixStart: parseInt(newVal),
        };
      }
    });
  };
  const onUpdateSheduleType = (newVal: "COACH" | "USER") => {
    setHealthCheckins((prev) => {
      if (prev) {
        return {
          ...prev,
          scheduleType: newVal,
        };
      }
    });
  };
  const onUpdateName = (newVal: string) => {
    setHealthCheckins((prev) => {
      if (prev) {
        return {
          ...prev,
          name: newVal,
        };
      }
    });
  };
  const onUpdateCreatedOn = (newVal: string) => {
    setHealthCheckins((prev) => {
      if (prev) {
        return {
          ...prev,
          priority: parseInt(newVal),
        };
      }
    });
  };

  return {
    healthCheckins,
    setHealthCheckins,
    onUpdateCreatedOn,
    onUpdateName,
    onUpdateSheduleType,
    onUpdateUnixStart,
  };
};
