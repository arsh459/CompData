import { getDetail_UNSAFE } from "../../../models/ListingDetail/Methods";
import { VariantV2 } from "../../../models/ListingObj/VariantV2";
import * as admin from "firebase-admin";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";
import { getVariantOptions } from "../../../models/ListingObj/Methods/getVariantOptions";
import { handleVarsOptionDelete } from "../onVariantOptionDelete/algolia/handleDelete";

export const deleteBaseVariant = async (
  detail: ListingDetailInterface,
  collectionId: "allListings" | "stays",
  deletedVariant: VariantV2,
) => {
  if (detail) {
    const updatedLegacy = detail.variants.filter(
      (variant) => variant.variantId !== deletedVariant.variantId,
    );

    await admin
      .firestore()
      .collection(collectionId)
      .doc(detail.listingId)
      .update({
        variants: updatedLegacy,
      });
  }
};

export const handleLegacyVariantOptionDelete_and_algoliaV2 = async (
  collectionId: "allListings" | "stays",
  listingId: string,
  deleteVariant: VariantV2,
  propogateAlgoliaV2: boolean,
) => {
  const detail = await getDetail_UNSAFE(collectionId, listingId);

  if (deleteVariant && detail) {
    // delete for legacy maintain
    await deleteBaseVariant(detail, collectionId, deleteVariant);

    const allVariantOptions = await getVariantOptions(
      collectionId,
      listingId,
      deleteVariant.variantId,
    );

    // update algolia listingsV2
    if (propogateAlgoliaV2) {
      await handleVarsOptionDelete(
        detail.listingId,
        deleteVariant.variantId,
        allVariantOptions,
      );
    }
  }
};
