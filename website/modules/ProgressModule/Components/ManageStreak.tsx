import { UserInterface } from "@models/User/User";
import React from "react";
import FitpointStreakMain from "./FitpointStreakMain";
import ManagePcos from "./ManagePcos";
import Link from "next/link";

interface Props {
  remoteUser?: UserInterface;
}
const ManageStreak: React.FC<Props> = ({ remoteUser }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  gap-7 mx-4">
      {remoteUser?.uid && (
        <>
          <ManagePcos user={remoteUser} />
          <Link href={`/admin/patients/${remoteUser?.uid}/progress/points`}>
            <FitpointStreakMain user={remoteUser} />
          </Link>
        </>
      )}
    </div>
  );
};

export default ManageStreak;
