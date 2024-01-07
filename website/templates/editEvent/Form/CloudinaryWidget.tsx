import Button from "@components/button";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import clsx from "clsx";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Script from "next/script";
import { useEffect } from "react";
import MediaFile from "./MediaGrid/MediaFile";

interface Props {
  heading: string;
  helperText: string;
  buttonHelperText?: string;
  onUpload: (mediaFile: CloudinaryMedia | AWSMedia) => void;
  onDelete: (media: CloudinaryMedia | AWSMedia) => void;
  multiple?: boolean;
  maxFiles?: number;
  height?: "none" | "small" | "medium";
  bgWhite?: boolean;
  media: (CloudinaryMedia | AWSMedia | undefined)[];
  filterButton?: boolean;
  leftButtonText?: string;
  onNext?: () => void;
  backButtonText?: string;
  backButtonPress?: () => void;
  tileHeight?: "small";
  containerStyles?: string | undefined;
  styles?: string | undefined;
  id?: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CloudinaryWidget: React.FC<Props> = ({
  leftButtonText,
  media,
  onNext,
  bgWhite,
  heading,
  helperText,
  onUpload,
  onDelete,
  multiple,
  maxFiles,
  height,
  buttonHelperText,
  filterButton,
  backButtonText,
  backButtonPress,
  children,
  tileHeight,
  containerStyles,
  styles,
  id
}) => {
  // const [remUpload, setRemUpload] = useState<number>(0);

  // useEffect(() => {
  //   if (remUpload > 0){

  //   }
  // }, [remUpload]);
  // console.log("here");

  useEffect(() => {
    // console.log("window", window.cloudinary);
    if (window.cloudinary) {
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
            console.log("hiii ");

            // updateEventMedia(eventId, )

            // console.log("Done! Here is the image info: ", result.info);
          } else {
            console.log("error in cloud", result);
          }
        }
      );

      document.getElementById(id ? id : "photo-form-container")?.addEventListener(
        "click",
        function () {
          widget.open();
        },
        true
      );

      return () => {
        document.getElementById(id ? id : "photo-form-container")?.removeEventListener(
          "click",
          function () {
            widget.open();
          },
          true
        );
      };
    }
  }, [onUpload, multiple, maxFiles]);

  return (
    <div className="max-w-lg">
      {heading || helperText ? (
        <div className="pb-4">
          <p className="text-4xl text-gray-600 font-medium">{heading}</p>
          <p className="text-sm text-gray-600 font-light pt-1">{helperText}</p>
        </div>
      ) : null}

      <div className={`flex ${containerStyles}`}>
        <div id={id ? id : "photo-form-container"}>
          {filterButton ? (
            <div
              className={` cursor-pointer p-2 px-4 shadow-md hover:shadow-lg border-blue-500 rounded-full border-2 ${
                styles || "text-gray-600"
              }`}
            >
              <p className="font-medium text-sm capitalize">
                {leftButtonText ? leftButtonText : "Upload media"}
              </p>
            </div>
          ) : (
            <Button appearance="contained">
              {leftButtonText ? leftButtonText : "Upload media"}
            </Button>
          )}
        </div>

        {children}

        {backButtonText && backButtonPress ? (
          <div className="pl-4">
            <Button appearance="control" onClick={backButtonPress}>
              <div className="pl-2 pr-2">
                <p className="capitalize text-gray-700 font-medium">
                  {backButtonText}
                </p>
              </div>
            </Button>
          </div>
        ) : null}

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
            className={clsx(
              "flex flex-wrap",

              height === "none"
                ? " "
                : height === "small"
                ? "h-24 mt-2 p-2 overflow-x-auto"
                : "h-52 mt-2 p-2 overflow-x-auto",

              bgWhite ? "" : "bg-gray-300",
              "rounded-md shaddow-inner"
            )}
          >
            {media.map((el, index) => {
              // console.log("el", el);
              if (el)
                return (
                  <div
                    // draggableId={el.public_id}
                    // index={index}
                    key={el.id}
                  >
                    {/* {(provided, snapshot) => ( */}
                    <div

                    // ref={provided.innerRef}
                    // {...provided.draggableProps}
                    // {...provided.dragHandleProps}
                    >
                      <MediaFile
                        selected={false}
                        mediaElement={el}
                        tileHeight={tileHeight}
                        onDelete={onDelete}
                        index={index}
                      />
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

export default CloudinaryWidget;
