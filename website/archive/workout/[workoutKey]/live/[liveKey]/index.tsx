import { homeDomain } from "@constants/seo";
import { useSeriesAuth } from "@hooks/auth/useSeriesAuth";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { useExerciseSEOData } from "@hooks/workouts/useExerciseSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { LiveClass } from "@models/Workouts/LiveClass";
import { WorkoutSeries } from "@models/Workouts/Series";
import AuthModal from "@templates/community/BaseModals/AuthModal";
import ExerciseVideoHolder from "@templates/community/workouts/ExerciseVideoHolder";
import { GetStaticProps, GetStaticPaths } from "next";

interface Props {
  selectedSeries?: WorkoutSeries;
  leader: LeaderBoard | null;
  live: LiveClass | null;
  challengeId: string;
}

const LivePage: React.FC<Props> = ({
  selectedSeries,
  leader,
  live,
  challengeId,
}) => {
  const { title, desc, img, width, height } = useExerciseSEOData(live);
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

  // console.log("challengeId", challengeId);

  return (
    <DefaultLayout
      title={title}
      siteName={site_name}
      favIcon={favIcon}
      description={desc}
      canonical={
        selectedSeries?.seriesKey
          ? `https://${homeDomain}/workout/${selectedSeries?.seriesKey}/live/${live?.liveKey}`
          : `https://${homeDomain}`
      }
      link={
        selectedSeries && selectedSeries.seriesKey && leader?.userKey
          ? `https://${leader.userKey}.${homeDomain}/workout/${selectedSeries.seriesKey}/live/${live?.liveKey}`
          : selectedSeries && selectedSeries.seriesKey
          ? `https://${homeDomain}/workout/${
              selectedSeries && selectedSeries.seriesKey
            }/nutrition/${live?.liveKey}`
          : ""
      }
      noIndex={false}
      img={img}
      width={width}
      height={height}
    >
      <div className="flex justify-center">
        <div className="bg-gray-100 min-h-screen max-w-lg">
          {selectedSeries && leader && live ? (
            <ExerciseVideoHolder
              workout={live}
              challengeId={challengeId}
              series={selectedSeries}
              leader={leader}
              authRequest={authRequest}
              enrolled={enrolled}
              signOut={signOut}
              slots={live.slots}
              duration={live.duration}
              days={live.days}
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
      </div>
    </DefaultLayout>
  );
};

export default LivePage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //   console.log("params", params);
  const workoutKey = params ? params.workoutKey : "";
  const liveKey = params ? params.liveKey : "";

  console.log("liveKey", liveKey);
  console.log("workoutKey", workoutKey);

  if (workoutKey && liveKey) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const seriesList = await db
      .collection("workouts")
      .where("seriesKey", "==", workoutKey)
      .get();

    console.log("seriesList");

    if (seriesList.docs.length > 0 && seriesList.docs[0].exists) {
      // console.log("seriesList.docs", seriesList.docs);
      const selectedSeries = seriesList.docs[0].data() as WorkoutSeries;

      console.log("selectedSeries");

      const [leader, remotePlans] = await Promise.all([
        db
          .collection("leaderBoard")
          .doc(`leader-${selectedSeries.ownerUID}`)
          .get(),
        db
          .collection("workouts")
          .doc(selectedSeries.id)
          .collection("lives")
          .where("liveKey", "==", liveKey)
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

      //   console.log("remotePlans", remotePlans);

      if (remotePlans.docs.length > 0) {
        const live = remotePlans.docs[0].data() as LiveClass;
        return {
          revalidate: 1,
          props: {
            selectedSeries,
            leader: leader.data() as LeaderBoard,
            live: live,
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
      live: null,
      challengeId: "",
    },
  };
};
