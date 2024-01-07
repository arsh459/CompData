/* eslint-disable react-hooks/exhaustive-deps */
// import Image from "next/image";
import React from "react";

// import { UserInterface } from "@models/User/User";
// import CloudinaryWidget from "@templates/editEvent/Form/CloudinaryWidget";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";

// import { SelectedWorkout } from "pages/workoutV2";

interface Props {
  media?: (CloudinaryMedia | AWSMedia)[];
  cta: string;
  uid: string;
  onUpload: (newFile: (CloudinaryMedia | AWSMedia)[]) => void;
  onDelete: (newFile: CloudinaryMedia | AWSMedia) => void;
  onRemoveById?: (id: string) => void;
}

const AddMediaToActivity: React.FC<Props> = ({
  media,
  onUpload,
  onDelete,
  cta,
  onRemoveById,
  uid,
}) => {
  return (
    <div className="">
      <UppyWidgetContainer
        media={media ? media : []}
        uid={uid}
        screenName="dep"
        taskName="dep"
        onRemove={onRemoveById}
        leftButtonText={cta}
        onDelete={onDelete}
        onUpload={onUpload}
        heading=""
        helperText=""
        height="none"
        filterButton={true}
        tileHeight="small"
        bgWhite={true}
        styles="rounded-none bg-red-500 border-none text-white"
        containerStyles="border border-dashed border-2 border-slate-500 bg-gray-100 h-64 flex justify-center items-center"
      />
    </div>
  );
};

export default AddMediaToActivity;
