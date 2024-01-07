import { realtimeDBRoom } from "@models/ChatBot/interface";
import { useUserStore } from "@providers/user/store/useUserStore";
import database from "@react-native-firebase/database";
import { useEffect } from "react";
import { useSakhiAIStore } from "./V2/store/useSakhiAIStore";
import { shallow } from "zustand/shallow";

export const useRoomFromRealtimeDB = () => {
  const uid = useUserStore((state) => state.user?.uid);

  const { setRealtimeRoom, roomId } = useSakhiAIStore(
    (state) => ({
      setRealtimeRoom: state.setRealtimeRoom,
      roomId: state.room?.id,
    }),
    shallow
  );

  useEffect(() => {
    if (roomId && uid) {
      const ref = database().ref(`users/${uid}/rooms/${roomId}`);

      ref.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const rtRoom = snapshot.val() as realtimeDBRoom;
          setRealtimeRoom(rtRoom);
        }
      });

      return () => {
        ref.off();
      };
    }
  }, [roomId, uid]);
};
