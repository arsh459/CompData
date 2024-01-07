import { weEventTrack } from "@analytics/webengage/user/userLog";
import Button from "@components/button";
import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { useLeaderboard } from "@hooks/user/useLeaderboard";
import { Link } from "@mui/material";
import { UserInterface } from "@models/User/User";
import WarningModal from "@templates/community/Header/WarningModal";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  user: UserInterface;
  gameId: string;
}

const AlreadyInTeam: React.FC<Props> = ({ user, gameId }) => {
  const [showWarning, toggleWarning] = useState<boolean>(false);
  const team = user.participatingInGameWithTeam
    ? user.participatingInGameWithTeam[gameId]
    : undefined;

  const { selectedEvent } = useCommunityEvent(team ? team.teamId : "");
  const { leader } = useLeaderboard(selectedEvent?.ownerUID);

  const isOwner = user.uid === team?.ownerUID ? true : false;

  const router = useRouter();
  const onSuccess = () => router.push("/teams");

  return (
    <div className="fixed inset-0 z-10 overflow-y-scroll scrollbar-hide bg-[#100F1A] text-[#F5F5F7] flex flex-col justify-center items-center p-4">
      {selectedEvent?.id ? (
        <WarningModal
          uid={user.uid}
          onSuccess={onSuccess}
          eventId={selectedEvent?.id}
          isOpen={showWarning}
          onClose={() => toggleWarning(false)}
        />
      ) : null}
      {/* <div className="bg-gray-100 w-full h-56"></div> */}
      <p className="text-lg iphoneX:text-2xl font-bold pt-2 w-full text-center">
        You already have a team!
      </p>
      <div className="flex w-full justify-center">
        <p>You are part of the team: </p>
        <p className="pl-2 font-semibold">{selectedEvent?.name}</p>
      </div>

      <p className="text-center text-xs iphoneX:text-base">
        {isOwner
          ? "If you want to make someone else the team leader. Reach out to us"
          : "If you change your team, your progress with this team will be lost"}
      </p>

      <div className="flex justify-center w-full pt-4">
        <div className="px-2">
          {isOwner ? (
            <Link
              href={`https://api.whatsapp.com/send?phone=919958730020&text=Hi!`}
            >
              <Button
                appearance="ghost"
                onClick={() =>
                  weEventTrack("joinBoat_hasTeam", {
                    eventId: selectedEvent?.id
                      ? selectedEvent.id
                      : "no_eventId",
                    section: "has_team",
                    action: "Contact Us",
                  })
                }
              >
                <p className="text-gray-700 text-xs iphoneX:text-base">
                  Contact Us
                </p>
              </Button>
            </Link>
          ) : (
            <Button
              appearance="ghost"
              onClick={() => {
                toggleWarning(true);
                weEventTrack("joinBoat_hasTeam", {
                  eventId: selectedEvent?.id ? selectedEvent.id : "no_eventId",
                  section: "has_team",
                  action: "Leave Team",
                });
              }}
            >
              <p className="text-red-500">Leave Team</p>
            </Button>
          )}
        </div>
        <div className="px-2">
          <Link href={`/${leader?.userKey}/${selectedEvent?.eventKey}`}>
            <Button
              appearance="contained"
              onClick={() =>
                weEventTrack("joinBoat_hasTeam", {
                  eventId: selectedEvent?.id ? selectedEvent.id : "no_eventId",
                  section: "has_team",
                  action: "Go To Team",
                })
              }
            >
              Go To Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AlreadyInTeam;
