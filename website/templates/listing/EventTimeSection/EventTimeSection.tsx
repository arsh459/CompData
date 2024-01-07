import clsx from "clsx";
import React from "react";
// import Divider from "@components/divider/Divider";
import TextLayout from "../Layout/TextLayout";
// import IconRow from "@templates/listing/IconSection/IconRow";
import RowKPI from "./RowKPI";
import Divider from "@components/divider/Divider";
import { LocalCohort } from "@models/Event/Event";

interface Props {
  // eventDateTimeList: Date[] | null | undefined;
  selectedCohort?: LocalCohort;
  editing: boolean | undefined;
  active: boolean;
  heading: string;
  editingHeading: string;
  placeholderText: string;
  cohortSize: number | undefined;
  cohortSizePlaceholder: string;
  viewStyle?: "mobile" | "desktop";
  keyWord: string;
  numSessions: number;
}
const EventTimeSection: React.FC<Props> = ({
  selectedCohort,
  active,
  editing,
  heading,
  editingHeading,
  placeholderText,
  cohortSize,
  cohortSizePlaceholder,
  viewStyle,
  keyWord,
  numSessions,
}) => {
  return (
    <TextLayout active={active} editing={editing}>
      <div className={clsx("pt-0")}>
        <div className="">
          {selectedCohort ? null : (
            <p
              className={clsx(
                editing && !active ? "text-gray-400" : "text-gray-700",
                "text-xl font-medium"
              )}
            >
              {editing ? editingHeading : heading ? heading : null}
            </p>
          )}
        </div>

        <div className="pt-4 pb-8">
          <Divider />
        </div>

        <div>
          <div className="pt-0">
            <RowKPI
              subtext="Limited seats only"
              editing={editing}
              active={active}
              viewStyle={viewStyle}
              // icon="https://img.icons8.com/ios/50/000000/clock--v1.png"
              icon="/images/clock-outline.svg"
              visbleText={
                selectedCohort && selectedCohort.cohortStarts
                  ? `${keyWord} starts: ${selectedCohort.cohortStarts.toLocaleString(
                      "default",
                      {
                        month: "short",
                        day: "2-digit",
                        hour: "numeric",
                        weekday: "short",
                        hour12: true,
                        minute: "2-digit",
                      }
                    )}`
                  : ""
              }
              visible={
                selectedCohort && selectedCohort.cohortStarts ? true : false
              }
              placeholderText={`${keyWord} starts: ${placeholderText}`}
            />
          </div>

          <div className="pt-4">
            <RowKPI
              subtext="All attendees have similar goals"
              editing={editing}
              active={active}
              viewStyle={viewStyle}
              // icon="https://img.icons8.com/dotty/80/000000/class.png"
              icon="/images/people-outline.svg"
              visbleText={
                cohortSize ? `${keyWord} has upto ${cohortSize} members` : ""
              }
              visible={cohortSize ? true : false}
              placeholderText={cohortSizePlaceholder}
            />
          </div>

          <div className="pt-4">
            <RowKPI
              subtext="Join online via Zoom/Meet"
              editing={editing}
              active={active}
              viewStyle={viewStyle}
              // icon="https://img.icons8.com/dotty/80/000000/class.png"
              icon="/images/layers-outline.svg"
              visbleText={numSessions ? `Total sessions: ${numSessions}` : ""}
              visible={numSessions ? true : false}
              placeholderText={""}
            />
          </div>
        </div>

        <div className="pt-8 pb-4">
          <Divider />
        </div>
      </div>
    </TextLayout>
  );
};

export default EventTimeSection;
