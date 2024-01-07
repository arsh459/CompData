import { Link } from "@mui/material";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  toClose: () => void;
  authStatus: "PENDING" | "SUCCESS" | "FAILED";
  onSignOut: () => void;
  canEdit: boolean;
}

const MoreMenu: React.FC<Props> = ({
  isOpen,
  toClose,
  authStatus,
  onSignOut,
  canEdit,
}) => {
  //   const handleEdit = () => {
  //     toClose();
  //   };
  const handleSignOut = () => {
    onSignOut();
    toClose();
  };

  return (
    <div
      className={clsx("absolute top-full right-4 z-10", isOpen ? "" : "hidden")}
    >
      <div className="flex flex-col bg-gray-50 shadow-lg rounded-xl">
        {canEdit ? (
          <Link href={`/editUserProfileV2`}>
            <div className="border-b">
              <button className="mx-8 my-2">Edit Profile</button>
            </div>
          </Link>
        ) : null}
        {authStatus === "SUCCESS" ? (
          <button className="mx-8 my-2" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : null}
      </div>
      <span className="fixed inset-0 -z-10" onClick={toClose} />
    </div>
  );
};

export default MoreMenu;
