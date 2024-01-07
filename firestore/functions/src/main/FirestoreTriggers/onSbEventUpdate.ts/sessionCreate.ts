import { saveSession } from "../../../models/sbEvent/getUtils";
import { sbEventInterface } from "../../../models/sbEvent/sbEvent";

export const sessionCreate = async (newEvent: sbEventInterface) => {
  if (newEvent.program) {
    newEvent.program.map(async (item) => {
      await saveSession(item, newEvent.id);
    });
  }
};
