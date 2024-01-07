import * as admin from 'firebase-admin';
import {UGCListing} from './UGCListing';

export const getAllUserDiscoveries = async (
  uid: string,
): Promise<UGCListing[]> => {
  const savedDiscoveries = await admin
    .firestore()
    .collection('ugcListings')
    .where('uid', '==', uid)
    .where('saved', '==', true)
    .get();

  const trips: UGCListing[] = [];
  return savedDiscoveries.docs.reduce((acc, item) => {
    acc.push(item.data() as UGCListing);
    return acc;
  }, trips);
};

export const getAllUserDiscoveriesInDB = async (
  uid: string,
): Promise<UGCListing[]> => {
  const savedDiscoveries = await admin
    .firestore()
    .collection('ugcListings')
    .where('uid', '==', uid)
    .get();

  const trips: UGCListing[] = [];
  return savedDiscoveries.docs.reduce((acc, item) => {
    acc.push(item.data() as UGCListing);
    return acc;
  }, trips);
};

export const getAllDiscoveries = async (): Promise<UGCListing[]> => {
  const savedDiscoveries = await admin
    .firestore()
    .collection('ugcListings')
    .get();

  const trips: UGCListing[] = [];
  return savedDiscoveries.docs.reduce((acc, item) => {
    acc.push(item.data() as UGCListing);
    return acc;
  }, trips);
};

export const getUGCListingById = async (
  ugcListingId: string,
): Promise<UGCListing | undefined> => {
  const ugcListing = await admin
    .firestore()
    .collection('ugcListings')
    .doc(ugcListingId)
    .get();

  if (ugcListing.exists) {
    return ugcListing.data() as UGCListing;
  }

  return undefined;
};
