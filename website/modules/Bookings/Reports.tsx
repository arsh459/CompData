import { useAchievedAwards } from "@hooks/awards/useAchivedAwards";
import { useNextOnScroll } from "@hooks/useNextOnScroll";
import { UserInterface } from "@models/User/User";
import { Achiever } from "@models/awards/interface";
import { Button } from "@mui/material";
import { popReport, pushReport, setAwardReport } from "@utils/awards";
import { useState } from "react";
import LoadingModal from "@components/loading/LoadingModal";
import Link from "next/link";
import { format } from "date-fns";

interface Props {
  user: UserInterface;
}

const Reports: React.FC<Props> = ({ user }) => {
  const { wonAwardsData, onNext, nextExists, loading } = useAchievedAwards(
    user.uid,
    2
  );
  const { targetRef } = useNextOnScroll(onNext, nextExists && !loading);
  const [updating, setUpdating] = useState<boolean>(false);

  const handleUpdateReport = async (achiever: Achiever) => {
    setUpdating(true);
    await setAwardReport({
      uid: user.uid,
      id: achiever.awardId,
      start: achiever.startTime,
      end: achiever.endTime,
    });
    setUpdating(false);
  };

  return (
    <div className="p-4">
      <Link href={`/admin/u/${user.uid}/reports/addNew`}>
        <Button variant="contained">Add new award report</Button>
      </Link>

      <div className="py-4 flex flex-wrap gap-4">
        {wonAwardsData.map((each) => (
          <div key={each.id} className="p-4 border border-black rounded-xl">
            <p>ID: {each.id}</p>
            <p>Award ID: {each.awardId}</p>
            <p>
              Start Time:{" "}
              {each.startTime ? format(each.startTime, "PPpp") : "null"}
            </p>
            <p>
              End Time: {each.endTime ? format(each.endTime, "PPpp") : "null"}
            </p>
            <p>
              Unlock On:{" "}
              {each.unlockOn ? format(each.unlockOn, "PPpp") : "null"}
            </p>
            <p>
              Target Month:{" "}
              {each.targetMonth ? format(each.targetMonth, "MMM d") : "null"}
            </p>
            {/* <p>Workout Regularity: {each.workoutRegularity}</p>
            <p>Diet Regularity: {each.dietRegularity}</p>
            <p>Step Regularity: {each.stepsRegularity}</p>
            <p>Weight Change: {each.weightChange}</p>
            <p>Energy Average: {each.energyAverage}</p>
            <p>Mood Average: {each.moodAverage}</p> */}
            <div className="flex justify-between items-center pt-4">
              <Button
                onClick={() => handleUpdateReport(each)}
                variant="contained"
                color="primary"
              >
                update report
              </Button>

              <div className="w-4 aspect-1" />

              <Link href={`/admin/u/${each.uid}/reports/${each.id}`}>
                <Button variant="contained" color="secondary">
                  edit report
                </Button>
              </Link>

              <div className="w-4 aspect-1" />

              {!user.unseenAwards ||
              (user.unseenAwards && !user.unseenAwards.includes(each.id)) ? (
                <Button
                  onClick={() => pushReport(user.uid, each.id)}
                  variant="contained"
                  color="success"
                >
                  push report
                </Button>
              ) : null}
              {user.unseenAwards && user.unseenAwards.includes(each.id) ? (
                <Button
                  onClick={() => popReport(user.uid, each.id)}
                  variant="contained"
                  color="error"
                >
                  pop report
                </Button>
              ) : null}
            </div>
          </div>
        ))}
        <div ref={targetRef} className="w-1 h-1" />
      </div>

      {loading || updating ? (
        <LoadingModal fixed={true} fill="#ff735c" height={50} width={50} />
      ) : null}
    </div>
  );
};

export default Reports;
