import { notifications } from "../constants";
import Notification from "../Notification/Notification";

interface Props {
  // userNotifications?: NotificationInterface[];
}

const NotificationHolder: React.FC<Props> = () => {
  return (
    <div>
      {notifications.map((item) => {
        return (
          <div key={item.heading}>
            <Notification
              heading={item.heading}
              text={item.text}
              img={item.img}
              timeLabel={item.timeLabel}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NotificationHolder;
