import { useEffect, useState } from "react";

import firestore from "@react-native-firebase/firestore";

import { Voucher } from "@models/Voucher/interface";

export const useVoucher = (voucherId?: string) => {
  const [voucher, setVoucher] = useState<Voucher>();

  useEffect(() => {
    const getRemoteVoucher = async () => {
      const ref = firestore().collection("sbRewards").doc(voucherId);

      const remVoucher = await ref.get();

      const remoteVoucher = remVoucher.data() as Voucher | undefined;

      if (remoteVoucher) {
        setVoucher(remoteVoucher);
      }
    };
    if (voucherId) {
      getRemoteVoucher();
    }
  }, [voucherId]);

  return {
    voucher,
  };
};
