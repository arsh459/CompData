import { fetchOne, writeOne } from "../utils/firestore/fetchOne";
import { userLedger, userLedgerEntry } from "./interface";

export const getUserLedgerEntry = async (
  uid: string
): Promise<userLedger | undefined> => {
  const ledgerRecord = await fetchOne("userLedger", `user-${uid}`);

  if (ledgerRecord.data()) {
    return ledgerRecord.data() as userLedger;
  } else {
    return undefined;
  }
};

export const createNewLedger = (
  uid: string,
  referrerId: string,
  expiryDays: number
): userLedgerEntry => {
  return {
    uid: uid,
    referrerId: referrerId,
    updatedOn: Math.round(new Date().getTime()),
    expiresOn:
      Math.round(new Date().getTime()) + expiryDays * 24 * 60 * 60 * 1000,
  };
};

export const addLedger = async (userLedgerObj: userLedger) => {
  await writeOne("userLedger", `user-${userLedgerObj.uid}`, userLedgerObj);
};

export const ledgerActive = (ledger: userLedger): boolean => {
  if (ledger.expiresOn >= ledger.updatedOn) {
    return true;
  }
  return false;
};
