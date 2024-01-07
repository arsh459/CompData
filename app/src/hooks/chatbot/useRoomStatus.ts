import { useUserStore } from "@providers/user/store/useUserStore";
import database from "@react-native-firebase/database";
import { useEffect } from "react";
import { useSakhiAIStore } from "./V2/store/useSakhiAIStore";
import { shallow } from "zustand/shallow";

export const useRoomStatus = () => {
  const uid = useUserStore((state) => state.user?.uid);

  const { roomId } = useSakhiAIStore(
    (state) => ({
      roomId: state.room?.id,
    }),
    shallow
  );

  useEffect(() => {
    if (roomId && uid) {
      const ref = database().ref(`users/${uid}/rooms/${roomId}`);
      ref.update({
        status: "active",
      });

      ref
        .onDisconnect()
        .update({
          status: "inactive",
        })
        .then(() => console.log("On disconnect function configured."));

      return () => {
        ref.update({
          status: "inactive",
        });
      };
    }
  }, [roomId, uid]);
};
