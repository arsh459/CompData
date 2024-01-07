import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import { UserInterface } from "@models/User/User";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import NewAppointmentComponent from "@modules/Patients/Components/NewAppointment";

interface Props {
  remoteUser: UserInterface | null;
}

const NewAppointmentPage: React.FC<Props> = ({ remoteUser }) => {
  const { user, authStatus } = useAuth(undefined);

  // console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={`${
        remoteUser?.name
          ? `${remoteUser?.name} Past Appointments`
          : "Past Appointments"
      }`}
      link={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/appointments/add`}
      canonical={`https://${homeDomain}/admin/patients/${remoteUser?.uid}/appointments/add`}
      img={boatsSEO.img}
      noIndex={true}
      description="Past Appointments for the user. Information is confidential and private."
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : authStatus === "SUCCESS" &&
        user?.uid &&
        (user.role === "admin" || user.isDoctor) &&
        remoteUser ? (
        <div>
          <NewAppointmentComponent remoteUser={remoteUser} />
        </div>
      ) : (
        //
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

export default NewAppointmentPage;

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
