import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useEffect } from "react";

export const useUploadWidget = (
  onUpload: (newFile: CloudinaryMedia) => void,
  loadWidget?: boolean,
  multiple?: boolean,
  maxFiles?: number
) => {
  // console.log("loadWidget", loadWidget);
  useEffect(() => {
    // console.log("window", window.cloudinary);
    if (window.cloudinary && loadWidget) {
      // console.log("here");
      let widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "htt-holidaying-travel-technologies",
          uploadPreset: "unsigned_tmp",
          ...(typeof multiple === "boolean" ? { multiple: multiple } : {}),
          ...(maxFiles ? { maxFiles: maxFiles } : {}),
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const newMediaFile: CloudinaryMedia = result.info;
            // setMedia((prev: CloudinaryMedia[]) => [...prev, newMediaFile]);
            // addEventMedia(eventId, newMediaFile);
            onUpload(newMediaFile);
            // console.log("here");

            // updateEventMedia(eventId, )

            // console.log("Done! Here is the image info: ", result.info);
          } else {
            console.log("error in cloud", result);
          }
        }
      );

      const openWidget = () => {
        widget.open();
      };

      document
        .getElementById("photo-form-container")
        ?.addEventListener("click", openWidget);

      return () => {
        document
          .getElementById("photo-form-container")
          ?.removeEventListener("click", openWidget);
      };
    }
  }, [onUpload, multiple, maxFiles, loadWidget]);

  return {};
};
