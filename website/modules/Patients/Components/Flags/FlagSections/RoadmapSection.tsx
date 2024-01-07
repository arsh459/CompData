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
const RoadmapSection: React.FC<Props> = ({
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
    <div className="w-screen  relative p-4 z-0">
      <h1 className="text-xl">{heading}</h1>

      <div className={clsx(bgColor, " p-4 border")}>
        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.roadmap_consultation_time}
            onChange={() =>
              onUpdateFlagObj(
                "roadmap_consultation_time",
                !user?.deliverableFlags?.roadmap_consultation_time
              )
            }
          />
          <p className="text-gray-700">Roadmap Consultation Time booked</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.first_workout_consultation}
            onChange={() =>
              onUpdateFlagObj(
                "first_workout_consultation",
                !user?.deliverableFlags?.first_workout_consultation
              )
            }
          />
          <p className="text-gray-700">Roadmap Consultation done</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.call_user_for_pending_roadmap}
            onChange={() =>
              onUpdateFlagObj(
                "call_user_for_pending_roadmap",
                !user?.deliverableFlags?.call_user_for_pending_roadmap
              )
            }
          />
          <p className="text-gray-700">Call User for Pending roadmap time</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={
              user?.deliverableFlags?.message_user_for_pending_roadmap_cons
            }
            onChange={() =>
              onUpdateFlagObj(
                "message_user_for_pending_roadmap_cons",
                !user?.deliverableFlags?.message_user_for_pending_roadmap_cons
              )
            }
          />
          <p className="text-gray-700">
            Message user for pending roadmap consultation
          </p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.workout_fyi_message}
            onChange={() =>
              onUpdateFlagObj(
                "workout_fyi_message",
                !user?.deliverableFlags?.workout_fyi_message
              )
            }
          />
          <p className="text-gray-700">Workout FYI message</p>
        </div>

        <div className="pr-4 flex items-center">
          <Checkbox
            color="primary"
            checked={user?.deliverableFlags?.yoga_pdf}
            onChange={() =>
              onUpdateFlagObj("yoga_pdf", !user?.deliverableFlags?.yoga_pdf)
            }
          />
          <p className="text-gray-700">Yoga PDF</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;
