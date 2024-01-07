import { MixPanelCohort } from "@models/mixpanel/mixpanelCohort";
import { TemplateNotification } from "@models/Notifications";
// import { Button } from "@mui/material";
// import Link from "next/link";
import NotificationCard from "./NotificationCard";

interface Props {
  cohort: MixPanelCohort;
  notifications: { [notificationId: string]: TemplateNotification };
  toggle: (item: TemplateNotification, action: "add" | "remove") => void;
  //   pushNow: (id: string) => void;
}

const NotificationCohortMap: React.FC<Props> = ({
  cohort,
  notifications,
  toggle,
  //   pushNow,
}) => {
  return (
    <div className="m-4">
      <div className="flex my-2 flex-wrap">
        {cohort.onAddNotification
          ? [cohort.onAddNotification].map((item) => {
              const notObj = notifications[item];
              return (
                <div key={item} className="m-w">
                  {notObj ? (
                    <NotificationCard
                      notObj={notObj}
                      item={item}
                      onClick={() => toggle(notObj, "remove")}
                      btnCTA="Remove"
                      btnCTA2="Push Now"
                      link2={`/admin/notifications/${cohort.cohortId}/push/${item}`}
                      //   onClick2={() => pushNow(item)}
                    />
                  ) : (
                    <p>No Notification present</p>
                  )}
                </div>
              );
            })
          : null}
      </div>

      <div className="flex my-2 flex-wrap">
        {cohort.onCronNotifications?.map((item) => {
          const notObj = notifications[item];
          return (
            <div key={item} className="m-w">
              {notObj ? (
                <NotificationCard
                  notObj={notObj}
                  item={item}
                  onClick={() => toggle(notObj, "remove")}
                  btnCTA="Remove"
                />
              ) : (
                <p>No Notification present</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationCohortMap;
