import { homeDomain } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";
import { useLocalCohorts } from "@hooks/event/useLocalCohorts";
import { useSEOData } from "@hooks/event/useSEOData";
import { useUserSEOData } from "@hooks/event/useUserSEOData";
import DefaultLayout from "@layouts/DefaultLayout";
import { Cohort, EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import PhoneForm from "@templates/apply/Form/PhoneForm";
import { dashVisible } from "@templates/apply/Form/utils";
import CreateModal from "@templates/community/Program/CreateModal/CreateModal";
import ChallengeTemplate from "@templates/listing/ChallengeTemplate";
import clsx from "clsx";
import { GetStaticProps, GetStaticPaths } from "next";
import { useState } from "react";

interface Props {
  event: EventInterface | null;
  leader: LeaderBoard | null;
  cohorts: Cohort[];
  // host: string;
}
const Challenge: React.FC<Props> = ({ event, leader, cohorts }) => {
  const { totalSold, totalLeft } = useLocalCohorts(cohorts);

  const { title, desc, img, width, height } = useSEOData(event);
  const { site_name, favIcon } = useUserSEOData(leader);

  const [isAuthVisible, toggleAuthVisible] = useState<boolean>(false);
  const { user, loadComplete, hideRecapcha, authStatus } = useAuth();
  const { recaptcha, element } = useRecapcha(
    authStatus === "FAILED" && isAuthVisible
  );

  const hideAuth = () => {
    toggleAuthVisible(false);
  };

  const setAuthIsVisible = () => {
    toggleAuthVisible(true);
  };

  // const participatingCommunity: string | undefined =
  //   user?.participatingWithObj?.[event?.id ? event.id : ""];

  // console.log("user", cohorts);

  return (
    <DefaultLayout
      title={title}
      siteName={site_name}
      favIcon={favIcon}
      description={desc}
      canonical={
        event?.eventKey
          ? `https://${homeDomain}/challenges/${event.eventKey}`
          : `https://${homeDomain}`
      }
      link={
        event && event.eventKey && leader?.userKey
          ? `https://${leader.userKey}.${homeDomain}/challenges/${event.eventKey}`
          : event && event.eventKey
          ? `https://${homeDomain}/challenges/${event.eventKey}`
          : ""
      }
      noIndex={false}
      img={img}
      width={width}
      height={height}
    >
      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha || !isAuthVisible ? "hidden" : ""}
      />

      <div className={clsx()}>
        {event && leader ? (
          <div className="">
            <ChallengeTemplate
              setAuthIsVisible={setAuthIsVisible}
              selectedEvent={event}
              leader={leader}
              editing={false}
              live={true}
              user={user}
              totalSold={totalSold}
              totalLeft={totalLeft}
              noHeader={false}
              cohortId=""
              // participatingCommunity={participatingCommunity}
              preview={false}
              selectedCohort={cohorts.length > 0 ? cohorts[0] : undefined}
            />
          </div>
        ) : null}

        {recaptcha ? (
          <CreateModal
            isOpen={!dashVisible(user) && loadComplete && isAuthVisible}
            onBackdrop={() => {}}
            onCloseModal={hideAuth}
            heading=""
            onButtonPress={() => {}}
          >
            <PhoneForm
              mobileInteractive={false}
              user={user}
              bgSmoke={true}
              brandName={leader?.name}
              recaptcha={recaptcha}
              onClose={hideAuth}
            />
          </CreateModal>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default Challenge;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    // fallback: "blocking",
    // fallback: "blocking",
    // paths: [{ params: { eventKey: "bootcamp" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log("params", params);

  const eventKey = params ? params.eventKey : "";

  // if (host && typeof host === "string") {
  // const eventKey = host.split(".")[0];

  // console.log("eventKey", eventKey);

  if (eventKey) {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const eventList = await db
      .collection("sbEvents")
      .where("eventKey", "==", eventKey)
      .get();

    if (eventList.docs.length > 0 && eventList.docs[0].exists) {
      const selectedEvent = eventList.docs[0].data() as EventInterface;

      const [leader, cohorts] = await Promise.all([
        db
          .collection("leaderBoard")
          .doc(`leader-${selectedEvent.ownerUID}`)
          .get(),
        db
          .collection("sbEvents")
          .doc(selectedEvent.id)
          .collection("cohorts")
          .get(),
      ]);

      const toReturnCohorts = cohorts.docs.map((item) => item.data() as Cohort);

      // console.log("cohorts", toReturnCohorts);

      return {
        revalidate: 1,
        props: {
          event: selectedEvent,
          leader: leader.data() as LeaderBoard,
          cohorts: toReturnCohorts,
          // host: host,
        },
      };
    }
  }
  // }

  return {
    revalidate: 1,
    props: {
      event: null,
      leader: null,
      cohorts: [],
      // host: host,
    },
  };
};
