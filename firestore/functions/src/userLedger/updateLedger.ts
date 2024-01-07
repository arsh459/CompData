import {
  getUserLedgerEntry,
  createNewLedger,
  addLedger,
  ledgerActive,
} from "./Methods";
import {
  addStoreVisit,
  reduceActiveCustomers,
} from "../models/LeaderBoard/Methods";

const expiryDays = 15;

export const updateLedger = async (uid: string, referrerId: string) => {
  const ledgerEntry = await getUserLedgerEntry(uid);

  // get new ledger entry
  const newLedgerEntry = createNewLedger(uid, referrerId, expiryDays);

  // if a ledger exists for user
  if (ledgerEntry) {
    // add signup, ledger entry and reduce active customer if needed
    await Promise.all([
      addLedger({
        ...newLedgerEntry,
        history: [
          {
            uid: ledgerEntry.uid,
            updatedOn: ledgerEntry.updatedOn,
            expiresOn: ledgerEntry.expiresOn,
            referrerId: ledgerEntry.referrerId,
          },
          ...ledgerEntry.history,
        ],
      }),
      addStoreVisit(referrerId),
    ]);
    if (ledgerActive(ledgerEntry)) {
      await reduceActiveCustomers(ledgerEntry.referrerId);
    }
  } else {
    // add ledger and current referrer
    await Promise.all([
      addLedger({
        ...newLedgerEntry,
        history: [],
      }),
      addStoreVisit(referrerId),
    ]);
  }
};
