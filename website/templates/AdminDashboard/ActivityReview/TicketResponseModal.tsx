// import Button from "@components/button";
import Button from "@components/button";
import {
  //   Activity,
  ActivityTicket,
  //   ReviewMessage,
  //   reviewStatus,
} from "@models/Activities/Activity";
import { TextField } from "@mui/material";
// import {
//   onSaveNewReviewToAct,
//   updateActivityTask,
// } from "@models/Activities/createUtils";
// import { Task } from "@models/Tasks/Task";
// import { UserInterface } from "@models/User/User";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import TopClose from "@templates/community/Program/Feed/TopClose";
import { useEffect, useState } from "react";
import { onMarkTicket } from "@models/Activities/reportUtils";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  ticket?: ActivityTicket;
  uid: string;
  activityId: string;
}

const TicketResponseModal: React.FC<Props> = ({
  isVisible,
  onClose,
  ticket,
  uid,
  activityId,
}) => {
  const [text, setText] = useState<string>(
    ticket?.judgeMessage ? ticket?.judgeMessage : ""
  );

  useEffect(() => {
    setText(ticket?.judgeMessage ? ticket?.judgeMessage : "");
  }, [ticket?.judgeMessage]);

  const onSave = async () => {
    if (ticket?.id) {
      await onMarkTicket(uid, activityId, ticket?.id, "REVIEWED", text);
    }

    onClose();
  };

  // console.log("ticket", ticket?.judgeMessage, ticket?.id);

  return (
    <CreateModal
      heading=""
      isOpen={isVisible}
      onCloseModal={onClose}
      onBackdrop={onClose}
      onButtonPress={onClose}
    >
      <div className="p-4">
        <div className="pb-2 cursor-pointer">
          <TopClose onCloseModal={onClose} />
        </div>
        <div>
          <div className="pt-4">
            <TextField
              style={{ width: "100%" }}
              helperText="Message for user"
              placeholder="Optional"
              label="Add Message (Optional)"
              variant="outlined"
              onChange={(newVal) => setText(newVal.target.value)}
              value={text}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="button" appearance="outline" onClick={onClose}>
            <p className="text-gray-700">Back</p>
          </Button>

          <div className="pl-2">
            <Button type="button" appearance="contained" onClick={onSave}>
              <p className="text-white">Submit Review</p>
            </Button>
          </div>
        </div>
      </div>
    </CreateModal>
  );
};

export default TicketResponseModal;
