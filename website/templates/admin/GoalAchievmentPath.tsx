import Loading from "@components/loading/Loading";
import { useUserV2 } from "@hooks/auth/useUserV2";
import AchievementPath from "@modules/Bookings/AchievementPath";
import EditPath from "@modules/Bookings/AchievementPath/EditPath";
import { useGoalAchievments } from "@modules/Bookings/AchievementPath/hook/useGoalAchievments";
import { AchievementPathData } from "@modules/Bookings/AchievementPath/utils/interface";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";

interface Props {
  uid: string;
}

const GoalAchievmentPath: React.FC<Props> = ({ uid }) => {
  const { user } = useUserV2(uid);
  const [target, setTarget] = useState<AchievementPathData>();
  const { rawData, loading, onRegenrate, onEdit, onAddNew, onDelete } =
    useGoalAchievments("fetch", user);

  return (
    <div className="w-screen h-screen lg:flex p-4">
      <div className="flex-1 overflow-y-scroll p-4">
        <h1 className="text-3xl font-popR capitalize">
          {user?.name} goal achivement path
        </h1>

        <div className="my-2 p-4 border-gray-700 border-2 ">
          <p className="pb-1 text-lg">GOALS</p>
          {user?.thingsToWorkOn?.map((item) => {
            return (
              <div key={item.type}>
                <p className="text-base">{item.text}</p>
              </div>
            );
          })}
        </div>

        {target && user ? (
          <EditPath
            uid={user.uid}
            target={target}
            onSave={onEdit}
            onDelete={onDelete}
            setTarget={setTarget}
          />
        ) : (
          <>
            {rawData.map((item, index) => (
              <div key={item.id || `item-${index}`} className="my-4">
                <Button onClick={() => setTarget(item)} variant="outlined">
                  {`${item.title?.text}\nstartTime: ${
                    item.startTime
                      ? format(new Date(item.startTime), "dd-MM-yyyy")
                      : null
                  }\nendTime: ${
                    item.endTime
                      ? format(new Date(item.endTime), "dd-MM-yyyy")
                      : null
                  }`}
                </Button>
              </div>
            ))}

            <Button variant="contained" color="success" onClick={onRegenrate}>
              Re-Genrate Data
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setTarget(onAddNew())}
              style={{ marginInline: 16 }}
            >
              Add New Month
            </Button>
          </>
        )}
      </div>

      {loading ? (
        <div className="w-full h-full max-w-lg mx-auto relative z-0 overflow-hidden flex justify-center items-center">
          <img
            src={
              "https://ik.imagekit.io/socialboat/tr:w-800,c-maintain_ratio,fo-auto/Frame_1762__1__A8UFFYh0S.png?updatedAt=1685449228580"
            }
            className="absolute inset-0 -z-10 object-cover"
          />
          <Loading fill="#ff735c" width={48} height={48} />
        </div>
      ) : (
        <AchievementPath user={user} type="fetch" />
      )}
    </div>
  );
};

export default GoalAchievmentPath;
