import * as cloudinary from "cloudinary";
import {
  // CloudinaryUploadParams,
  mediaAspectRatios,
  MediaInterface,
} from "../../../../models/Collection/Collection";
import * as functions from "firebase-functions";
import { v4 as uuid } from "uuid";

const CLOUDINARY_SECRET_KEY = functions.config().cloudinary.key;
const mobileWidth = 960;

cloudinary.v2.config({
  cloud_name: "htt-holidaying-travel-technologies",
  api_key: "564613616665361",
  api_secret: CLOUDINARY_SECRET_KEY,
});

export const uploadToCloudinary = async (
  media: MediaInterface[],
  aspectRatio: mediaAspectRatios,
  previousAspectRatio: mediaAspectRatios,
  baseType: "collection" | "trip"
) => {
  const urlPromises: Promise<MediaInterface>[] = [];
  const asyncPublicIDs: string[] = [];
  for (const mediaEl of media) {
    if (mediaEl.type === "video") {
      const publicId = uuid();
      asyncPublicIDs.push(publicId);

      const p: Promise<MediaInterface> = handleVideoUploadToCloudinary(
        mediaEl,
        aspectRatio,
        publicId,
        baseType
      );

      urlPromises.push(p);
    } else if (mediaEl.type === "photo") {
      const p: Promise<MediaInterface> = handlePhotoUploadToCloudinary(mediaEl);
      urlPromises.push(p);
    } else if (
      aspectRatio !== previousAspectRatio &&
      mediaEl.type === "cloud_video"
    ) {
      const p: Promise<MediaInterface> = handleVideoAspectRatioChange(
        mediaEl,
        aspectRatio
      );
      /**
      const p: Promise<MediaInterface> = new Promise(async (resolve) => {
        resolve({
          ...mediaEl,
          url: updateURLAspectRatio(
            mediaEl.url,
            aspectRatio,
            mediaEl.cloudinaryUploadParams,
          ),
        });
      });
       */

      urlPromises.push(p);
    } else {
      const p: Promise<MediaInterface> = new Promise(async (resolve) => {
        resolve(mediaEl);
      });

      urlPromises.push(p);
    }
  }

  try {
    return {
      newMedia: await Promise.all(urlPromises),
      asyncPublicIDs: asyncPublicIDs,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Upload failed");
    // return [];
  }
};

export const handleVideoUploadToCloudinary = (
  media: MediaInterface,
  aspectRatio: mediaAspectRatios,
  publicId: string,
  baseType: "collection" | "trip"
): Promise<MediaInterface> => {
  return new Promise(async (resolve, reject) => {
    cloudinary.v2.uploader
      .upload_large(media.url, {
        resource_type: "video",
        public_id: publicId,
        eager: [
          {
            aspect_ratio: aspectRatio,
            crop: "fill",
            gravity: "center",
            format: "mp4",
            width: mobileWidth,
          },
        ],
        eager_async: true,
        eager_notification_url:
          baseType === "collection"
            ? "https://asia-south1-holidaying-prod.cloudfunctions.net/cloudinaryNotification"
            : "https://asia-south1-holidaying-prod.cloudfunctions.net/cloudinaryTripNotification",
        upload_preset: "video_collections",
      })
      .then((response) => {
        //console.log('response', response);

        resolve({
          ...media,
          url:
            response.eager && response.eager.length > 0
              ? response.eager[0].secure_url
              : response.secure_url,
          type: "cloud_video",
          cloudinaryUploadParams: {
            public_id: response.public_id,
            asset_id: response.asset_id ? response.asset_id : "",
            format: response.format,
            resource_type: response.resource_type,
            secure_url: response.secure_url,
          },
        } as MediaInterface);
      })
      .catch((error) => reject(error));
  });
};

export const handleVideoAspectRatioChange = (
  media: MediaInterface,
  aspectRatio: mediaAspectRatios
): Promise<MediaInterface> => {
  return new Promise(async (resolve) => {
    if (media.cloudinaryUploadParams) {
      const res = cloudinary.v2.url(media.cloudinaryUploadParams.public_id, {
        aspect_ratio: aspectRatio,
        crop: "fill",
        gravity: "center",
        format: "mp4",
        width: mobileWidth,
      });

      resolve({ ...media, url: res });
    } else {
      resolve(media);
    }
  });
};

export const handlePhotoUploadToCloudinary = (
  media: MediaInterface
): Promise<MediaInterface> => {
  return new Promise(async (resolve, reject) => {
    cloudinary.v2.uploader
      .upload(media.url, {
        resource_type: "image",
        upload_preset: "video_collections",
      })
      .then((response) => {
        // console.log('response', response);
        resolve({
          ...media,
          url: response.secure_url,
          type: "cloud_photo",
          cloudinaryUploadParams: {
            public_id: response.public_id,
            asset_id: response.asset_id ? response.asset_id : "",
            format: response.format,
            resource_type: response.resource_type,
            secure_url: response.secure_url,
          },
        } as MediaInterface);
      })
      .catch((error) => reject(error));
  });
};

/**
const updateURLAspectRatio = (
  prevCloudURL: string,
  newAspectRatio: mediaAspectRatios,
  cloudinaryUploadParams?: CloudinaryUploadParams,
) => {
  if (cloudinaryUploadParams) {
    return `https://res.cloudinary.com/htt-holidaying-travel-technologies/video/upload/ar_${newAspectRatio},c_crop,g_center/${cloudinaryUploadParams.public_id}.${cloudinaryUploadParams.format}`;
  }

  return prevCloudURL;
};
 */
