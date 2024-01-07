import { useEffect } from "react";
// import firestore, {
//   FirebaseFirestoreTypes,
// } from "@react-native-firebase/firestore";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { autoRooms } from "@models/ChatBot/insights";

export const useAutoRooms = () => {
  const { state } = useAuthContext();

  useEffect(() => {
    if (state.uid) {
      autoRooms.map((item) => {});

      //   firestore()
      //     .collection("users")
      //     .doc(state.uid)
      //     .collection("autoRooms")
      //     .doc(roomId);
    }
  }, [state.uid]);
};
