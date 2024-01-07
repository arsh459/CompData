import { Cohort, EventInterface } from "@models/Event/Event";
import { getEvent, getEventCohorts } from "@models/Event/getUtils";
import { useEffect, useState } from "react";

export const useRegistrationCohorts = (eventObj: { [id: string]: boolean }) => {
  const [remoteCohorts, setRemoteEventCohorts] = useState<{
    [eventId: string]: { [cohortId: string]: Cohort };
  }>({});
  const [remoteEvents, setRemoteEvents] = useState<{
    [eventId: string]: EventInterface;
  }>({});

  useEffect(() => {
    const getRemoteEvents = async () => {
      const remCohortsObj: {
        [eventId: string]: { [cohortId: string]: Cohort };
      } = {};
      const remEvents: { [eventId: string]: EventInterface } = {};
      for (const id of Object.keys(eventObj)) {
        const remEventObj = await getEvent(id);
        if (remEventObj) {
          remEvents[id] = remEventObj;
          const remCohorts = await getEventCohorts(id);

          if (remCohortsObj[id]) {
            remCohortsObj[id] = remCohorts;
          } else {
            remCohortsObj[id] = {};
            remCohortsObj[id] = remCohorts;
          }
        }
      }

      setRemoteEventCohorts(remCohortsObj);
      setRemoteEvents(remEvents);
    };

    getRemoteEvents();
  }, [eventObj]);

  return {
    remoteCohorts,
    remoteEvents,
  };
};
