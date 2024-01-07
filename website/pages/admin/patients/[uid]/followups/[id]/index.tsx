import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import { UserInterface } from "@models/User/User";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import FollowupCreate from "@modules/ProgressModule/FollowupModule/FollowupCreate";

interface Props {
  id: string;
  remoteUser: UserInterface | null;
}

const FollowupPage: React.FC<Props> = ({ remoteUser, id }) => {
  const { user, authStatus } = useAuth(undefined);

  return (
    <DefaultLayout
      title={`${
        remoteUser?.name ? `${remoteUser?.name} Followup` : "Followup"
      }`}
      link={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/followups/${id}`}
      canonical={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/followups/${id}`}
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
        <FollowupCreate remoteUser={remoteUser} id={id} />
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

export default FollowupPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13", id: "uid" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const uid = params ? params.uid : "";
  const id = params ? params.id : "";

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
          id: id,
        },
      };
    }
  }

  return {
    revalidate: 1,
    props: {
      remoteUser: null,
      id: id,
    },
  };
};
