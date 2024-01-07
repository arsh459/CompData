import { TemplateNotification } from "@models/Notifications";
// import { Button } from "@mui/material";
// import Link from "next/link";
import NotificationCard from "./NotificationCard";

interface Props {
  notifications: TemplateNotification[];
  toggle: (item: TemplateNotification, action: "add" | "remove") => void;
  cohortId: string;
}

const AllNotificationList: React.FC<Props> = ({
  notifications,
  toggle,
  cohortId,
}) => {
  return (
    <div className="m-4">
      <div className="flex my-2 flex-wrap">
        {notifications?.map((notObj) => {
          return (
            <div key={notObj.id} className="m-2">
              <NotificationCard
                notObj={notObj}
                item={notObj.id}
                onClick={() => toggle(notObj, "add")}
                btnCTA="Add"
                btnCTA2="Push Now"
                link2={`/admin/notifications/${cohortId}/push/${notObj.id}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllNotificationList;
