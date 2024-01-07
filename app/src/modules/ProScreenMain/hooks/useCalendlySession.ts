import { CalendlySession } from "@models/CalendlySession";
import { CategoryTypes } from "@modules/Appointments/constants";
import { useUserContext } from "@providers/user/UserProvider";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const useCalendlySession = (onSlotBook?: () => void) => {
  const [calendlySession, setCalendlySession] = useState<CalendlySession>();
  const [appType, setAppType] = useState<CategoryTypes>("gynaecologist");
  const [calendlySessionId, setCalendlySessionId] = useState<string>();
  const { user } = useUserContext();
  const [calendlyVisible, setCalendlyVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (calendlySessionId) {
      firestore()
        .collection("calendly")
        .doc(calendlySessionId)
        .onSnapshot((remDoc) => {
          if (remDoc.data()) {
            setCalendlySession(remDoc.data() as CalendlySession);
          }
        });
    }
    // else {
    //   setCalendlyVisible(false);
    // }
  }, [calendlySessionId]);

  // navigate out
  useEffect(() => {
    if (calendlySession?.status === "DONE") {
      setCalendlyVisible(false);

      // if done
      if (onSlotBook) {
        onSlotBook();
      }
    } else if (calendlySession?.status === "FAILED") {
      setCalendlyVisible(false);
    }
  }, [calendlySession?.status]);

  const createCalendlySession = async (categoryType: CategoryTypes) => {
    if (user?.uid) {
      setCalendlyVisible(true);
      setAppType(categoryType);
      const newDoc: CalendlySession = {
        id: uuidv4(),
        createdOn: Date.now(),
        status: "PROGRESS",
        uid: user?.uid,
        name: user?.name ? user.name : "",
      };

      await firestore().collection("calendly").doc(newDoc.id).set(newDoc);

      setCalendlySessionId(newDoc.id);
    }
  };

  const cancelCalendlySession = () => {
    if (calendlyVisible) {
      setCalendlyVisible(false);
      setCalendlySessionId("");
    } else {
      navigation.goBack();
    }
  };

  return {
    calendlySession,
    createCalendlySession,
    calendlySessionId,
    calendlyVisible,
    cancelCalendlySession,
    appType,
  };
};
