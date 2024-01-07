import { useNotificationTemplates } from "@hooks/notifications/useNotificationTemplates";
import Link from "next/link";

const AllNotificationTemplates = () => {
  const { notificationTemplates, onDelete } = useNotificationTemplates();

  return (
    <div className="p-4">
      <div className="flex">
        <Link href={`/admin/notifications/compose/addNewNotification`} passHref>
          <span className="bg-red-500 text-white text-base rounded-xl px-4 py-2">
            Add New Notification Template
          </span>
        </Link>
        <div className="pl-2">
          <Link href={`/admin/notifications`} passHref>
            <span className="bg-blue-500 text-white text-base rounded-xl px-4 py-2">
              Browse Cohorts
            </span>
          </Link>
        </div>
      </div>
      <hr className="my-4" />
      <p className="text-xl font-bold">All Notification Templates</p>
      <div className="py-4 flex flex-wrap">
        {notificationTemplates.map((notificationTemplate) => (
          <div className="p-2 m-2 border" key={notificationTemplate.id}>
            <p className="whitespace-nowrap">Id: {notificationTemplate.id}</p>
            <p className="whitespace-nowrap">
              Name: {notificationTemplate.templateName}
            </p>
            <p className="whitespace-nowrap">
              Channel: {notificationTemplate.channel}
            </p>
            <p className="whitespace-nowrap">
              Schedule Type: {notificationTemplate.scheduleType}
            </p>
            <div className="flex justify-between items-center">
              <Link
                href={`/admin/notifications/compose/${notificationTemplate.id}`}
                passHref
              >
                <span className="text-blue-500">Edit</span>
              </Link>
              <button
                className="text-red-500"
                onClick={() => onDelete(notificationTemplate)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNotificationTemplates;
