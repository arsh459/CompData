import * as t from "io-ts";

export interface userLedger {
  uid: string;
  referrerId: string;
  updatedOn: number;
  expiresOn: number;
  history: userLedgerEntry[];
}

export interface userLedgerEntry {
  uid: string;
  referrerId: string;
  updatedOn: number;
  expiresOn: number;
}

export interface reconcileRequestInterface {
  uid: string;
}

export const ReconcileRequest = t.type({
  uid: t.string,
});
