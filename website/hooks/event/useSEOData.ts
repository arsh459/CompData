import { getSEOImg, getWidthHeight } from "@layouts/SEO/getSEOImg";
import { EventInterface } from "@models/Event/Event";

export const useSEOData = (event: EventInterface | null) => {
  return {
    title: event?.googleTitle
      ? event.googleTitle
      : event?.name
      ? event.name
      : "Creator event",
    desc: event?.googleDescription
      ? event.googleDescription
      : event?.description
      ? event.description.slice(0, 140)
      : "Creator event",
    img: event?.googleSEOImg
      ? getSEOImg([event.googleSEOImg])
      : event?.media
      ? getSEOImg(event?.media)
      : "",
    ...getWidthHeight(event?.media ? event?.media[0] : undefined),
  };
};
