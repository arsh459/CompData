import { chats } from "../constants";
import Notification from "@templates/dashboard/Notification/Notification";

interface Props {}

const NotificationHolder: React.FC<Props> = ({}) => {
  return (
    <div>
      {chats.map((item) => {
        return (
          <div key={item.heading}>
            <Notification
              heading={item.heading}
              text={item.text}
              img={item.img}
              unread={item.unread}
              label={item.sourceLabel}
              timeLabel={item.timeLabel}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NotificationHolder;
