// import { pinnedDrawer } from "@components/drawers/constants";
import Drawer from "@components/drawers/Drawer";
import { useDrawer } from "@hooks/drawer/useDrawer";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";
import Script from "next/script";
import EventBrowser from "./EventBrowser";
import EventCreator from "./EventCreator/EventCreator";
import ProfileEditor from "./ProfileEditor/ProfileEditor";
import Registrations from "./Registrations/Registrations";

interface Props {
  user: UserInterface;
}
const EditEventTemplate: React.FC<Props> = ({ user }) => {
  const {
    drawerElements,
    setDrawerElements,
    onCreateEvent,
    onDrawerElementClick_route,
    pinLevel,
    formLevel,
    onEventClick,
  } = useDrawer(user.uid);

  // console.log("drawerElements", drawerElements);

  return (
    <div
      className={clsx(
        // "relative",
        "flex",
        "w-full h-screen",
        "bg-gradient-to-b from-gray-50 to-gray-200"
      )}
    >
      <Script
        type="text/javascript"
        strategy="lazyOnload"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      <div className="flex-none h-full overflow-y-auto">
        <Drawer
          pin={pinLevel ? pinLevel : "all-events"}
          onTopButtonClick={onCreateEvent}
          selectedValue={formLevel ? formLevel : "all-events"}
          elements={drawerElements}
          onElementClick={onDrawerElementClick_route}
        />
      </div>

      <div className="flex-grow w-full h-full overflow-y-auto">
        {pinLevel === "current-event" ? (
          <EventCreator
            selectedFormValue={formLevel ? formLevel : "all-events"}
            setForm={onDrawerElementClick_route}
            setDrawerElements={setDrawerElements}
            user={user}
          />
        ) : pinLevel === "all-events" || !pinLevel ? (
          <EventBrowser
            uid={user.uid}
            onTopButtonClick={onCreateEvent}
            onEventClick={onEventClick}
            onCreateEvent={onCreateEvent}
          />
        ) : pinLevel === "profile" ? (
          <ProfileEditor
            user={user}
            selectedFormValue={formLevel ? formLevel : "all-events"}
            setForm={onDrawerElementClick_route}
            setDrawerElements={setDrawerElements}
          />
        ) : (
          <Registrations user={user} />
        )}
      </div>

      <div className="" />
    </div>
  );
};

export default EditEventTemplate;
