import { UserInterface, deliverableType } from "@models/User/User";
import { Checkbox } from "@mui/material";
import clsx from "clsx";

import React from "react";
interface Props {
  user: UserInterface | null;
  heading: string;
  bgColor: "bg-gray-100" | "bg-red-100" | "bg-green-100" | "bg-blue-100";
  onUpdateFlagObj: (key: deliverableType, val: boolean) => void;
}
const DocSection: React.FC<Props> = ({
  user,
  onUpdateFlagObj,
  heading,
  bgColor,
}) => {
  //   const { user, onSave, onUpdateFlagObj } = useUserFlags(remoteUser?.uid);

  if (!user) {
    return <div />;
  }

  return (
    <div className="w-screen relative p-4 z-0">
      <h1 className="text-xl">{heading}</h1>

      <div className={clsx(bgColor, " p-4 border")}>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.doc_consultation_booked}
            onChange={() =>
              onUpdateFlagObj(
                "doc_consultation_booked",
                !user?.deliverableFlags?.doc_consultation_booked
              )
            }
          />
          <p className="text-gray-700">Doc Consultation Booked</p>
        </div>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.doc_consultation_done}
            onChange={() =>
              onUpdateFlagObj(
                "doc_consultation_done",
                !user?.deliverableFlags?.doc_consultation_done
              )
            }
          />
          <p className="text-gray-700">Doc Consultation Done</p>
        </div>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.call_user_for_pending_doc}
            onChange={() =>
              onUpdateFlagObj(
                "call_user_for_pending_doc",
                !user?.deliverableFlags?.call_user_for_pending_doc
              )
            }
          />
          <p className="text-gray-700">
            Call user for pending doc consultation
          </p>
        </div>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.message_user_for_pending_doc}
            onChange={() =>
              onUpdateFlagObj(
                "message_user_for_pending_doc",
                !user?.deliverableFlags?.message_user_for_pending_doc
              )
            }
          />
          <p className="text-gray-700">
            Message User for pending doc consultation
          </p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.doc_fyi_message}
            onChange={() =>
              onUpdateFlagObj(
                "doc_fyi_message",
                !user?.deliverableFlags?.doc_fyi_message
              )
            }
          />
          <p className="text-gray-700">Doc FYI Message</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.prescription_sent}
            onChange={() =>
              onUpdateFlagObj(
                "prescription_sent",
                !user?.deliverableFlags?.prescription_sent
              )
            }
          />
          <p className="text-gray-700">Prescription Sent</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.doc_consultation_skip}
            onChange={() =>
              onUpdateFlagObj(
                "doc_consultation_skip",
                !user?.deliverableFlags?.doc_consultation_skip
              )
            }
          />
          <p className="text-gray-700">Doc Consultation Skipped</p>
        </div>
      </div>
    </div>
  );
};

export default DocSection;
