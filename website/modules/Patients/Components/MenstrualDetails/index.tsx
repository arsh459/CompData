import { UserInterface } from "@models/User/User";
import ListElementCard from "@modules/Patients/ListElementCard";
import React, { useState } from "react";
import ListExpander from "../ListExpander";
import { EditObject } from "@templates/PatientProfileTemplate/ProfileEdit/interface";
// import { getMenstrualDetailsEditObject } from "@modules/Patients/utils/MenstrualDetailsUtils";
import { format } from "date-fns";
import { useLastPeriod } from "@hooks/cycle/useLastPeriod";
import { useLastCycle } from "@hooks/cycle/useLastCycle";
import { useRouter } from "next/router";

interface Props {
  user?: UserInterface;
  color: string;
  highlightColor: string;
  onEdit?: (val: EditObject) => void;
}

const MenstrualDetails: React.FC<Props> = ({
  user,
  color,
  highlightColor,
  onEdit,
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const onExpand = () => {
    setShow((p) => !p);
  };

  const handleEdit = onEdit
    ? () => {
        // onEdit(getMenstrualDetailsEditObject(user));
        router.push(
          `/admin/patients/${user?.uid}/progress/period`
          // `${router.asPath}/progress/period`
        );
      }
    : undefined;

  const { lastPeriod } = useLastPeriod(user?.uid);
  const { lastCycle } = useLastCycle(user?.uid);

  return (
    <ListExpander
      onExpand={onExpand}
      show={show}
      headingText="Menstrual Details"
      color={color}
      highlightColor={highlightColor}
      onEdit={handleEdit}
    >
      {show ? (
        <>
          <div className="bg-black/10 h-px w-full" />
          <ListElementCard
            primaryText="Symptoms During Period"
            secondaryText={
              user?.periodTrackerObj?.symptomsDuringPeriod
                ? user.periodTrackerObj.symptomsDuringPeriod.join(", ")
                : "NA"
            }
            borderTw="border-b"
          />
          <ListElementCard
            primaryText="Symptoms Before Period"
            secondaryText={
              user?.periodTrackerObj?.symptomsBeforePeriod
                ? user.periodTrackerObj.symptomsBeforePeriod.join(", ")
                : "NA"
            }
            borderTw="md:border-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black/10">
            <div className="mx-0">
              <ListElementCard
                primaryText="Last Period Date"
                secondaryText={
                  lastPeriod ? format(lastPeriod.unix, "do MMMM yy") : "NA"
                }
              />
              <ListElementCard
                primaryText="Period Length"
                secondaryText={
                  lastCycle?.phaseSplits
                    ? `${lastCycle.phaseSplits.PERIOD.length}`
                    : user?.periodTrackerObj
                    ? `${user?.periodTrackerObj?.inputPeriodLength}`
                    : "NA"
                }
              />
            </div>
            <div className="mx-0">
              <ListElementCard
                primaryText="Flow Type"
                secondaryText={
                  user?.periodTrackerObj?.initialFlow ||
                  "Under Development" ||
                  "NA"
                }
              />
              <ListElementCard
                primaryText="Cycle Length"
                secondaryText={
                  lastCycle?.length
                    ? `${lastCycle.length}`
                    : user?.periodTrackerObj
                    ? `${user?.periodTrackerObj?.inputCycleLength}`
                    : "NA"
                }
              />
            </div>
          </div>
        </>
      ) : null}
    </ListExpander>
  );
};

export default MenstrualDetails;
