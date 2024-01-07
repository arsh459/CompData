import { getChildEvents } from "../../../models/sbEvent/getUtils";
import { updateChildEvent } from "../../../models/sbEvent/handleEvent";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";

export const handleChildEvents = async (event: sbEventInterface) => {
  const childEvents = await getChildEvents(event.id);

  for (const childEvent of childEvents) {
    await updateChildEvent(childEvent.id, event);
  }
};
