import { useUser } from "@hooks/auth/useUser";
import { UserRank } from "@models/Activities/Activity";
import { Link } from "@mui/material";
import { useState } from "react";
import { terraResyncUser_internal } from "./resync";
import Loading from "@components/loading/Loading";

interface Props {
  userRank: UserRank;
}

const UserRankCard: React.FC<Props> = ({ userRank }) => {
  const { user } = useUser(userRank.uid, "SUCCESS");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [erroredDates, setErrorDates] = useState<string>("");

  const resyncUser = async () => {
    if (user?.uid) {
      setLoading(true);
      try {
        const response = await terraResyncUser_internal(user.uid);
        setLoading(false);

        console.log(response);

        if (response?.details) {
          let didError = false;
          let erroredDays = "";
          for (const uid of Object.keys(response.details)) {
            if (response.details[uid]) {
              for (const date of Object.keys(response.details[uid])) {
                if (!response.details[uid][date]) {
                  didError = true;
                  erroredDays += ` ${date},`;
                }
              }
            }
          }

          if (didError) {
            setError(true);
            setErrorDates(erroredDays);
            // setFirestoreDaySync(response.details)
          } else {
            setError(false);
            setErrorDates("");
          }
        }

        // if (status === "failed") {
        //   setError(true);
        // } else {
        //   setError(false);
        // }
      } catch (error) {
        console.log("error", error);
        setLoading(false);
        setError(true);
        setErrorDates("Call failed");
      }
    }
  };

  //   console.log("userRank", userRank.eventId);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      {loading ? (
        <div className="flex items-center">
          <Loading fill="#ff735c" width={24} height={24} />
        </div>
      ) : user?.terraUser ? (
        <p
          className="text-xs text-orange-500 cursor-pointer"
          onClick={resyncUser}
        >
          {`Resync ${error ? ` - errored ${erroredDates}` : ""}`}
        </p>
      ) : null}

      <Link
        href={`${userRank.eventId}/users/${user?.uid ? user.uid : ""}`}
        target="_blank"
      >
        <div>
          <p className="font-semibold">{userRank.authorName}</p>
          <p className="text-xs text-gray-700">{user?.instagramHandle}</p>
        </div>
      </Link>
      <div>
        {user?.terraUser ? (
          <p className="text-xs text-gray-500">
            {`${user?.terraUser?.provider}: ${user.terraUser.user_id}`}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default UserRankCard;
