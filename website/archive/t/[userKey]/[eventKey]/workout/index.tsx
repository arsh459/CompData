import DefaultLayout from "@layouts/DefaultLayout";
import { playSEO } from "@constants/seo";
import { GetStaticProps, GetStaticPaths } from "next";
// import WorkoutV2Template from "@modules/WorkoutsV2/WorkoutV2Template";
// import WorkoutV3Template from "@modules/WorkoutsV3/WorkoutV3Template";
import { UserInterface } from "@models/User/User";
import { EventInterface } from "@models/Event/Event";
// import { getCurrentMonthV3 } from "@hooks/community/challengeWeekUtils/utils";
import WorkoutV4Template from "@modules/WorkoutsV3/WorkoutV4Template";
// import { ALPHABET_GAME } from "@constants/gameStats";

interface Props {
  leader?: UserInterface | null;
  selectedEvent?: EventInterface | null;
  parentEvent?: EventInterface | null;
  // sprintId: string;
  // currentDay: number;
}

const Workout: React.FC<Props> = ({
  leader,
  selectedEvent,
  parentEvent,
  // sprintId,
  // currentDay,
}) => {
  //   return <div></div>;
  return (
    <DefaultLayout
      title={playSEO.title}
      description={playSEO.description}
      noIndex={playSEO.noIndex}
      img={playSEO.img}
      siteName={"SocialBoat"}
      link={`https://socialboat.live/${leader?.userKey}/${selectedEvent?.eventKey}/workout`}
      canonical={`https://socialboat.live/${leader?.userKey}/${selectedEvent?.eventKey}/workout`}
    >
      {leader && selectedEvent ? (
        // <WorkoutV2Template
        //   leader={leader}
        //   selectedEvent={selectedEvent}
        //   parentEvent={parentEvent}
        // />
        <WorkoutV4Template
          leader={leader}
          selectedEvent={selectedEvent}
          parentEvent={parentEvent}
          // sprintId={sprintId}
          // currentDay={currentDay}
        />
      ) : null}
    </DefaultLayout>
  );
};

export default Workout;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          userKey: "yourcoachabhi",
          eventKey: "fat-burner-challenge-work-from-home-764",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventKey = params ? params.eventKey : "";
  // const userKey = params ? params.userKey : "";
  // console.log("params", params);

  try {
    if (typeof eventKey === "string" && eventKey) {
      //   const userKey = stripSubDomain(host);
      // console.log("userKey", userKey);
      // console.log("userKey", userKey);

      const firebase = (await import("@config/adminFire")).default;
      const db = firebase.firestore();

      // console.log("firebase", firebase.projectManagement.name);

      const eventDocs = await db
        .collection("sbEvents")
        .where("eventKey", "==", eventKey)
        .get();

      if (eventDocs.docs.length > 0 && eventDocs.docs[0].exists) {
        const selectedEvent = eventDocs.docs[0].data() as EventInterface;
        const ownerUID = selectedEvent.ownerUID;
        const parentId = selectedEvent.parentId;

        if (ownerUID && parentId) {
          const [leader, parentEvent] = await Promise.all([
            db.collection("users").doc(ownerUID).get(),
            db.collection("sbEvents").doc(parentId).get(),
          ]);

          if (leader.exists && parentEvent.exists) {
            const leaderObj = leader.data() as UserInterface;
            const parentObj = parentEvent.data() as EventInterface;

            // const { sprintId, nowObj } = getCurrentMonthV3(
            //   parentObj.configuration?.sprints,
            //   parentObj.configuration?.starts,
            //   parentObj.configuration?.challengeLength,
            //   parentObj.configuration?.rounds
            // );

            // // console.log("s", sprintId);
            // console.log("new", nowObj);

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                selectedEvent,
                parentEvent: parentObj,
                // sprintId: sprintId ? sprintId : "",
                // currentDay:
                //   typeof nowObj?.dayNumber === "number"
                //     ? nowObj?.dayNumber
                //     : -1,
              },
            };
          }
        } else if (ownerUID) {
          const leader = await db.collection("users").doc(ownerUID).get();

          if (leader.exists) {
            const leaderObj = leader.data() as UserInterface;

            return {
              revalidate: 1,
              props: {
                leader: leaderObj,
                selectedEvent,
                parentEvent: null,
                // sprintId: "",
                // currentDay: -1,
              },
            };
          }
        }
      }
    }
  } catch (error) {
    console.log("error in index", error);
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
      selectedEvent: null,
      parentEvent: null,
      // sprintId: "",
      // currentDay: -1,
    },
  };
};
