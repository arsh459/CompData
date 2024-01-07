import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import EditAppointmentComponent from "@modules/Patients/Components/EditAppointment";

interface Props {
  id: string;
}

const EditAppointmentPage: React.FC<Props> = ({ id }) => {
  const { user, authStatus } = useAuth(undefined);

  // console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={`${"Edit appointment"}`}
      link={`https://${homeDomain}/admin/appointments/edit/${id}`}
      canonical={`https://${homeDomain}/admin/appointments/edit/${id}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Edit appointment information"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : authStatus === "SUCCESS" &&
        user?.uid &&
        (user.role === "admin" || user.isDoctor) &&
        id ? (
        <div>
          <EditAppointmentComponent id={id} />
        </div>
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" || (authStatus === "SUCCESS" && user)
            ? "Unauthorized access"
            : "Something went wrong"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default EditAppointmentPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "appId" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params ? params.id : "";
  // console.log("host", host);

  if (id && typeof id === "string") {
    return {
      revalidate: 1,
      props: {
        id: id,
      },
    };
  }

  return {
    revalidate: 1,
    props: {
      id: "",
    },
  };
};
