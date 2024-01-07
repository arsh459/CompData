import { useRoute } from "@react-navigation/native";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";
import { sectionTypes } from "@modules/JoinBoatMainV3/hooks/useSection";
import JoinBoatMainV3 from "@modules/JoinBoatMainV3";
// import { useRoadmapUpdateStore } from "@providers/progress/roadmapUpdateStore";

export interface JoinBoatParamsV3 {
  section: sectionTypes;
  gameId?: string;
  teamId?: string;
  backOnDone?: boolean;
}

const JoinBoatV3 = () => {
  const route = useRoute();
  const params = route.params as JoinBoatParamsV3 | undefined;

  useScreenTrack(
    `${route.name}-${params?.section ? params?.section : "welcome"}`
  );

  // console.log("HIIIII");

  return (
    <>
      <InteractionProvider>
        <JoinBoatMainV3
          section={params?.section ? params.section : "welcome"}
          toJoinGameId={params?.gameId}
          toJoinTeamId={params?.teamId}
          backOnDone={params?.backOnDone}
        />
      </InteractionProvider>
    </>
  );
};

export default JoinBoatV3;
