import { useMyPurchases } from "@hooks/mypurchases/useMyPurchases";
import React from "react";
import { MyPurchaseCard } from "./MyPurchaseCard";
interface Props {
  uid?: string;
}
const MyPurchaseLists: React.FC<Props> = ({ uid }) => {
  const { purchasedVoucher } = useMyPurchases();

  // console.log("uid", uid, purchasedVoucher);

  return (
    <div>
      <div className="flex items-center p-4 flex-wrap">
        <div className="p-4 flex flex-wrap">
          {uid
            ? purchasedVoucher?.map((item) => {
                return <MyPurchaseCard card={item} key={item.purchaseId} />;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default MyPurchaseLists;
