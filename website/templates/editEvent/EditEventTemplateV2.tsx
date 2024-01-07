// import { pinnedDrawer } from "@components/drawers/constants";
// import { formLabelValues } from "@components/drawers/constants";
// import Drawer from "@components/drawers/Drawer";
import { useDrawer } from "@hooks/drawer/useDrawer";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";
// import { useRouter } from "next/router";
import Script from "next/script";
// import { useEffect, useState } from "react";
// import EventBrowser from "./EventBrowser";
// import EventCreator from "./EventCreator/EventCreator";
import EventCreatorV2 from "./EventCreator/EventCreatorV2";
// import ProfileEditor from "./ProfileEditor/ProfileEditor";
// import Registrations from "./Registrations/Registrations";
// import { dashboardQuery } from "@hooks/drawer/interface";
// import { useDashboardQuery } from "@hooks/drawer/useDashboardQuery";
import Welcome from "./Form/Welcome";
import DrawerV2 from "@components/drawers/DrawerV2";

interface Props {
  user: UserInterface;
}
const EditEventTemplateV2: React.FC<Props> = ({ user }) => {
  const {
    drawerElements,
    // setDrawerElements,
    onCreateEvent,
    onDrawerElementClick_route,
    pinLevel,
    formLevel,
    // onEventClick,
    // onBack,
    eventId,
  } = useDrawer(user.uid);

  //   const { pinLevel, formLevel, eventId } = useDashboardQuery();

  // console.log("drawerElements", drawerElements);
  //   const [formLevel, setForm] = useState<formLabelValues>("name");
  //   const [pinLevel, setPinLevel] = useState<formLabelValues>("");

  //   const router = useRouter();
  //   const q = router.query as dashboardQuery;
  //   useEffect(() => {
  //     if (router.isReady && q.formLevel) {
  //       setForm(q.formLevel as formLabelValues);
  //     } else if (router.isReady) {
  //       setForm("name");
  //     }
  //   }, [router.isReady, q.formLevel]);

  return (
    <div
      className={clsx(
        // "relative",
        "flex",
        "w-full h-screen"
        // "bg-gradient-to-b from-gray-50 to-gray-200"
      )}
    >
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        src="https://widget.cloudinary.com/v2.0/global/all.js"
      />
      <div className="flex-none h-full overflow-y-auto">
        <DrawerV2
          pin={pinLevel ? pinLevel : "all-events"}
          onTopButtonClick={onCreateEvent}
          selectedValue={formLevel ? formLevel : "all-events"}
          elements={drawerElements}
          onElementClick={onDrawerElementClick_route}
        />
      </div>

      {eventId && formLevel ? (
        <div className="flex-grow w-full h-full overflow-y-auto">
          <EventCreatorV2
            selectedFormValue={formLevel}
            setForm={onDrawerElementClick_route}
            setDrawerElements={() => {}}
            user={user}
            //   onBack={onBack}
          />
        </div>
      ) : (
        <div className="h-full items-center flex justify-center">
          <Welcome
            live={false}
            liveHeading="Create a new program"
            subtitle="Transform lives & monetize your talent"
            liveHelperText="Click above to start"
            leftButtonText="Create"
            buttonText="Create New Program"
            rightButtonText="ss"
            inDraftHelperText="Click above to start"
            inDraftHeading="Create a new program"
            onButtonPress={onCreateEvent}
          />
        </div>
      )}
    </div>
  );
};

export default EditEventTemplateV2;
