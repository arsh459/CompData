import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { Dashboard } from "@uppy/react";
import Webcam from "@uppy/webcam";
// import Compressor from "@uppy/compressor";
import DashboardU from "@uppy/dashboard";
import "@uppy/core/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/webcam/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { useEffect, useState } from "react";
import {
  createAWSMedia,
  getMediaType,
  getPathOfImage,
  getVideoWidthHeightDuration,
} from "@models/Media/createUtils";
import { AWSMedia } from "@models/Media/cloudinaryUpload";
import Button from "@components/button";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import { weEventTrack } from "@analytics/webengage/user/userLog";

interface Props {
  onUpload: (newMediaList: AWSMedia[]) => void;
  uid: string;
  onRemove?: (id: string) => void;
  filterButton?: boolean;
  leftButtonText?: string;
  styles?: string | undefined;
  onDoneClick?: () => void;
  screenName: string;
  taskName: string;
}

const UppyWidget: React.FC<Props> = ({
  onUpload,
  onRemove,
  filterButton,
  leftButtonText,
  styles,
  children,
  uid,
  onDoneClick,
  screenName,
  taskName,
}) => {
  const [newUppy, setUppy] = useState<Uppy>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // console.log("HEREE");
    const uppy = new Uppy({
      allowMultipleUploads: true,
      autoProceed: true,
    });

    uppy.use(DashboardU, {
      trigger: ".UppyModalOpenerBtn",
    });
    uppy.use(Webcam, {});
    // uppy.use(Compressor);
    uppy.use(AwsS3, {
      timeout: 3000 * 1000,
      limit: 0,
      async getUploadParameters(file) {
        // console.log("file", file);
        const response = await fetch("/api/aws/s3Sign", {
          method: "post",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            uid: uid,
          }),
        });

        const data = (await response.json()) as {
          status: string;
          url?: string;
        };

        return {
          url: data.url ? data.url : "",
          method: "PUT",
          headers: {
            "Content-Type": file.type ? file.type : "image",
          },
          fields: undefined,
        };
      },
    });

    // uppy.on("upload-progress", (a) => console.log("a", a));
    // uppy.on("upload", (data) => console.log("data", data));

    uppy.on("complete", async (result) => {
      const remMedias: AWSMedia[] = [];

      for (const file of result.successful) {
        const mediaType = getMediaType(file.type);
        const { width, height, duration } = await getVideoWidthHeightDuration(
          file.data,
          mediaType
        );

        const remoteMedia = createAWSMedia(
          file.id,
          mediaType,
          width,
          height,
          file.extension,
          file.name,
          file.size,
          file.response?.body.location
            ? getPathOfImage(file.response?.body.location as string)
            : "",
          "sbusermedia",
          file.name,
          "ap-south-1",
          file.response?.uploadURL,
          duration
        );

        // console.log("r", remoteMedia);

        remMedias.push(remoteMedia);
      }

      onUpload(remMedias);
      weEventTrack("uploadFinish", { screenName, taskName });
    });

    uppy.on("file-removed", (file, reason) => {
      if (reason === "removed-by-user" && onRemove) {
        // console.log("file", file);
        onRemove(file.id);
        weEventTrack("uploadFileRemove", { screenName, taskName });
      }
    });

    uppy.on("error", (e) =>
      console.log("e", weEventTrack("uploadError", { screenName, taskName }))
    );

    setUppy(uppy);

    return () => {
      uppy.close();
    };
  }, [onUpload, onRemove, uid, screenName, taskName]);

  // console.log("u", newUppy);
  const onClose = () => setIsOpen(false);
  const onDone = () => {
    setIsOpen(false);
    weEventTrack("uploadSubmitClick", { screenName, taskName });
    onDoneClick && onDoneClick();
  };
  // const onOpen = () => {

  // };

  const onUploadClick = () => {
    setIsOpen(true);
    weEventTrack("uploadClick", { screenName, taskName });
  };

  // console.log("filter", styles, leftButtonText);

  return (
    <div className="">
      <div className="">
        {children ? (
          <div onClick={onUploadClick}>{children}</div>
        ) : filterButton ? (
          <div
            onClick={onUploadClick}
            className={` cursor-pointer p-2 px-4 shadow-md hover:shadow-lg border-blue-500 rounded-full border-2 ${
              styles || "text-gray-600"
            }`}
          >
            <p className="font-medium text-sm capitalize">
              {leftButtonText ? leftButtonText : "Upload media"}
            </p>
          </div>
        ) : (
          <Button appearance="contained" onClick={onUploadClick}>
            {leftButtonText ? leftButtonText : "Upload media"}
          </Button>
        )}
      </div>

      <div id="DashboardContainer">
        {newUppy ? (
          <CreateModal
            isOpen={isOpen}
            onButtonPress={() => {}}
            heading=""
            onCloseModal={onClose}
            onBackdrop={onClose}
          >
            <div className="pt-4  overflow-auto">
              <div className="px-4 pb-2 cursor-pointer">
                <TopClose onCloseModal={onClose} />
              </div>
              <Dashboard
                uppy={newUppy}
                height={300}
                proudlyDisplayPoweredByUppy={false}
                closeModalOnClickOutside={false}
                showRemoveButtonAfterComplete={true}
                // open={isOpen}
                doneButtonHandler={onDone}
                showProgressDetails={true}
                // onRequestClose={() => setIsOpen(false)}
                plugins={["Webcam"]}
              />
            </div>
          </CreateModal>
        ) : null}
      </div>
    </div>
  );
};

export default UppyWidget;
