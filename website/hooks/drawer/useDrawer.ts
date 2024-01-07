import { masterDrawer } from "@components/drawers/constants";
import { DrawerElement } from "@components/drawers/Drawer";
import { createNewEvent, saveNewEvent } from "@models/Event/createUtils";
import { useState } from "react";
import { useDashboardQuery } from "./useDashboardQuery";

export const useDrawer = (uid?: string) => {
  const [drawerElements, setDrawerElements] =
    useState<DrawerElement[]>(masterDrawer);

  // console.log("masterDrawer", masterDrawer);

  const {
    onEventClick_route,
    onDrawerElementClick_route,
    pinLevel,
    formLevel,
    eventId,
    onBack,
  } = useDashboardQuery();

  const onCreateEvent = async () => {
    if (uid) {
      const newBlankEvent = createNewEvent("", "", "₹", [], 0, uid);
      try {
        await saveNewEvent(newBlankEvent);
        onEventClick_route(newBlankEvent.id, "current-event", "current-event");
      } catch (error) {
        console.log("error in creation", error);
      }
    }
  };

  const onEventClick = async (id: string) => {
    onEventClick_route(id, "current-event", "current-event");
  };

  return {
    onCreateEvent,
    onDrawerElementClick_route,
    onEventClick,
    drawerElements,
    setDrawerElements,
    pinLevel,
    formLevel,
    onBack,
    eventId,
  };
};
