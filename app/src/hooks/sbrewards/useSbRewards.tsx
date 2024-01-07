import { useEffect, useState } from "react";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Voucher } from "@models/Voucher/interface";
import crashlytics from "@react-native-firebase/crashlytics";

export type FilterVouchersQuery =
  | "highToLow"
  | "lowToHigh"
  | "newest"
  | "recommended";

const getShopQuery = (numToFetch: number, filter: FilterVouchersQuery) => {
  let q: FirebaseFirestoreTypes.Query;

  if (filter === "highToLow") {
    q = firestore()
      .collection("sbRewards")
      .orderBy("value", "desc")
      .limit(numToFetch ? numToFetch : 5);
  } else if (filter === "lowToHigh") {
    q = firestore()
      .collection("sbRewards")
      .orderBy("value", "asc")
      .limit(numToFetch ? numToFetch : 5);
  } else if (filter === "recommended") {
    q = firestore()
      .collection("sbRewards")
      .orderBy("priority", "desc")
      .limit(numToFetch ? numToFetch : 5);
  } else {
    q = firestore()
      .collection("sbRewards")
      .orderBy("updatedOn", "desc")
      .limit(numToFetch ? numToFetch : 5);
  }

  return q;
};

const parseDocumentsToShop = (docs: FirebaseFirestoreTypes.DocumentData[]) => {
  const remoteRewards: Voucher[] = [];
  if (docs) {
    for (const doc of docs) {
      const reward = doc.data() as Voucher;
      remoteRewards.push(reward);
    }
  }

  return {
    remoteRewards,
    lastDoc: docs ? docs[docs.length - 1] : undefined,
  };
};

export const useSbRewards = (num: number) => {
  const [filter, setFilter] = useState<FilterVouchersQuery>("recommended");
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [lastShopDoc, setLastDoc] =
    useState<FirebaseFirestoreTypes.DocumentData>();
  const [initFetched, setInitFetched] = useState<boolean>(false);

  const changeFilter = (newFilter: FilterVouchersQuery) => {
    setFilter(newFilter);
    setInitFetched(false);
  };

  useEffect(() => {
    try {
      const getShopDocs = async (filter: FilterVouchersQuery) => {
        const q = getShopQuery(num, filter);
        const vouchers = await q.get();
        const { remoteRewards, lastDoc } = parseDocumentsToShop(vouchers.docs);

        setVouchers(remoteRewards);
        setLastDoc(lastDoc);
        setInitFetched(true);
      };

      !initFetched && getShopDocs(filter);
    } catch (error: any) {
      console.log("error", error);
      crashlytics().recordError(error);
    }
  }, [filter, initFetched, num]);

  const onNext = async () => {
    if (lastShopDoc) {
      const q = getShopQuery(num, filter);
      const nextDocuments = await q.startAfter(lastShopDoc).get();
      const nextData = parseDocumentsToShop(nextDocuments.docs);

      setVouchers((p) => {
        return [...p, ...nextData.remoteRewards];
      });
      setLastDoc(nextData.lastDoc);
    }
  };

  return {
    onNext,
    changeFilter,
    filter,
    vouchers,
  };
};
