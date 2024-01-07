import { useClaps } from "@hooks/community/useClaps";
import { Link } from "@mui/material";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import { DocumentReference } from "firebase/firestore";
import React from "react";
import CardClapper from "./CardClapper";
interface Props {
  isOpen: boolean;
  onClose: (val?: boolean) => void;
  postRef?: DocumentReference;
}
const ClapperModal: React.FC<Props> = ({ isOpen, onClose, postRef }) => {
  const { clappers } = useClaps(isOpen, postRef);
  return (
    <CreateModal
      isOpen={isOpen}
      heading={""}
      onCloseModal={onClose}
      onBackdrop={onClose}
      onButtonPress={onClose}
      bgData="bg-white/[0.50] backdrop-blur-[123px] fixed inset-0 z-50 w-full h-full mx-auto"
    >
      <div
        className="absolute cursor-pointer right-8 top-64"
        onClick={() => onClose(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer w-7 h-7"
          viewBox="0 0 20 20"
          fill="#335E7D "
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex mx-8 iphoneX:mx-6 pt-80">
        <div className="flex">
          <img
            src={`https://ik.imagekit.io/socialboat/Vector_clap_blue_yX8uBjqVo.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655902188489`}
            alt="Clap Icon"
            className="pr-3"
          />
          <span className="text-[#335E7D] iphoneX:text-2xl ">
            {clappers.length} People clapped
          </span>
        </div>
      </div>
      <div className="overflow-scroll scrollbar-hide ">
        {clappers.map((item) => {
          return (
            <div key={item.id} className="py-4 pb-3 mx-8 iphoneX:mx-6">
              <Link href={`/p/${item.clapperId}`}>
                <CardClapper
                  name={item.clapperName}
                  img={item.clapperImage}
                  numClaps={item.numClaps}
                  onImgClick={() => {}}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </CreateModal>
  );
};

export default ClapperModal;
