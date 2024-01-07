import { CategoryTypes } from "@templates/CalendlyTemplate/CalendlyTemplateV2";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";

export const parseCalendlyQuery = (
  query: NextParsedUrlQuery
): {
  uuid: string;
  uid: string;
  type: CategoryTypes;
  appointmentId: string;
} => {
  return {
    uuid: query.uuid && typeof query.uuid === "string" ? query.uuid : "",
    uid: query.uid && typeof query.uid === "string" ? query.uid : "",
    type:
      query.type && typeof query.type === "string"
        ? (query.type as CategoryTypes)
        : "sales",
    appointmentId:
      query.appointmentId && typeof query.appointmentId === "string"
        ? query.appointmentId
        : "",
  };
};
