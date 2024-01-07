import { useState } from "react";
import Button from "@components/button";
import {
  handleProgressActivityRequest,
  handleProgressDataRequest,
} from "@models/User/summary";
import { useCalendar } from "@templates/Recommendations/hooks/useCalendar";
import DateModal from "@templates/Recommendations/DateModal";
import { format } from "date-fns";

interface Props {}

const ExportDataTemplate: React.FC<Props> = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { st, q } = useCalendar();
  const csvToFile = (response: string, fileName: string) => {
    var blob = new Blob([response], { type: "text/csv;charset=utf-8;" });

    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const startTime = q.dS ? st : Date.now() - 3 * 30 * 24 * 60 * 60 * 1000;
  const startTimeActivity = q.dS ? st : Date.now() - 7 * 24 * 60 * 60 * 1000;
  const startTimeString = format(new Date(startTime), "dd MMM yyyy");
  const startTimeStringActivity = format(
    new Date(startTimeActivity),
    "dd MMM yyyy"
  );

  const onUserDump = async () => {
    setLoading(true);
    const response = await handleProgressDataRequest(startTime);
    csvToFile(
      response,
      `${startTimeString}_${new Date().toLocaleDateString()}.csv`
    );
    setLoading(false);
  };

  const onUserActivityDump = async () => {
    setLoading(true);
    const response = await handleProgressActivityRequest(startTime);
    csvToFile(
      response,
      `${startTimeStringActivity}_${new Date().toLocaleDateString()}.csv`
    );
    setLoading(false);
  };

  return (
    <div className="w-full h-full p-4">
      {loading ? (
        <p className="text-xl font-semibold ">Loading...</p>
      ) : (
        <div>
          <div className="py-4">
            <DateModal q={q} />
          </div>
          <div className="flex">
            <Button onClick={onUserDump} appearance="contained">
              {`${startTimeString} - now  `} Progress Data
            </Button>
            <div className="pl-4">
              <Button onClick={onUserActivityDump} appearance="contained">
                {`${startTimeStringActivity} - now  `} Activity Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportDataTemplate;
