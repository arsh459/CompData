import algoliasearch from "algoliasearch";
import * as functions from "firebase-functions";
// import { Activity } from "../../../models/Activity/Activity";
import { CollectionSnippet } from "../../../models/Collection/CollectionSnippet";
import { ListingBrief } from "../../../models/ListingBrief/ListingBrief";

const ADMIN_KEY = functions.config().algolia.key;
const APP_ID = functions.config().algolia.app;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const relevance = client.initIndex("listings");
const relevanceV2 = client.initIndex("listingsV2");

const collections = client.initIndex("collections");

export const addListingToIndex = async (listing: ListingBrief) => {
  await relevance.saveObject(listing);
};

export const addListingToIndexV2 = async (listing: ListingBrief) => {
  await relevanceV2.saveObject(listing);
};

export const updateListingIoIndex = async (
  listing: any,
  createIfNotExists: boolean,
) => {
  await relevance.partialUpdateObject(listing, {
    createIfNotExists: createIfNotExists,
  });
};

export const updateListingV2IoIndex = async (
  listing: any,
  createIfNotExists: boolean,
) => {
  await relevanceV2.partialUpdateObject(listing, {
    createIfNotExists: createIfNotExists,
  });
};

export const removeListingFromIndex = async (id: string) => {
  await relevance.deleteObject(id);
};

export const removeListingV2FromIndex = async (id: string) => {
  await relevanceV2.deleteObject(id);
};

export const removeListingsV2FromIndex = async (ids: string[]) => {
  await relevanceV2.deleteObjects(ids);
};

export const addListingsToIndex = async (listings: ListingBrief[]) => {
  await relevance.saveObjects(listings);
};

export const addListingsToIndexV2 = async (listings: ListingBrief[]) => {
  await relevanceV2.saveObjects(listings);
};

export const addCollectionToIndex = async (listing: CollectionSnippet) => {
  await collections.saveObject(listing);
};

export const removeCollectionFromIndex = async (id: string) => {
  await collections.deleteObject(id);
};

export const addCollectionsToIndex = async (listings: CollectionSnippet[]) => {
  await collections.saveObjects(listings);
};
