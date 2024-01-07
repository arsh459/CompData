import { UserInterface, deliverableType } from "@models/User/User";
import { Checkbox } from "@mui/material";
import clsx from "clsx";

import React from "react";
interface Props {
  user: UserInterface | null;
  heading: string;
  bgColor: "bg-gray-100" | "bg-red-100" | "bg-green-100" | "bg-blue-100";
  onUpdateFlagObj: (key: deliverableType, val: boolean) => void;
  onUpdateTestUser: (val: boolean) => void;
}
const WelcomeSection: React.FC<Props> = ({
  user,
  onUpdateFlagObj,
  heading,
  bgColor,
  onUpdateTestUser,
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
            checked={user?.testUser}
            onChange={() => onUpdateTestUser(!user?.testUser)}
          />
          <p className="text-gray-700">Is Test USER</p>
        </div>
        <div className="pr-4 flex items-center">
          {" "}
          <div className="pr-4 flex items-center">
            <Checkbox
              color="primary"
              checked={user?.deliverableFlags?.initial_flags_checked}
              onChange={() =>
                onUpdateFlagObj(
                  "initial_flags_checked",
                  !user?.deliverableFlags?.initial_flags_checked
                )
              }
            />
            <p className="text-gray-700">Initial Flags Checked</p>
          </div>
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.welcome_paid_message}
            onChange={() =>
              onUpdateFlagObj(
                "welcome_paid_message",
                !user?.deliverableFlags?.welcome_paid_message
              )
            }
          />
          <p className="text-gray-700">Welcome message sent</p>
        </div>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.invoice_sent}
            onChange={() =>
              onUpdateFlagObj(
                "invoice_sent",
                !user?.deliverableFlags?.invoice_sent
              )
            }
          />
          <p className="text-gray-700">Invoice Sent</p>
        </div>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.watch_user}
            onChange={() =>
              onUpdateFlagObj("watch_user", !user?.deliverableFlags?.watch_user)
            }
          />
          <p className="text-gray-700">Watch User</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
