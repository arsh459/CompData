import {
  Collection,
  mediaAspectRatios,
  // MediaInterface,
} from "../../../../models/Collection/Collection";
import { Trip } from "../../../../models/Trip/Trip";
import { updateOne } from "../../../../utils/firestore/fetchOne";
import { uploadToCloudinary } from "../cloudinary/convertToCloudinary";

export const handleCloudinaryMedia = async (
  collection: Collection | Trip,
  baseType: "collection" | "trip",
  previousAspectRatio?: mediaAspectRatios
) => {
  await updateOne(
    baseType === "collection" ? "collections" : "tripsV2",
    collection.collectionId,
    {
      processingMedia: "PROCESSING",
    }
  );

  try {
    const { newMedia, asyncPublicIDs } = await uploadToCloudinary(
      collection.collectionMedia,
      collection.mediaAspectRatio ? collection.mediaAspectRatio : 1,
      previousAspectRatio ? previousAspectRatio : 1,
      baseType
    );

    if (asyncPublicIDs.length > 0) {
      await updateOne(
        baseType === "collection" ? "collections" : "tripsV2",
        collection.collectionId,
        {
          collectionMedia: newMedia,
          processingPublicIds: asyncPublicIDs,
        }
      );
    } else {
      await updateOne(
        baseType === "collection" ? "collections" : "tripsV2",
        collection.collectionId,
        {
          collectionMedia: newMedia,
          processingMedia: "DONE",
        }
      );
    }
  } catch (error) {
    console.log("error", error);
  }
};
