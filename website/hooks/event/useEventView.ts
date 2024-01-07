import { useEffect } from "react";
import axios from "axios";

export const useEventView = (
  eventId: string,
  ownerUID: string,
  live: boolean | undefined
) => {
  useEffect(() => {
    const incrementView = async () => {
      try {
        await axios({
          url: "/api/views/add",
          method: "POST",
          params: {
            eventId: eventId,
            ownerUID: ownerUID,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    if (live) incrementView();
  }, [eventId, ownerUID, live]);
};
