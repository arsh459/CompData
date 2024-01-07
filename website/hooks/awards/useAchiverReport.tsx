import { db } from "@config/firebase";
import { Achiever, awardStatus } from "@models/awards/interface";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";

type stringKeys = "awardId";
type numberKeys =
  | "startTime"
  | "endTime"
  | "unlockOn"
  | "targetMonth"
  | "priority";

export const useAchiverReport = (reportId: string, uid: string) => {
  const [report, setReport] = useState<Achiever>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getReport = async () => {
      const reportDoc = await getDoc(doc(db, "achievers", reportId));

      const remoteReport = reportDoc.data() as Achiever | undefined;

      if (remoteReport) {
        setReport(remoteReport);
      } else {
        setReport({
          id: uuidv4(),
          createdOn: Date.now(),
          uid,
          awardId: "",
        } as Achiever);
      }
      setLoading(false);
    };

    getReport();
  }, [reportId, uid]);

  const onStringUpdate = useCallback((key: stringKeys, newVal: string) => {
    setReport((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: newVal,
        };
      }
    });
  }, []);

  const onNumberUpdate = useCallback((key: numberKeys, newVal: number) => {
    setReport((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: newVal,
        };
      }
    });
  }, []);

  const onAwardStatusUpdate = useCallback((newVal: string) => {
    setReport((prev) => {
      if (prev) {
        return {
          ...prev,
          awardStatus: newVal as awardStatus,
        };
      }
    });
  }, []);

  const onSave = async () => {
    setLoading(true);
    if (report) {
      await setDoc(doc(db, "achievers", report.id), report, { merge: true });
    }
    setLoading(false);
  };

  const onDelete = async () => {
    setLoading(true);
    if (report) {
      await deleteDoc(doc(db, "achievers", report.id));
    }
    setLoading(false);
  };

  return {
    report,
    loading,
    onStringUpdate,
    onNumberUpdate,
    onAwardStatusUpdate,
    onSave,
    onDelete,
  };
};
