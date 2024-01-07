import Button from "@components/button";
import { handleUserActivityDownload } from "@models/User/summary";
import { useState } from "react";

interface Props {
  uid: string;
  date?: string;
}

const DownloadUserPageTemplate: React.FC<Props> = ({ uid, date }) => {
  const [loading, setLoading] = useState<boolean>(false);
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

  const onUserActivityClick = async () => {
    setLoading(true);

    try {
      const response = await handleUserActivityDownload(uid, 500, date);
      csvToFile(
        response,
        `${uid}_${date}_${new Date().toLocaleDateString()}.csv`
      );
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? (
        <p className="text-xl font-semibold ">Loading...</p>
      ) : (
        <div>
          <Button appearance="contained" onClick={onUserActivityClick}>
            {date ? `${date} download` : "Download"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DownloadUserPageTemplate;
