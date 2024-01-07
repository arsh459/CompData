import { UserInterface, deliverableType } from "@models/User/User";
import { Checkbox } from "@mui/material";
import clsx from "clsx";

import React from "react";
interface Props {
  user: UserInterface | null;
  heading: string;
  bgColor: "bg-gray-100" | "bg-red-100" | "bg-green-100" | "bg-blue-100";
  onUpdateFlagObj: (key: deliverableType, val: boolean) => void;
  onDietFormFilled: (val: boolean) => void;
}
const DietSection: React.FC<Props> = ({
  user,
  onUpdateFlagObj,
  heading,
  bgColor,
  onDietFormFilled,
}) => {
  //   const { user, onSave, onUpdateFlagObj } = useUserFlags(remoteUser?.uid);

  if (!user) {
    return <div />;
  }

  return (
    <div className="w-screenrelative p-4 z-0">
      <h1 className="text-xl">{heading}</h1>

      <div className={clsx(bgColor, " p-4 border")}>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.diet_consultation_booked}
            onChange={() =>
              onUpdateFlagObj(
                "diet_consultation_booked",
                !user?.deliverableFlags?.diet_consultation_booked
              )
            }
          />
          <p className="text-gray-700">Diet Consultation Booked</p>
        </div>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.first_diet_consultation}
            onChange={() =>
              onUpdateFlagObj(
                "first_diet_consultation",
                !user?.deliverableFlags?.first_diet_consultation
              )
            }
          />
          <p className="text-gray-700">Diet Consultation Done</p>
        </div>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.call_user_for_diet_cons}
            onChange={() =>
              onUpdateFlagObj(
                "call_user_for_diet_cons",
                !user?.deliverableFlags?.call_user_for_diet_cons
              )
            }
          />
          <p className="text-gray-700">
            Call User for Pending diet consultation
          </p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.message_user_for_pending_diet_cons}
            onChange={() =>
              onUpdateFlagObj(
                "message_user_for_pending_diet_cons",
                !user?.deliverableFlags?.message_user_for_pending_diet_cons
              )
            }
          />
          <p className="text-gray-700">
            Message User for pending diet consultation
          </p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.diet_plan_created}
            onChange={() =>
              onUpdateFlagObj(
                "diet_plan_created",
                !user?.deliverableFlags?.diet_plan_created
              )
            }
          />
          <p className="text-gray-700">Diet Plan Created</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.diet_fyi_message}
            onChange={() =>
              onUpdateFlagObj(
                "diet_fyi_message",
                !user?.deliverableFlags?.diet_fyi_message
              )
            }
          />
          <p className="text-gray-700">Diet FYI message</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.roadmap_updated}
            onChange={() =>
              onUpdateFlagObj(
                "roadmap_updated",
                !user?.deliverableFlags?.roadmap_updated
              )
            }
          />
          <p className="text-gray-700">Roadmap Updated</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.flags?.dietFormFilled}
            onChange={() => onDietFormFilled(!user?.flags?.dietFormFilled)}
          />
          <p className="text-gray-700">Show I Button</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.diet_consultation_skip}
            onChange={() =>
              onUpdateFlagObj(
                "diet_consultation_skip",
                !user?.deliverableFlags?.diet_consultation_skip
              )
            }
          />
          <p className="text-gray-700">Diet Consultation Skipped</p>
        </div>
      </div>
    </div>
  );
};

export default DietSection;
