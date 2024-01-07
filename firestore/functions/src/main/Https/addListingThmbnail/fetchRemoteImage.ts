// import axios from "axios";
// import * as sharp from "sharp";
import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";
import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { ListingDetailInterface } from "../../../models/ListingDetail/interface";

export const saveListingThumbnail = async (url: string, listingId: string) => {
  // const response = await axios.get(url, { responseType: "arraybuffer" });
  const fileName = getThumbnailName();
  // console.log("fileName", fileName);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  // console.log("tempFilePath", tempFilePath);

  // save temp file
  // await sharp(response.data).resize(300, 300).toFile(tempFilePath);

  const destinationPath = getThumbnailDestinationFilePath(listingId, fileName);
  // console.log("destinationPath", destinationPath);

  const bucket = admin.storage().bucket("gs://holidaying-prod.appspot.com");
  await bucket.upload(tempFilePath, {
    destination: destinationPath,
    metadata: { cacheControl: "public,max-age=300", contentType: "image/jpeg" },
  });

  // unlink
  fs.unlinkSync(tempFilePath);

  const urlFiles = await bucket
    .file(destinationPath)
    .getSignedUrl({ action: "read", expires: "03-09-2491" });

  return urlFiles[0];
};

const getThumbnailDestinationFilePath = (
  listingId: string,
  fileName: string,
) => {
  return `images/${listingId}/thumbnail/${fileName}`;
};

const getThumbnailName = () => {
  return `thumbnail-${uuid()}.jpeg`;
};

export const getBaseImageURL = (
  listingDetail: ListingDetailInterface,
): string | undefined => {
  if (listingDetail.coverImages && listingDetail.coverImages.length > 0) {
    return listingDetail.coverImages[0];
  }

  if (listingDetail.images && listingDetail.images.length > 0) {
    return listingDetail.images[0];
  }

  return undefined;
};
