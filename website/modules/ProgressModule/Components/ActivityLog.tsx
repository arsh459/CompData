import {
  energyIconFrame45,
  moodIconFrame45,
  periodIconFrame45,
  weightIconFrame45,
} from "@constants/icons/iconURLs";
import useLatestProgressByType from "@hooks/progress/useLatestProgressByType";
import { UserInterface } from "@models/User/User";
import clsx from "clsx";
import React from "react";
import ProgressLog from "./ProgressLog";
import { getEmojiByMood } from "../MoodTracker/utils";
import { getEmojiByEnergy } from "../EnergyTracker/utils";
interface Props {
  remoteUser?: UserInterface;
  hideSection?: "weight" | "mood" | "energy" | "period";
}
const ActivityLog: React.FC<Props> = ({ remoteUser, hideSection }) => {
  const { data: weightData } = useLatestProgressByType(
    "weight",
    "dailyWeight",
    remoteUser?.uid
  );
  const { data: moodData } = useLatestProgressByType(
    "mood",
    "dailyMood",
    remoteUser?.uid
  );
  const { data: energyData } = useLatestProgressByType(
    "energy",
    "dailyEnergy",
    remoteUser?.uid
  );

  return (
    <>
      <p className="text-[#3D3D3DCC] text-xl  font-popSB flex-1 pl-8 py-4">
        {`${remoteUser?.name}'s Activities`}
      </p>
      <div
        className={clsx(
          "grid grid-cols-1  ",
          hideSection ? "sm:grid-cols-3" : "sm:grid-cols-2"
        )}
      >
        {hideSection === "weight" ? null : (
          <ProgressLog
            color="#FFE5F2"
            text="Weight Tracker"
            // subText={weight?.weight ? `Last Tracked ${weight.weight}kg` : "-"}
            subText={
              weightData?.weight
                ? `Last Tracked ${weightData?.weight || remoteUser?.weight}kg`
                : "-"
            }
            imgUrl={weightIconFrame45}
            linkToNavigate={`weight`}
            baseLink={`/admin/patients/${remoteUser?.uid}/progress`}
          />
        )}
        {hideSection === "period" ? null : (
          <ProgressLog
            color="#FFE5F2"
            text="Period Tracker"
            // subText={weight?.weight ? `Last Tracked ${weight.weight}kg` : "-"}

            subText="-"
            imgUrl={periodIconFrame45}
            linkToNavigate={`period`}
            baseLink={`/admin/patients/${remoteUser?.uid}/progress`}
          />
        )}
        {hideSection === "mood" ? null : (
          <ProgressLog
            color="#FFE5F2"
            text="Mood Tracker"
            subText={
              moodData?.mood
                ? `Last Tracked  ${getEmojiByMood(moodData?.mood || 0).text}`
                : "-"
            }
            // subText={energyData?.mood ? `Last Tracked ${"good"}` : "-"}
            imgUrl={moodIconFrame45}
            linkToNavigate={`mood`}
            baseLink={`/admin/patients/${remoteUser?.uid}/progress`}
          />
        )}
        {hideSection === "energy" ? null : (
          <ProgressLog
            color="#FFE5F2"
            text="Energy Tracker"
            subText={
              energyData?.energy
                ? `Last Tracked  ${
                    getEmojiByEnergy(energyData?.energy || 0).text
                  }`
                : "-"
            }
            imgUrl={energyIconFrame45}
            linkToNavigate={`energy`}
            baseLink={`/admin/patients/${remoteUser?.uid}/progress`}
          />
        )}
      </div>
    </>
  );
};

export default ActivityLog;
