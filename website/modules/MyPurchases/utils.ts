import { db } from "@config/firebase";
import { MyPurchase } from "@models/MyPurchases";
import { doc, setDoc } from "firebase/firestore";

export const updateRedeemStatus = async (myPurchase: MyPurchase) => {
  if (myPurchase?.uid) {
    await setDoc(
      doc(
        doc(db, "users", myPurchase.uid),
        "myPurchases",
        myPurchase.purchaseId
      ),
      myPurchase
    );
  }
};
