import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
// import ContentLive from "@templates/community/workouts/Modals/ContentLive";
import { useState } from "react";
import Button from "@components/button";
// import { Link } from "@mui/material";
import ConsumerText from "@templates/checkout/Form/ConsumerText";

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  onPayClick: (cost: number) => void;
  cost: number;
}

const code = "socialboatwfh";

const InviteCodeModal: React.FC<Props> = ({
  isOpen,
  onCloseModal,
  onPayClick,
  cost,
}) => {
  const [cInviteCode, setInviteCode] = useState<string>("");

  return (
    <div className="">
      <CreateModal
        isOpen={isOpen}
        onBackdrop={onCloseModal}
        onCloseModal={onCloseModal}
        heading={""}
        onButtonPress={() => {}}
      >
        <div className="px-4 py-4 max-h-[75vh] overflow-y-auto relative">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-24 h-24 object-cover"
              src="https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/000000/external-ticket-event-vitaliy-gorbachev-blue-vitaly-gorbachev.png"
            />

            <p className="text-gray-700 font-semibold text-2xl text-center">
              Have an invite code?
            </p>
            <p className="text-gray-500 text-lg text-center">
              To unlock entry for authorised personnel
            </p>

            <div className="py-4">
              <ConsumerText
                type="text"
                name="inviteCode"
                success={cInviteCode === code}
                onBlur={() => {}}
                helperText={
                  cInviteCode === code
                    ? `Congratulations! ${1 * 100}% discount applied`
                    : cInviteCode
                    ? `Code is invalid. `
                    : ""
                }
                heading="Invite code"
                value={cInviteCode}
                onChangeText={(e: any) => setInviteCode(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <Button
                appearance="contained"
                type="submit"
                onClick={() => onPayClick(cInviteCode === code ? 1 : 0)}
              >
                {cInviteCode === code
                  ? "Enter the community"
                  : `Join for ₹${cost}`}
              </Button>
            </div>
          </div>
        </div>
      </CreateModal>
    </div>
  );
};

export default InviteCodeModal;
