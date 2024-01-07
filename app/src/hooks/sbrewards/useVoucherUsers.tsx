import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { UserInterface } from "@models/User/User";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";

export const useVoucherUsers = (voucherId?: string) => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [fetched, setFetching] = useState<boolean>(false);
  const [lastDoc, setLastDoc] = useState<FirebaseFirestoreTypes.DocumentData>();

  const { interactionStatus } = useInteractionContext();

  useEffect(() => {
    const getUsers = async () => {
      if (voucherId) {
        let q: FirebaseFirestoreTypes.Query | undefined = undefined;

        q = firestore()
          .collection("users")
          .where("purchasedRewards", "array-contains", voucherId);

        if (q) {
          const rUsers: UserInterface[] = [];
          const userDocs = await q.limit(6).get();

          for (const doc of userDocs.docs) {
            if (doc.data()) {
              rUsers.push(doc.data() as UserInterface);
            }
          }

          setUsers(rUsers);
          setLastDoc(userDocs.docs[userDocs.docs.length - 1]);
          setTimeout(() => setFetching(true), 200);
        }
      }
    };
    interactionStatus && getUsers();
  }, [voucherId, interactionStatus]);

  const onNext = () => {
    const getUsers = async () => {
      if (voucherId) {
        let q: FirebaseFirestoreTypes.Query | undefined = undefined;

        q = firestore()
          .collection("users")
          .where("purchasedRewards", "array-contains", voucherId);

        if (q) {
          const rUsers: UserInterface[] = [];
          const userDocs = await q.startAfter(lastDoc).limit(5).get();
          for (const doc of userDocs.docs) {
            if (doc.data()) {
              rUsers.push(doc.data() as UserInterface);
            }
          }

          setUsers((prev) => [...prev, ...rUsers]);
          setLastDoc(userDocs.docs[userDocs.docs.length - 1]);
          setTimeout(() => setFetching(true), 200);
        }
      }
    };
    if (voucherId && lastDoc && interactionStatus) {
      getUsers();
    }
  };

  return {
    users,
    fetched,
    onNext,
  };
};
