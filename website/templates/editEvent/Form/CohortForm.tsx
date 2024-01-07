import { formLabelValues } from "@components/drawers/constants";
import { useEditingCohort } from "@hooks/cohorts/useEditingCohort";
import {
  // createCohort,
  // deleteCohort,
  pinCohort,
  // saveCohort,
  // updateCohortDateValue,
  // updateCohortSessionValue,
  // updateCohortTextValue,
} from "@models/Event/createUtils";
import { LocalCohort } from "@models/Event/Event";
// import { useState } from "react";
import CohortHolder from "./CohortHolder/CohortHolder";
import EditingCohort from "./CohortHolder/EditingCohort";
import SingleDateTimePicker from "./DateTimeSelector/DateTimePicker";
// import DateTimeSelector from "./DateTimeSelector/DateTimeSelector";
import ListIntermediate from "./ListIntermediate/ListIntermediate";
// import SessionHolder from "./SessionHolder/SessionHolder";
import TextEntry from "./TextEntry";

interface Props {
  currentVisible: formLabelValues;
  eventId: string;
  setForm: (key: formLabelValues) => void;
  cohorts: LocalCohort[];
  uid: string;
  selectedCohort?: LocalCohort;
}

const CohortForm: React.FC<Props> = ({
  currentVisible,
  setForm,
  eventId,
  cohorts,
  uid,
  selectedCohort,
}) => {
  const {
    onNext,
    onCohortUpdate,
    removeCohort,
    onCohortSelect,
    newCohort,
    editingCohort,
    setEditingCohort,
  } = useEditingCohort(selectedCohort, eventId, cohorts, uid, setForm);

  return (
    <>
      <div className="">
        {currentVisible === "cohorts" ? (
          <ListIntermediate
            heading={
              cohorts.length > 0 ? "Select a cohort" : "Create a new cohort"
            }
            buttonText="Next"
            helperText="Cohort based coaching (Harvard recognised) has 10x higher success rate as compared to recorded videos"
            onButtonPress={() => onNext("cohorts")}
            leftButtonPress={newCohort}
            leftButtonText="Create Cohort"
          >
            <CohortHolder
              onClick={(id: string) => {
                onCohortSelect(id);
                setForm("cohortSize");
              }}
              onPinPress={(cohortId: string) =>
                pinCohort(eventId, cohortId, cohorts)
              }
              onClose={removeCohort}
              cohorts={cohorts}
            />
          </ListIntermediate>
        ) : currentVisible === "cohortSize" ? (
          <>
            <div className="pb-4">
              <EditingCohort
                cohorts={cohorts}
                editingId={editingCohort?.id}
                onClick={onCohortSelect}
                onNewCohort={newCohort}
              />
            </div>
            {editingCohort ? (
              <TextEntry
                //   leftButtonOnPress={() =>
                // onCohortSave("cohortSize", editingCohort?.cohortSize)
                //   }
                //   leftButtonText="Save"
                inputMode="numeric"
                heading="How many maximum students in cohort?"
                placeholder="Type here"
                helperText={`Post these signups, we will start a waitlist`}
                value={editingCohort?.cohortSize}
                onChangeText={(newVal: string | number) => {
                  setEditingCohort((prev) => {
                    if (prev) {
                      // console.log("newVal", newVal);
                      return {
                        ...prev,
                        cohortSize:
                          newVal && typeof newVal === "string"
                            ? parseInt(newVal)
                            : 0,
                      };
                    }
                  });
                }}
                buttonText="Save and next"
                multiline={false}
                onButtonPress={() =>
                  onCohortUpdate("cohortSize", editingCohort?.cohortSize)
                }
              />
            ) : null}
          </>
        ) : currentVisible === "cohortStarts" ? (
          <>
            <div className="pb-2">
              <EditingCohort
                cohorts={cohorts}
                editingId={editingCohort?.id}
                onClick={onCohortSelect}
                onNewCohort={newCohort}
              />
            </div>
            {editingCohort ? (
              <div>
                <SingleDateTimePicker
                  heading="Cohort starts?"
                  label="Start time"
                  helperText="When does the cohort start?"
                  datetime={editingCohort?.cohortStarts}
                  buttonText="Save and next"
                  onChange={(newVal: Date | null) =>
                    setEditingCohort((prev) => {
                      if (prev) {
                        return { ...prev, cohortStarts: newVal };
                      }
                    })
                  }
                  onButtonPress={() =>
                    onCohortUpdate(
                      "cohortStarts",
                      undefined,
                      editingCohort?.cohortStarts
                    )
                  }
                />
                {/*
                <SessionHolder
                  leftButtonText="Add Session"
                  buttonText="Save and Next"
                  onButtonPress={() => {}}
                  sessions={editingCohort.sessionsV2}
                  heading="Add sessions"
                  helperText="This can help in 5x completion rate"
                />
                
              // <DateTimeSelector
              //   heading="Add sessions"
              //   helperText="This can help in 5x completion rate"
              //   dateTimeList={editingCohort?.sessions}
              //   buttonText="Save and Next"
              //   onButtonPress={() =>
              //     onCohortUpdate(
              //       "sessions",
              //       undefined,
              //       undefined,
              //       editingCohort?.sessions
              //     )
              //   }
              //   onChangeSession={(newVal: Date | null, index: number) =>
              //     setEditingCohort((prev) => {
              //       if (prev) {
              //         return {
              //           ...prev,
              //           sessions: [
              //             ...prev.sessions.slice(0, index),
              //             {
              //               ...prev.sessions[index],
              //               startTime: newVal,
              //             },
              //             ...prev.sessions.slice(
              //               index + 1,
              //               prev.sessions.length
              //             ),
              //           ],
              //         };
              //       }
              //     })
              //   }
              //   onDeleteSession={(index: number) =>
              //     setEditingCohort((prev) => {
              //       if (prev) {
              //         return {
              //           ...prev,
              //           sessions: [
              //             ...prev.sessions.slice(0, index),
              //             ...prev.sessions.slice(
              //               index + 1,
              //               prev.sessions.length
              //             ),
              //           ],
              //         };
              //       }
              //     })
              //   }
              //   onAddSession={() =>
              //     setEditingCohort((prev) => {
              //       if (prev) {
              //         return {
              //           ...prev,
              //           sessions: [...prev.sessions, { startTime: new Date() }],
              //         };
              //       }
              //     })
              //   }
              // />
              */}
              </div>
            ) : null}
          </>
        ) : currentVisible === "cohortJoinURL" ? (
          <>
            <div className="pb-4">
              <EditingCohort
                cohorts={cohorts}
                editingId={editingCohort?.id}
                onClick={onCohortSelect}
                onNewCohort={newCohort}
              />
              <TextEntry
                inputMode="text"
                heading="Add invite for your event"
                placeholder="Paste here"
                helperText={`A join URL for Zoom or GoogleMeet`}
                value={
                  editingCohort?.cohortJoinURL
                    ? editingCohort?.cohortJoinURL
                    : ""
                }
                onChangeText={(newVal: string) => {
                  setEditingCohort((prev) => {
                    if (prev) {
                      // console.log("newVal", newVal);
                      return {
                        ...prev,
                        cohortJoinURL: newVal,
                      };
                    }
                  });
                }}
                buttonText="Save and Next"
                multiline={false}
                onButtonPress={() =>
                  onCohortUpdate("cohortJoinURL", editingCohort?.cohortJoinURL)
                }
              />
            </div>
          </>
        ) : currentVisible === "registerBy" ? (
          <>
            <div className="pb-4">
              <EditingCohort
                cohorts={cohorts}
                editingId={editingCohort?.id}
                onClick={onCohortSelect}
                onNewCohort={newCohort}
              />
            </div>
            {editingCohort ? (
              <SingleDateTimePicker
                heading="Deadline?"
                label="Select a deadline"
                helperText="Setting a last date to register creates urgency"
                datetime={editingCohort?.registerBy}
                buttonText="Save and next"
                onChange={(newVal: Date | null) =>
                  setEditingCohort((prev) => {
                    if (prev) {
                      return { ...prev, registerBy: newVal };
                    }
                  })
                }
                onButtonPress={() =>
                  onCohortUpdate(
                    "registerBy",
                    undefined,
                    editingCohort?.registerBy
                  )
                }
              />
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default CohortForm;

// Take event name
// Add event description
// Add event media
// Add event cost
// Done
