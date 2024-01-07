import { EventInterface } from "@models/Event/Event";

export const getGamePageSEO = (
  selectedEvent?: EventInterface | null,
  parentEvent?: EventInterface | null
) => {
  const gameName = selectedEvent?.parentId
    ? parentEvent?.name
    : selectedEvent?.name;
  const gameDesc = selectedEvent?.parentId
    ? parentEvent?.description
    : selectedEvent?.description;
  const gameImg = selectedEvent?.parentId
    ? parentEvent?.googleSEOImg
      ? parentEvent.googleSEOImg
      : parentEvent?.media[0]
    : selectedEvent?.googleSEOImg
    ? selectedEvent.googleSEOImg
    : selectedEvent?.media[0];
  const teamName = selectedEvent?.parentId ? selectedEvent.name : "";

  return {
    gameName,
    gameDesc,
    gameImg,
    teamName,
  };
};
