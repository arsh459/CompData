import Button from "@components/button";
// import clsx from "clsx";
import { useState } from "react";
import ClapModal from "../Program/ClapModal";
import KPIHolder from "./KPIHolder";

interface Props {
  numClaps?: number;
  checkIns?: number;
  signedInUID?: string;
  creatorName?: string;
  onJoin: () => void;
  onNewPost: () => void;
  isMember: boolean;
  onProfileNameClick: (uid: string) => void;
}

const PersonalKPIs: React.FC<Props> = ({
  numClaps,
  checkIns,
  signedInUID,
  creatorName,
  onJoin,
  onNewPost,
  isMember,
  onProfileNameClick,
}) => {
  // console.log("isMember", isMember);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);

  if (signedInUID && isMember)
    return (
      <>
        {signedInUID ? (
          <ClapModal
            // onProfileNameClick={onProfileNameClick}
            isOpen={isOpen}
            onCloseModal={() => setIsOpen(false)}
            signedInUID={signedInUID}
          />
        ) : null}
        <div className="p-4 py-8 bg-white rounded-lg shadow-sm hover:shadow-lg">
          <p className="text-2xl text-gray-700 text-center">Your progress</p>

          <KPIHolder
            value={numClaps}
            text="Clap(s) from community"
            onClick={onOpen}
            img="https://img.icons8.com/emoji/48/000000/nikita-clapping-hands-emoji.png"
          />

          {checkIns ? (
            <KPIHolder
              value={checkIns}
              text="Checkin(s) from community"
              onClick={() => {}}
              img="https://img.icons8.com/ios/100/000000/reply-arrow.png"
            />
          ) : (
            <KPIHolder
              value={checkIns}
              text="Make your first post"
              onClick={onNewPost}
              img="https://img.icons8.com/material-outlined/384/000000/edit--v3.png"
            />
          )}
        </div>
      </>
    );
  else {
    return (
      <div className="p-4 py-8 bg-white rounded-lg shadow-sm hover:shadow-lg">
        <div>
          <p className="text-2xl text-gray-700 font-semibold text-center">
            {creatorName
              ? `Welcome to ${creatorName}'s community`
              : "Welcome to the creator community"}
          </p>
          <p className="text-gray-500 text-center pt-4">
            To start your fitness journey
          </p>
        </div>
        <div className="flex justify-center items-center pt-4">
          <Button onClick={onJoin} appearance="contained">
            Join the Community
          </Button>
        </div>
      </div>
    );
  }
};

export default PersonalKPIs;
