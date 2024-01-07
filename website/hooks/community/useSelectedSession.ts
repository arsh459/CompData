import { EventInterface, SessionV2 } from "@models/Event/Event";
import { useEffect, useState } from "react";

export const useSelectedSession = (
  sessionId?: string,
  selectedEvent?: EventInterface
) => {
  const [selectedSession, setSelectedSession] = useState<SessionV2>();
  useEffect(() => {
    if (sessionId && selectedEvent && selectedEvent.program) {
      const sess = selectedEvent.program.filter(
        (item) => item.id === sessionId
      );
      if (sess && sess.length > 0) {
        setSelectedSession(sess[0]);
      }
    } else {
      setSelectedSession(undefined);
    }
  }, [sessionId, selectedEvent]);

  return {
    selectedSession,
  };
};
