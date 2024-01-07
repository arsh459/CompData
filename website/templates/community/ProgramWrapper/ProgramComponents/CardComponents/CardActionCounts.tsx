import clsx from "clsx";
import { DocumentReference } from "firebase/firestore";
import React, { useState } from "react";
import ClapperModal from "./ClapperModal";
interface Props {
  numClaps?: number;
  postRef?: DocumentReference;
  setIsReplyModalOpen: (val: boolean) => void;
  replies?: number;
}

const CardActionCounts: React.FC<Props> = ({
  numClaps,
  postRef,
  setIsReplyModalOpen,
  replies,
}) => {
  const [isOpen, onClose] = useState<boolean>(false);

  return (
    <>
      <ClapperModal
        isOpen={isOpen}
        onClose={() => onClose(false)}
        postRef={postRef}
      />

      <div className="bg-[#F2F2F7] flex items-center justify-around h-full border-t-2 text-[##0000004A] py-2">
        <div className="flex items-center">
          {numClaps ? (
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          ) : null}
          <span
            onClick={() => numClaps && onClose(true)}
            className={clsx("pl-2", numClaps ? "cursor-pointer" : "")}
          >
            {numClaps ? `${numClaps} ${numClaps > 1 ? "Claps" : "Clap"}` : "-"}
          </span>
        </div>
        <div className="flex items-center">
          {replies ? (
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          ) : null}
          <span
            onClick={() => replies && setIsReplyModalOpen(true)}
            className={clsx("pl-2", replies ? "cursor-pointer" : "")}
          >
            {replies
              ? `${replies} ${replies > 1 ? "Comments" : "Comment"}`
              : "-"}
          </span>
        </div>
      </div>
    </>
  );
};

export default CardActionCounts;
