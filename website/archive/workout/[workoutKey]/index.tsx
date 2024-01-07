import { homeDomain } from "@constants/seo";
// import { useAuth } from "@hooks/auth/useAuth";
// import { useRecapcha } from "@hooks/auth/useRecapcha";
import { useSeriesAuth } from "@hooks/auth/useSeriesAuth";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import { useWorkoutSEOData } from "@hooks/workouts/useWorkoutSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { WorkoutSeries } from "@models/Workouts/Series";
import AuthModal from "@templates/community/BaseModals/AuthModal";
import WorkoutHolder from "@templates/community/workouts/WorkoutHolder";
import { GetStaticProps, GetStaticPaths } from "next";
// import { useState } from "react";

interface Props {
  selectedSeries?: WorkoutSeries;
  leader: LeaderBoard | null;
}

export type seriesModal = "prebuy" | "none" | "auth";

const WorkoutPage: React.FC<Props> = ({ selectedSeries, leader }) => {
  const { title, desc, img, width, height } = useWorkoutSEOData(selectedSeries);
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

  return (
    <DefaultLayout
      title={title}
      siteName={site_name}
      favIcon={favIcon}
      description={desc}
      canonical={
        selectedSeries?.seriesKey
          ? `https://${homeDomain}/workout/${selectedSeries?.seriesKey}`
          : `https://${homeDomain}`
      }
      link={
        selectedSeries && selectedSeries.seriesKey && leader?.userKey
          ? `https://${leader.userKey}.${homeDomain}/workout/${selectedSeries.seriesKey}`
          : selectedSeries && selectedSeries.seriesKey
          ? `https://${homeDomain}/workout/${
              selectedSeries && selectedSeries.seriesKey
            }`
          : ""
      }
      noIndex={false}
      img={img}
      width={width}
      height={height}
    >
      <div className="bg-gray-100 min-h-screen">
        {selectedSeries && leader ? (
          <WorkoutHolder
            signedInUser={user}
            authStatus={authStatus}
            series={selectedSeries}
            enrolled={enrolled}
            leader={leader}
            signOut={signOut}
            authRequest={authRequest}
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
          className={hideRecapcha || modalState !== "auth" ? "hidden" : ""}
        />
      </div>
    </DefaultLayout>
  );
};

export default WorkoutPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workoutKey = params ? params.workoutKey : "";

  if (workoutKey) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const seriesList = await db
      .collection("workouts")
      .where("seriesKey", "==", workoutKey)
      .get();

    if (seriesList.docs.length > 0 && seriesList.docs[0].exists) {
      const selectedSeries = seriesList.docs[0].data() as WorkoutSeries;

      const leader = await db
        .collection("leaderBoard")
        .doc(`leader-${selectedSeries.ownerUID}`)
        .get();

      return {
        revalidate: 1,
        props: {
          selectedSeries,
          leader: leader.data() as LeaderBoard,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      leader: null,
    },
  };
};
