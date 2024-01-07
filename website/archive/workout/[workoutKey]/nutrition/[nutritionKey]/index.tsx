import { homeDomain } from "@constants/seo";
import { useSeriesAuth } from "@hooks/auth/useSeriesAuth";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { useExerciseSEOData } from "@hooks/workouts/useExerciseSEOData";
// import { useWorkoutSEOData } from "@hooks/workouts/useWorkoutSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { NutritionPlan } from "@models/Workouts/NutritionPlan";
import { WorkoutSeries } from "@models/Workouts/Series";
// import { Workout } from "@models/Workouts/Workout";
import AuthModal from "@templates/community/BaseModals/AuthModal";
import ExerciseVideoHolder from "@templates/community/workouts/ExerciseVideoHolder";
// import WorkoutHolder from "@templates/community/workouts/WorkoutHolder";
import { GetStaticProps, GetStaticPaths } from "next";

interface Props {
  selectedSeries?: WorkoutSeries;
  leader: LeaderBoard | null;
  plan: NutritionPlan | null;
  challengeId: string;
}

const NutritionPage: React.FC<Props> = ({
  selectedSeries,
  leader,
  plan,
  challengeId,
}) => {
  const { title, desc, img, width, height } = useExerciseSEOData(plan);
  const { site_name, favIcon } = useUserSEOData(leader);

  const {
    modalState,
    setModalState,
    user,
    loadComplete,
    hideRecapcha,
    authStatus,
    signOut,
    recaptcha,
    element,
    authRequest,
    enrolled,
  } = useSeriesAuth(selectedSeries);

  // console.log("plan", plan);

  return (
    <DefaultLayout
      title={title}
      siteName={site_name}
      favIcon={favIcon}
      description={desc}
      canonical={
        selectedSeries?.seriesKey
          ? `https://${homeDomain}/workout/${selectedSeries?.seriesKey}/nutrition/${plan?.planKey}`
          : `https://${homeDomain}`
      }
      link={
        selectedSeries && selectedSeries.seriesKey && leader?.userKey
          ? `https://${leader.userKey}.${homeDomain}/workout/${selectedSeries.seriesKey}/nutrition/${plan?.planKey}`
          : selectedSeries && selectedSeries.seriesKey
          ? `https://${homeDomain}/workout/${
              selectedSeries && selectedSeries.seriesKey
            }/nutrition/${plan?.planKey}`
          : ""
      }
      noIndex={false}
      img={img}
      width={width}
      height={height}
    >
      <div className="bg-gray-100 min-h-screen">
        {selectedSeries && leader && plan ? (
          <ExerciseVideoHolder
            workout={plan}
            series={selectedSeries}
            leader={leader}
            authRequest={authRequest}
            enrolled={enrolled}
            signOut={signOut}
            challengeId={challengeId}
            signedInUser={user}
            authStatus={authStatus}
          />
        ) : null}

        {leader && selectedSeries?.seriesKey ? (
          <AuthModal
            enrolled={enrolled}
            seriesKey={selectedSeries?.seriesKey}
            modalState={modalState}
            setModalState={setModalState}
            user={user}
            loadComplete={loadComplete}
            recaptcha={recaptcha}
            leader={leader}
            cost={selectedSeries?.cost}
          />
        ) : null}

        <div
          id="recaptcha-container"
          ref={element}
          // className="sticky left-10"
          className={hideRecapcha || modalState !== "auth" ? "hidden" : ""}
        />
      </div>
    </DefaultLayout>
  );
};

export default NutritionPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //   console.log("params", params);
  const workoutKey = params ? params.workoutKey : "";
  const nutritionKey = params ? params.nutritionKey : "";

  if (workoutKey && nutritionKey) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const seriesList = await db
      .collection("workouts")
      .where("seriesKey", "==", workoutKey)
      .get();

    if (seriesList.docs.length > 0 && seriesList.docs[0].exists) {
      const selectedSeries = seriesList.docs[0].data() as WorkoutSeries;

      const [leader, remotePlans] = await Promise.all([
        db
          .collection("leaderBoard")
          .doc(`leader-${selectedSeries.ownerUID}`)
          .get(),
        db
          .collection("workouts")
          .doc(selectedSeries.id)
          .collection("nutrition")
          .where("planKey", "==", nutritionKey)
          .get(),
      ]);

      let challengeId: string = "";
      if (
        selectedSeries &&
        selectedSeries.eventIds &&
        selectedSeries.eventIds?.length > 0
      ) {
        challengeId = selectedSeries.eventIds[0];
      }

      if (remotePlans.docs.length > 0) {
        const plan = remotePlans.docs[0].data() as NutritionPlan;
        return {
          revalidate: 1,
          props: {
            selectedSeries,
            leader: leader.data() as LeaderBoard,
            plan: plan,
            challengeId,
          },
        };
      }
    }
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
      plan: null,
      challengeId: "",
    },
  };
};
