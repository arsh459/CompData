import { useAuth } from "@hooks/auth/useAuth";
import { GetStaticProps, GetStaticPaths } from "next";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";

import BootcampUsersTemplate from "@templates/Bootcamps/BootcampUsers";

interface Props {
  id: string;
}

const BootcampUsers: React.FC<Props> = ({ id }) => {
  const { user, authStatus } = useAuth(undefined);

  // console.log("remo", remoteUser?.uid);

  return (
    <DefaultLayout
      title={"bootcamp Users Page"}
      link={`https://${homeDomain}/admin/bootcamps/${id}/users`}
      canonical={`https://${homeDomain}/admin/bootcamps/${id}/users`}
      img={boatsSEO.img}
      noIndex={true}
      description="Users for Bootcamp"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : id ? (
        <div>
          <BootcampUsersTemplate id={id} />
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

export default BootcampUsers;

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
