import { TemplateNotification } from "@models/Notifications";
import { Button } from "@mui/material";
import Link from "next/link";

interface Props {
  item: string;
  notObj: TemplateNotification;
  onClick?: () => void;
  btnCTA?: string;
  btnCTA2?: string;

  link2?: string;
}

const NotificationCard: React.FC<Props> = ({
  item,
  notObj,
  onClick,
  btnCTA,
  btnCTA2,
  link2,
}) => {
  return (
    <div className="border p-2">
      <p>id: {item}</p>
      {notObj ? (
        <div>
          <p>Schedule Type{notObj.scheduleType}</p>
          <p>Channel: {notObj.channel}</p>
          <p>Push title: {notObj.pushParams?.title}</p>
          <p>Push subtitle: {notObj.pushParams?.subtitle}</p>
          <div className="border p-4 text-sm">
            <p className="font-medium pb-2">
              Nav To: {notObj.pushParams?.navigateTo}
            </p>
            <p className="text-medium">Params</p>
            {notObj.pushParams?.navigateToParams &&
              Object.keys(notObj.pushParams?.navigateToParams).map(
                (item2, index) => {
                  const key = item2;
                  const value =
                    notObj.pushParams &&
                    notObj.pushParams?.navigateToParams &&
                    notObj.pushParams?.navigateToParams[item2]
                      ? notObj.pushParams?.navigateToParams[item2]
                      : "";
                  return (
                    <div key={`${item2}-${index}`}>
                      <p>
                        {key}: {item2 ? value : ""}
                      </p>
                    </div>
                  );
                }
              )}
          </div>

          <p>Img: {notObj.pushParams?.imageUrl ? "YES" : "No"}</p>
          {notObj.cronTimeString ? (
            <p>Cron Time String: {notObj.cronTimeString}</p>
          ) : null}

          <div className="pt-2 flex">
            <Link href={`/admin/notifications/compose/${item}`}>
              <Button variant="outlined">Edit</Button>
            </Link>

            {onClick && btnCTA ? (
              <div className="pl-2">
                <Button onClick={onClick} variant="contained">
                  {btnCTA}
                </Button>
              </div>
            ) : null}

            {btnCTA2 && link2 ? (
              <div className="pl-2">
                <Link href={link2}>
                  <Button variant="contained">{btnCTA2}</Button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NotificationCard;
