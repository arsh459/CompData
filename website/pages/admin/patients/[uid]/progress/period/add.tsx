import { boatsSEO, homeDomain } from "@constants/seo";
import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { UserInterface } from "@models/User/User";
import LogPeriod from "@modules/ProgressModule/PeriodTracker/LogPeriod";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  remoteUser?: UserInterface;
}

const AddPeriod: React.FC<Props> = ({ remoteUser }) => {
  const { user, authStatus } = useAuth(undefined);

  return (
    <DefaultLayout
      title={`${
        remoteUser?.name ? `${remoteUser?.name} Progress` : "Progress"
      }`}
      link={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/progress/period/add`}
      canonical={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/progress/period/add`}
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
        <LogPeriod remoteUser={remoteUser} />
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

export default AddPeriod;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { uid: "ARXMOu9F3dRiPDYm2ZmTeesDRV13" } }],
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
