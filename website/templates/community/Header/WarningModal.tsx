import Loading from "@components/loading/Loading";
import { Divider } from "@mui/material";
// import { useRouter } from "next/router";
import { useState } from "react";
import CreateModal from "../Program/CreateModal/CreateModal";
import TopClose from "../Program/Feed/TopClose";
import { internalTeamLeaveRequest } from "./internalCall";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
  eventId: string;
  onSuccess: () => void;
}

const WarningModal: React.FC<Props> = ({
  isOpen,
  onSuccess,
  onClose,
  uid,
  eventId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onLeaveTeamClick = async () => {
    setLoading(true);

    const res = await internalTeamLeaveRequest(eventId, uid);

    if (res === "success") {
      onSuccess();
    } else {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <CreateModal
      heading=""
      onButtonPress={() => {}}
      isOpen={isOpen}
      onBackdrop={onClose}
      onCloseModal={onClose}
    >
      <div className="px-4 py-4">
        <div className="cursor-pointer">
          <TopClose onCloseModal={onClose} />
          <div className="pt-2">
            <Divider />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center w-full h-48">
            <Loading fill="#ff735c" width={48} height={48} />
          </div>
        ) : (
          <div className="py-4">
            <p className="text-2xl text-center font-semibold font-sans">
              {error ? "error" : "Are you sure?"}
            </p>
            {error ? null : (
              <p className="text-lg text-gray-700 font-sans pt-2">
                This action is irreversible. You will lose all your progress in
                the team and will have to start fresh in another team.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <div className="pr-2">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={onClose}
            >
              I WILL STAY
            </button>
          </div>

          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
            onClick={onLeaveTeamClick}
          >
            LEAVE TEAM
          </button>
        </div>
      </div>
    </CreateModal>
  );
};

export default WarningModal;
