// import { UserProvider } from "@providers/user/UserProvider";
import { useRoute } from "@react-navigation/native";
import JoinBoatMainV2 from "@modules/JoinBoatMainV2";
import { sectionTypes } from "@modules/JoinBoatMainV2/hooks/useSection";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";

export interface JoinBoatParamsV2 {
  section: sectionTypes;
  teamId?: string;
  gameId?: string;
  backOnDone?: boolean;
}

const JoinBoatV2 = () => {
  const route = useRoute();
  const params = route.params as JoinBoatParamsV2 | undefined;

  useScreenTrack(
    `${route.name}-${params?.section ? params?.section : "welcome"}`
  );

  return (
    <>
      <InteractionProvider>
        <JoinBoatMainV2
          toJoinTeamId={params?.teamId}
          toJoinGameId={params?.gameId}
          selectedSection={params?.section ? params.section : "welcome"}
          backOnDone={params?.backOnDone}
        />
      </InteractionProvider>
    </>
  );
};

export default JoinBoatV2;
