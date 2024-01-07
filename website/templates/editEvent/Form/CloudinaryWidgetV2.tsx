import Button from "@components/button";
import { CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { useEffect, useState } from "react";
// import MediaFile from "./MediaGrid/MediaFile";

interface Props {
  heading: string;
  helperText: string;
  buttonHelperText?: string;
  onUpload: (mediaFile: CloudinaryMedia[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  media: CloudinaryMedia[];
  leftButtonText?: string;
  onNext?: () => void;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CloudinaryWidgetV2: React.FC<Props> = ({
  leftButtonText,
  media,
  onNext,
  heading,
  helperText,
  onUpload,
  multiple,
  maxFiles,
  buttonHelperText,
}) => {
  const [remUpload, setRemUpload] = useState<CloudinaryMedia[]>([]);

  useEffect(() => {
    onUpload(remUpload);
  }, [remUpload, onUpload]);

  //   useEffect(() => {
  //     if (media) {
  //       setRemUpload(media);
  //     }
  //   }, [media]);

  // const onDeleteFile = (toDelete: CloudinaryMedia) => {
  //   setRemUpload((prev) => prev.filter((item) => item?.id !== toDelete.id));
  // };

  useEffect(() => {
    if (window.cloudinary) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "htt-holidaying-travel-technologies",
          uploadPreset: "unsigned_tmp",
          ...(typeof multiple === "boolean" ? { multiple: multiple } : {}),
          ...(maxFiles ? { maxFiles: maxFiles } : {}),
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const newMediaFile: CloudinaryMedia = result.info;
            setRemUpload((prev: CloudinaryMedia[]) => [...prev, newMediaFile]);
          } else {
            console.log("error", error);
          }
        }
      );

      document.getElementById("photo-form-container")?.addEventListener(
        "click",
        function () {
          widget.open();
        },
        true
      );

      return () => {
        document.getElementById("photo-form-container")?.removeEventListener(
          "click",
          function () {
            widget.open();
          },
          true
        );
      };
    }
  }, [multiple, maxFiles]);

  // useEffect(() => {
  //   console.log("media", media, eventId);

  //   const updateMedia = async () => {
  //     await updateEventMedia(eventId, media);
  //   };
  // }, [media, eventId]);

  // const onDelete = async (toDeleteElement: CloudinaryMedia) => {
  //   const updatedMedia = media.filter(
  //     (item) => item.public_id !== toDeleteElement.public_id
  //   );

  //   await updateEventMedia(eventId, updatedMedia);
  // };

  //   console.log("media", media);

  return (
    <div className="max-w-lg">
      <div className="pb-4">
        <p className="text-4xl text-gray-600 font-medium">{heading}</p>
        <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>
      </div>

      <div className="flex">
        <div id="photo-form-container">
          <Button appearance="contained">
            {leftButtonText ? leftButtonText : "Upload media"}
          </Button>
        </div>

        {onNext ? (
          <div className="pl-4">
            <Button appearance="control" onClick={onNext}>
              <div>
                <p className="text-gray-700 font-semibold">Next</p>
              </div>
            </Button>
          </div>
        ) : null}
      </div>
      {buttonHelperText ? (
        <p className="text-sm text-gray-600 font-light pt-1">
          {buttonHelperText}
        </p>
      ) : null}
      <div>
        <div>
          <div
            // {...provided.droppableProps}
            // ref={provided.innerRef}
            className="pt-4 flex flex-wrap"
          >
            {media.map((el, index) => {
              if (el)
                return (
                  <div
                    // draggableId={el.public_id}
                    // index={index}
                    key={el.public_id}
                  >
                    {/* {(provided, snapshot) => ( */}
                    <div
                    // ref={provided.innerRef}
                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    >
                      {/* <MediaFile
                        selected={false}
                        mediaElement={el}
                        onDelete={onDeleteFile}
                        index={index}
                      /> */}
                    </div>
                    {/* )} */}
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudinaryWidgetV2;
