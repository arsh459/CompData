import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import { UserInterface } from "@models/User/User";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import UserHistoryComp from "@modules/UserDaily/UserHistoryComp";

interface Props {
  remoteUser: UserInterface | null;
}

const UserHistory: React.FC<Props> = ({ remoteUser }) => {
  const { user, authStatus } = useAuth(undefined);

  // console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={`${remoteUser?.name ? remoteUser?.name : "No name user"}`}
      link={`https://${homeDomain}/admin/u/${remoteUser?.uid}/history`}
      canonical={`https://${homeDomain}/admin/u/${remoteUser?.uid}/history`}
      img={boatsSEO.img}
      noIndex={true}
      description="Progress Timeline Example"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && user.role === "admin" && remoteUser ? (
        <div>
          <UserHistoryComp user={remoteUser} />
        </div>
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : remoteUser
            ? "Something went wrong"
            : "No such User"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default UserHistory;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";
  // console.log("host", host);

  if (uid && typeof uid === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db.collection("users").doc(uid).get();

    // console.log("profileLeader", profileLeader.docs[0].data());

    if (profileLeader.exists) {
      const leaderObj = profileLeader.data() as UserInterface;

      // const allEvents = await getUserEvents(db, leaderObj.uid);

      // const allEventCohorts: {
      // [eId: string]: { [cohortId: string]: Cohort };
      // } = {};
      return {
        revalidate: 1,
        props: {
          remoteUser: leaderObj,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      remoteUser: null,
    },
  };
};
