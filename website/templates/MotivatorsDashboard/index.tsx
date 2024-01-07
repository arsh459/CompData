import Button from "@components/button";
import { useMotivators } from "@hooks/motivator/useMotivators";

import DaySelectorStrip from "@templates/AdminDashboard/SlotDashboard/DaySelectorStrip";
import { format } from "date-fns";
import Link from "next/link";

interface Props {}

const MotivatorDashboard: React.FC<Props> = ({}) => {
  const { motivated, motivators, period, setPeriod } = useMotivators();

  const exportAsCSV = () => {
    const data = Object.values(motivated);

    const csvString = [
      [
        "uid",
        "name",
        "phone",
        "motivatedBy",
        "motivatedOn",
        "age",
        "weight",
        "height",
        "gender",
        "Ad Source",
        "onboarded",
      ],
      ...data.map((item) => [
        item.uid,
        item.name ? item.name : "No Name",
        item.motivatedBy ? item.motivatedBy : "NA",
        item.motivatedOn
          ? format(new Date(item.motivatedOn), "yyyy-MM-dd hh:mm")
          : "NA",
        item.age ? item.age : "NA",
        item.weight ? item.weight : "NA",
        item.height ? item.height : "NA",
        item.gender ? item.gender : "NA",
        item.adSource ? item.adSource : "No Ad",
        item.onboarded ? "YES" : "NO",
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `motivatorList_${Date.now()}`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <DaySelectorStrip
        periodList={["Day before", "Yesterday", "Today", "All"]}
        setPeriod={setPeriod}
        period={period}
      />

      <div className="flex px-4">
        <Button
          onClick={exportAsCSV}
          appearance="contained"
          title="Download as CSV"
        >
          Download as CSV
        </Button>
      </div>

      <div className="py-4 flex flex-wrap">
        {motivated.map((item) => {
          const motivatedBy = item.motivatedBy
            ? motivators[item.motivatedBy]
            : undefined;
          return (
            <div key={item.uid} className="p-4 border m-4">
              <p>Name: {item.name}</p>
              <p>UID: {item.uid}</p>
              <p>
                Slot Status:{" "}
                {item.onboardingCallStatus ? item.onboardingCallStatus : "NA"}
              </p>
              <Link href={`/admin/u/${item.uid}`}>
                <p className="text-blue-500">Go To User</p>
              </Link>
              <div className="pt-2">
                <p className="text-red-500">
                  MOTIVATED By: {motivatedBy?.name ? motivatedBy.name : "NONE"}
                </p>
                <p className="text-red-500">
                  From Ad: {item?.adSource ? item.adSource : "No"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MotivatorDashboard;
