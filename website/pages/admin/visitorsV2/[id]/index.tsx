import { useAuth } from "@hooks/auth/useAuth";
import DefaultLayout from "@layouts/DefaultLayout";
import { boatsSEO, homeDomain } from "@constants/seo";
// import AdminGamesTemplate from "@templates/AdminGames/AdminGamesTemplate";
import VisitorsTemplate from "@modules/Visitors/VisitorsTemplate";
import { GetStaticPaths, GetStaticProps } from "next";
import PhoneAuth from "@templates/apply/Form/PhoneAuth";
import { useRecapcha } from "@hooks/auth/useRecapcha";

interface Props {
  id: string;
}

const VisitorsPageById: React.FC<Props> = ({ id }) => {
  const { user, authStatus, hideRecapcha } = useAuth();
  const { element, recaptcha } = useRecapcha(authStatus === "FAILED");

  return (
    <DefaultLayout
      title="Admin"
      link={`https://${homeDomain}/admin/visitorsV2/${id}`}
      canonical={`https://${homeDomain}/admin/visitorsV2/${id}`}
      img={boatsSEO.img}
      noIndex={true}
      description="Admin page for SocialBoat"
    >
      {authStatus === "PENDING" ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Loading
        </div>
      ) : user?.uid && id ? (
        <VisitorsTemplate user={user} pageId={id} origin={true} />
      ) : !user?.uid ? (
        //
        <div className="flex justify-center items-center  h-screen">
          <PhoneAuth placeholder="Enter your phone" recaptcha={recaptcha} />
        </div>
      ) : !id ? (
        <div className="flex justify-center items-center text-4xl font-bold h-screen">
          Wrong page id
        </div>
      ) : null}

      <div
        id="recaptcha-container"
        ref={element}
        className={hideRecapcha ? "hidden" : ""}
      />
    </DefaultLayout>
  );
};

export default VisitorsPageById;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "pecfest" } }],
    fallback: "blocking",
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
