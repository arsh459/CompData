import { formLabelValues } from "@components/drawers/constants";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { removeSEOImg, updateSEOImg } from "@models/Event/createUtils";
// import { removeSEOImg, updateSEOImg } from "@models/Event/createUtils";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { removeFavIcon, uploadFavIcon } from "@models/User/updateUtils";
// import { removeFavIcon, uploadFavIcon } from "@models/User/updateUtils";
import { ListItem } from "@templates/listing/NumberedList/NumberedList";
import { useCallback } from "react";
// import { useCallback } from "react";
// import CloudinaryWidget from "../CloudinaryWidget";
import TextEntry from "../TextEntry";
// import { useState } from "react";

interface Props {
  googleTitle: string;
  googleDescription: string;
  setGoogleTitle: (newVal: string) => void;
  setGoogleDescription: (newVal: string) => void;
  currentVisible: formLabelValues;
  onButtonPress: (
    newVal: formLabelValues,
    val: string | number | ListItem[]
  ) => void;
  googleSEOImg: CloudinaryMedia | AWSMedia | undefined;
  id: string;
  favIconImg: CloudinaryMedia | AWSMedia | undefined;
  uid: string;
}

const SEOFormHolder: React.FC<Props> = ({
  currentVisible,
  googleTitle,
  googleDescription,
  setGoogleTitle,
  setGoogleDescription,
  onButtonPress,
  googleSEOImg,
  favIconImg,
  id,
  uid,
}) => {
  const uploadMedia = useCallback(
    async (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      await updateSEOImg(id, newFiles[0]);
    },
    [id]
  );

  const deleteMedia = async () => {
    await removeSEOImg(id);
  };

  const updateFavIcon = useCallback(
    async (newFile: (CloudinaryMedia | AWSMedia)[]) => {
      await uploadFavIcon(uid, newFile[0]);
    },
    [uid]
  );

  const deleteFavIcon = async () => {
    await removeFavIcon(uid);
  };

  //   console.log("currentVisible", currentVisible);
  return (
    <>
      <div className="">
        {currentVisible === "googleTitle" ? (
          <TextEntry
            inputMode="text"
            heading="Set a title for social preview"
            placeholder="Type here"
            helperText={`*A 60 character heading for Google`}
            value={googleTitle}
            onChangeText={setGoogleTitle}
            buttonText="Save and Next"
            onButtonPress={() => onButtonPress("googleTitle", googleTitle)}
          />
        ) : currentVisible === "googleDescription" ? (
          <TextEntry
            inputMode="text"
            multiline
            heading="Add a 140 character description"
            placeholder="Type here"
            helperText={`*Example - This is visible on Google, Fb, WhatsApp`}
            value={googleDescription}
            onChangeText={setGoogleDescription}
            buttonText="Save and Next"
            onButtonPress={() =>
              onButtonPress("googleDescription", googleDescription)
            }
          />
        ) : currentVisible === "googleSEOImg" ? (
          <>
            <UppyWidgetContainer
              heading="Add SEO Image"
              height="small"
              helperText="Minimum size of 600px * 314px (Aspect ratio of 1.91)"
              onDelete={deleteMedia}
              onUpload={uploadMedia}
              uid={uid}
              media={googleSEOImg ? [googleSEOImg] : []}
              onNext={() => onButtonPress("googleSEOImg", "")}
              screenName="admin"
              taskName="admin"
              // maxFiles={1}
              // multiple={false}
            />
          </>
        ) : currentVisible === "favIconImg" ? (
          <>
            <UppyWidgetContainer
              height="small"
              uid={uid}
              heading="Add Company Icon"
              helperText="A 200px by 200px square image. This can be your company logo"
              onDelete={deleteFavIcon}
              onUpload={updateFavIcon}
              media={favIconImg ? [favIconImg] : []}
              onNext={() => onButtonPress("favIconImg", "")}
              screenName="admin"
              taskName="admin"
              // maxFiles={1}
              // multiple={false}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default SEOFormHolder;
