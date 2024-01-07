import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
import BootcampFormTemplate from "@templates/Bootcamps/BootcampForm";

interface Props {
  id: string;
}

const BootcampForm: React.FC<Props> = ({ id }) => {
  const { user, authStatus } = useAuth(undefined);

  // console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={"bootcamp form"}
      link={`https://${homeDomain}/admin/bootcamps/${id}`}
      canonical={`https://${homeDomain}/admin/bootcamps/${id}`}
      img={boatsSEO.img}
      noIndex={true}
      description="User Timeline Example"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : id ? (
        <div>
          <BootcampFormTemplate id={id} />
        </div>
      ) : (
        //
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          {authStatus === "FAILED" ||
          (authStatus === "SUCCESS" && user?.role !== "admin")
            ? "Unauthorized access"
            : id
            ? "Something went wrong"
            : "No such User"}
        </div>
      )}
    </DefaultLayout>
  );
};

export default BootcampForm;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "abc" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params ? params.id : "";
  return {
    revalidate: 1,
    props: {
      id,
    },
  };
};
