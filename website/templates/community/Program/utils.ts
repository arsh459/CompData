import { EventInterface } from "@models/Event/Event";

export const isParentChalenge = (event?: EventInterface) => {
  if (event?.eventType === "challenge" && !event.parentId) {
    return true;
  }

  return false;
};
