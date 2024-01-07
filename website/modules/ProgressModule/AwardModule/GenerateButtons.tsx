import { UserInterface } from "@models/User/User";
import axios from "axios";
import { useState } from "react";

interface Props {
  remoteUser: UserInterface;
}

const GenerateButtons: React.FC<Props> = ({ remoteUser }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onRefreshAwards = async () => {
    setLoading(true);

    try {
      await axios({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/addAchieversToUser`,
        method: "post",
        data: { uid: remoteUser?.uid },
        params: { uid: remoteUser?.uid },
      });
      setLoading(false);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      {loading ? (
        <p className="text-sm font-medium">Loading ...</p>
      ) : (
        <div onClick={onRefreshAwards}>
          <p className="underline text-sm font-medium">Refresh Awards</p>
        </div>
      )}
    </div>
  );
};

export default GenerateButtons;
