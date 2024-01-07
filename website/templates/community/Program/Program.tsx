import { navLevels } from "@hooks/community/useCommunityParams";
import { SessionV2 } from "@models/Event/Event";
import { UserInterface } from "@models/User/User";
// import { useState } from "react";
// import PostCreate from "./PostCreate";
import { postButtonLabels } from "./PostSection";
import SessionView from "./SessionView";

interface Props {
  sessions: SessionV2[];
  eventId: string;
  user?: UserInterface;
  communityId: string;
  onNavChange: (newNav: navLevels) => void;
  selectedCohortId: string;
}

const Program: React.FC<Props> = ({
  sessions,
  eventId,
  user,
  communityId,
  onNavChange,
  selectedCohortId,
}) => {
  // const [postLabel, setPostLabel] = useState<postButtonLabels>("none");
  // const [selectedSession, setSelectedSession] = useState<SessionV2>();

  const onPostSessionClick = (
    newLabel: postButtonLabels,
    selectedSession: SessionV2
  ) => {
    // setPostLabel(newLabel);
    // setSelectedSession(selectedSession);
  };

  return (
    <div>
      {user ? <div /> : null}
      {sessions.map((item) => {
        return (
          <div key={item.id} className="pb-4">
            <SessionView
              session={item}
              onPostClick={(newLabel: postButtonLabels) =>
                onPostSessionClick(newLabel, item)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default Program;
