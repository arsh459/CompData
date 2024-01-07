import { useUserFlags } from "@hooks/auth/useUserFlags";
import { UserInterface } from "@models/User/User";
import { Button } from "@mui/material";

import React from "react";
import WelcomeSection from "./FlagSections/WelcomeSection";
import DocSection from "./FlagSections/DocSection";
import DietSection from "./FlagSections/DietSection";
import RoadmapSection from "./FlagSections/RoadmapSection";
interface Props {
  remoteUser: UserInterface | null;
}
const FlagsComponent: React.FC<Props> = ({ remoteUser }) => {
  const { user, onSave, onUpdateFlagObj, onUpdateTestUser, onDietFormFilled } =
    useUserFlags(remoteUser?.uid);

  if (!user) {
    return <div />;
  }

  return (
    <div className="w-screen h-screen relative p-4 z-0">
      <h1 className="text-xl">User Flags</h1>
      <div>
        <WelcomeSection
          user={user}
          onUpdateTestUser={onUpdateTestUser}
          onUpdateFlagObj={onUpdateFlagObj}
          heading="Welcome Section"
          bgColor="bg-gray-100"
        />
      </div>
      <div>
        <DocSection
          user={user}
          onUpdateFlagObj={onUpdateFlagObj}
          heading="Doctor Section"
          bgColor="bg-green-100"
        />
      </div>

      <div>
        <DietSection
          user={user}
          onUpdateFlagObj={onUpdateFlagObj}
          heading="Diet Section"
          bgColor="bg-blue-100"
          onDietFormFilled={onDietFormFilled}
        />
      </div>

      <div>
        <RoadmapSection
          user={user}
          onUpdateFlagObj={onUpdateFlagObj}
          heading="Roadmap Section"
          bgColor="bg-blue-100"
        />
      </div>

      <div className="flex pt-8">
        <Button variant="contained" onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default FlagsComponent;
