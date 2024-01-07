import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import { UserInterface } from "@models/User/User";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import AllFollowupsContainer from "@modules/ProgressModule/FollowupModule/AllFollowups";

interface Props {
  id: string;
  remoteUser: UserInterface | null;
}

const FollowupsPage: React.FC<Props> = ({ remoteUser }) => {
  const { user, authStatus } = useAuth(undefined);

  return (
    <DefaultLayout
      title={`${
        remoteUser?.name ? `${remoteUser?.name} Followup` : "Followup"
      }`}
      link={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/followups/`}
      canonical={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/followups/`}
      img={boatsSEO.img}
      noIndex={true}
      description="Progress for the user. Information is confidential and private."
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : authStatus === "SUCCESS" &&
        user?.uid &&
        (user.role === "admin" || user.isDoctor) &&
        remoteUser ? (
        <AllFollowupsContainer uid={remoteUser.uid} />
      ) : (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" || (authStatus === "SUCCESS" && user)
            ? "Unauthorized access"
            : remoteUser
            ? "Something went wrong"
            : "No such User"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default FollowupsPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13", id: "uid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";

  if (uid && typeof uid === "string") {
    const firebase = (await import("@config/adminFire")).default;
    const db = firebase.firestore();

    const profileLeader = await db.collection("users").doc(uid).get();

    if (profileLeader.exists) {
      const leaderObj = profileLeader.data() as UserInterface;

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
