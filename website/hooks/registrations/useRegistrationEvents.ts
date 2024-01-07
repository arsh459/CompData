import { EventInterface } from "@models/Event/Event";
import { getEvent } from "@models/Event/getUtils";
import { useEffect, useState } from "react";

export const useRegistrationEvents = (eventObj: { [id: string]: boolean }) => {
  const [remoteEvents, setRemoteEvents] = useState<{
    [eventId: string]: EventInterface;
  }>({});

  useEffect(() => {
    const getRemoteEvents = async () => {
      const remEvents: { [eventId: string]: EventInterface } = {};
      for (const id of Object.keys(eventObj)) {
        const remEventObj = await getEvent(id);

        if (remEventObj) {
          remEvents[id] = remEventObj;
        }
      }

      setRemoteEvents(remEvents);
    };

    getRemoteEvents();
  }, [eventObj]);

  return {
    remoteEvents,
  };
};
