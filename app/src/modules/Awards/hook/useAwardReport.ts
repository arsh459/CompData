import firestore from "@react-native-firebase/firestore";
import { Achiever, Award } from "@models/Awards/interface";
import { useEffect, useState } from "react";

export const useAwardReport = (id?: string) => {
  const [award, setAward] = useState<Award>();
  const [awardReport, setAwardReport] = useState<Achiever>();
  const [loading, setLoading] = useState<
    "FETCHING" | "NONE" | "DONE" | "ERROR"
  >("NONE");

  useEffect(() => {
    if (id) {
      setLoading("FETCHING");
      const list = firestore()
        .collection("achievers")
        .doc(id)
        .onSnapshot((snapshot) => {
          if (snapshot.data()) {
            const remoteAwardReport = snapshot.data() as Achiever;

            setAwardReport(remoteAwardReport);

            // firestore()
            //   .collection("awards")
            //   .doc(remoteAwardReport.awardId)
            //   .get()
            //   .then((snapshot) => {
            //     if (snapshot.data()) {
            //       const remoteAward = snapshot.data() as Award;
            //       setAward(remoteAward);
            //       setLoading("DONE");
            //     } else {
            //       setLoading("ERROR");
            //     }
            //   })
            //   .catch((e) => setLoading("ERROR"));
          } else {
            setLoading("ERROR");
          }
        });

      return () => {
        list();
      };
    } else {
      setLoading("ERROR");
    }
  }, [id]);

  useEffect(() => {
    if (awardReport?.awardId) {
      const listn = firestore()
        .collection("awards")
        .doc(awardReport?.awardId)

        .onSnapshot((snapshot) => {
          if (snapshot.data()) {
            const remoteAward = snapshot.data() as Award;
            setAward(remoteAward);
            setLoading("DONE");
          } else {
            setLoading("ERROR");
          }
        });

      return () => {
        listn();
      };
    } else {
      // setLoading("ERROR");
    }
  }, [awardReport?.awardId]);

  return { award, awardReport, loading };
};
