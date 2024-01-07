import firestore from "@react-native-firebase/firestore";
import { UserInterface } from "@models/User/User";
import { useEffect, useState } from "react";

export const useParticipants = () => {
  const [participantsCount, setParticipantsCount] = useState<number>(0);
  const [fewParticipents, setFewParticipents] = useState<UserInterface[]>([]);

  useEffect(() => {
    const getData = async () => {
      const q = firestore()
        .collection("users")
        .orderBy("challengeJoined", "desc");

      const count = await q.countFromServer().get();

      if (count.data()) {
        setParticipantsCount(count.data().count);
      }

      const participents = await q.limit(5).get();

      const remoteUsers: UserInterface[] = [];
      for (const doc of participents.docs) {
        if (doc.data()) {
          remoteUsers.push(doc.data() as UserInterface);
        }
      }

      if (remoteUsers.length) {
        setFewParticipents(remoteUsers);
      }
    };

    getData();
  }, []);

  return { participantsCount, fewParticipents };
};
