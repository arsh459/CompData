import Divider from "@components/divider/Divider";
import Header from "./Header/Header";
import KPIHolder from "./KPIHolder/KPIHolder";
import NotificationHolder from "./NotificationHolder/NotificationHolder";

interface Props {}

const DashboardTemplate: React.FC<Props> = ({}) => {
  return (
    <div className="rounded-xl">
      <div className="z-50">
        <Header label="Dashboard" />
      </div>
      <div className="p-4 pb-0 bg-gradient-to-b from-gray-50 to-gray-50">
        <KPIHolder />
      </div>
      <div className="p-4 bg-gradient-to-b from-gray-50 to-white">
        <Divider />
      </div>
      <div className="bg-gradient-to-b from-white to-gray-100">
        <NotificationHolder />
      </div>

      <div className="bg-gradient-to-b from-gray-100 to-white h-4 rounded-b-xl" />
    </div>
  );
};

export default DashboardTemplate;
