import { FBEventInterface } from "../interface";
import { computeSHA256 } from "./createHash";

export const hashRequestData = (event: FBEventInterface): FBEventInterface => {
  return {
    ...event,
    user_data: {
      ...event.user_data,
      ...(event.user_data.em ? { em: computeSHA256(event.user_data.em) } : {}),
      ...(event.user_data.ph ? { ph: computeSHA256(event.user_data.ph) } : {}),
      ...(event.user_data.fn ? { fn: computeSHA256(event.user_data.fn) } : {}),
      ...(event.user_data.ln ? { fn: computeSHA256(event.user_data.ln) } : {}),

      ...(event.user_data.db ? { db: computeSHA256(event.user_data.db) } : {}),
      ...(event.user_data.ge ? { ge: computeSHA256(event.user_data.ge) } : {}),

      ...(event.user_data.ct ? { ct: computeSHA256(event.user_data.ct) } : {}),
      ...(event.user_data.st ? { st: computeSHA256(event.user_data.st) } : {}),
      ...(event.user_data.zp ? { zp: computeSHA256(event.user_data.zp) } : {}),
      ...(event.user_data.country
        ? { country: computeSHA256(event.user_data.country) }
        : {}),

      ...(event.user_data.external_id
        ? { external_id: computeSHA256(event.user_data.external_id) }
        : {}),
    },
  };
};
