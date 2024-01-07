import { days } from "@models/slots/Slot";
import Link from "next/link";

interface Props {}

const SlotDashboard: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-row flex-wrap">
      {days.map((item) => {
        return (
          <Link key={item} href={`/admin/slots/${item}`}>
            <div className="text-black p-4 m-4 border">
              <p>{item}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SlotDashboard;
