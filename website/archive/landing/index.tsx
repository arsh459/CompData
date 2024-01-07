import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps } from "next";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { getUserEvents } from "@models/Event/getAllEvents";
import HomeTemplateV2 from "@templates/home/HomeTemplateV2";
import { EventInterface } from "@models/Event/Event";

interface Props {
  sampleLeader: LeaderBoard | null;
  leaders: LeaderBoard[];
  allEvents: EventInterface[];
}

const Landing: React.FC<Props> = ({ leaders, sampleLeader, allEvents }) => {
  //   const [modalState, setModalState] = useState<"none" | "auth">("none");

  //   useEffect(() => {
  //     if (!leader) {
  //       router.push("/");
  //     }
  //   }, [leader]);

  const { user } = useAuth(undefined);

  //   const { recaptcha, element } = useRecapcha(
  //     authStatus === "FAILED" && modalState === "auth"
  //   );

  //   const setAuthIsVisible = () => {
  //     setModalState("auth");
  //   };
  // console.log("leader", leader);
  return (
    <HomeTemplateV2
      creators={leaders}
      userKey={
        user?.name &&
        user?.email &&
        user?.phone &&
        user?.userKey &&
        user?.profileImage
          ? user?.userKey
          : ""
      }
      sampleLeader={sampleLeader}
      allEvents={allEvents}
    />
  );
};

export default Landing;

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [{ params: { userKey: "yourcoachabhi" } }],
//     fallback: true,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [
//       { params: { userKey: "socialboat.live" } },
//       { params: { userKey: "www.socialboat.live" } },
//       { params: { userKey: "www.socialboat.shop" } },
//       { params: { userKey: "socialboat.shop" } },
//     ],
//     fallback: "blocking",
//   };
// };

export const getStaticProps: GetStaticProps = async ({}) => {
  const firebase = (await import("@config/adminFire")).default;
  const db = firebase.firestore();
  const sampleUserKey = "yogacension";
  const sampleUserList = await db
    .collection("leaderBoard")
    .where("userKey", "==", sampleUserKey)
    .get();

  const allLeaders = await db
    .collection("leaderBoard")
    .where("socialBoat", "==", true)
    // .limit(20)
    .get();

  const returnLeaders: LeaderBoard[] = [];
  for (const leader of allLeaders.docs) {
    const tmpLeader = leader.data() as LeaderBoard;

    if (typeof tmpLeader.manualRank === "number") {
      returnLeaders.push(tmpLeader);
    } else {
    }
  }

  if (sampleUserList.docs.length > 0 && sampleUserList.docs[0].exists) {
    const sampleLeaderObj = sampleUserList.docs[0].data() as LeaderBoard;

    const allEvents = await getUserEvents(db, sampleLeaderObj.uid);

    return {
      revalidate: 1,
      props: {
        leaders: returnLeaders.sort((a, b) =>
          a.manualRank && b.manualRank ? a?.manualRank - b?.manualRank : 0
        ),
        // leader: null,
        sampleLeader: sampleLeaderObj,
        allEvents: allEvents
          .filter((item) => item.name)
          .sort((a, b) => a.cost - b.cost),
        // home: true,
        //   host,
        //   userKey,
      },
    };
  }

  return {
    revalidate: 1,
    props: {
      leaders: [],
      sampleLeader: null,
      allEvents: null,
    },
  };
};

/**
interface Props {
  leader: LeaderBoard | null;
  sampleLeader: LeaderBoard | null;
  leaders: LeaderBoard[];
  allEvents: EventInterface[];
  allEventCohorts: {
    [eId: string]: { [cohortId: string]: Cohort };
  };
  host: string;
  userKey: string;
}

export type modalStateType = "none" | "auth" | "welcome" | "post";

const UserPage: React.FC<Props> = ({
  leaders,
  leader,
  allEvents,
  sampleLeader,
  userKey,
  host,
  allEventCohorts,
}) => {
  const { title, desc, img, site_name, favIcon, link, canonical } =
    useUserSEOData(leader);

  const [modalState, setModalState] = useState<modalStateType>("none");
  const [eId, setEId] = useState<string>("");
  const [eKey, setEKey] = useState<string>("");
  const [eIdToCheck, setEventIdToCheck] = useState<string>("");
  const [cId, setCId] = useState<string>("");
  const { user, loadComplete, hideRecapcha, authStatus, signOut } =
    useAuth(undefined);

  const { recaptcha, element } = useRecapcha(
    authStatus === "FAILED" && modalState === "auth"
    // showAuthModal
  );

  const setAuthIsVisible = (
    eventId: string,
    cohortId: string,
    eventKey: string
  ) => {
    console.log(eventId, cohortId, eventKey);
    setCId(cohortId);
    setEId(eventId);
    setEKey(eventKey);
    setModalState("auth");
  };

  const authRequest = (eventKey: string, eventIdToCheck: string) => {
    setEKey(eventKey);
    setEventIdToCheck(eventIdToCheck);
    setModalState("auth");
  };

  const setPostIsVisible = (eventId: string, cohortId: string) => {
    setCId(cohortId);
    setEId(eventId);
    setModalState("post");
  };

  const hidePost = () => {
    setModalState("none");
  };

  if (!leader) {
    return (
      <HomeTemplateV2
        creators={leaders}
        userKey={
          user?.name &&
          user?.email &&
          user?.phone &&
          user?.userKey &&
          user?.profileImage
            ? user?.userKey
            : ""
        }
        sampleLeader={sampleLeader}
        allEvents={allEvents}
      />
    );
  }

  return (
    <>
      <DefaultLayout
        favIcon={favIcon}
        siteName={site_name}
        title={title}
        description={desc}
        link={link}
        canonical={canonical}
        noIndex={true}
        img={img}
      >
        <div className=" relative bg-white">
          {leader ? (
            <CommunityTemplateV2
              signedInUser={user}
              authStatus={authStatus}
              signOut={signOut}
              authRequest={authRequest}
              element={element}
              leader={leader}
              allEvents={allEvents}
              setNewPost={setPostIsVisible}
              allEventCohorts={allEventCohorts}
              setAuthIsVisible={setAuthIsVisible}
            />
          ) : null}

          <div
            id="recaptcha-container"
            ref={element}
            className={hideRecapcha || modalState !== "auth" ? "hidden" : ""}
          />

          <NewUserModals
            eId={eId}
            eIdToCheck={eIdToCheck}
            communityId={leader.uid}
            eventKey={eKey}
            modalState={modalState}
            setModalState={setModalState}
            cId={cId}
            user={user}
            leader={leader}
            loadComplete={loadComplete}
            recaptcha={recaptcha}
            hidePost={hidePost}
          />
        </div>
      </DefaultLayout>
    </>
  );
};
export default UserPage;



 */
