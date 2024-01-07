export interface duplicateCollectionRequest {
  collectionIdToDuplicate: string;
  targetInfluencerId: string;
  baseType: "trip" | "collection";
}
