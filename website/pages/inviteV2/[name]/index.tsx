import { inviteV2Coachs } from "@constants/inviteV2";
import { homeDomain, rectWomenImg, womenImg } from "@constants/seoData";
import DefaultLayout from "@layouts/DefaultLayout";
import InviteV2Template from "@templates/InviteV2Template";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  name: string;
}

const InviteV2: React.FC<Props> = ({ name }) => {
  const data = inviteV2Coachs[name];

  return (
    <DefaultLayout
      title={`${name}'s challenge at SocialBoat`}
      description={`You've been invited for a health and fitness challenge by ${name}`}
      link={`https://${homeDomain}/inviteV2/${name}`}
      canonical={`https://${homeDomain}/inviteV2/${name}`}
      img={womenImg}
      siteName="SocialBoat"
      noIndex={false}
      rectImg={rectWomenImg}
      width={360}
      height={360}
    >
      {data ? (
        <InviteV2Template data={data} />
      ) : (
        <div className="w-screen h-screen bg-[#100F1A] flex flex-col justify-center items-center text-white">
          <h1 className="text-[66px] md:text-[82px] leading-[70px] md:leading-[85px] font-bold">
            404
          </h1>
          <h3 className="text-base md:text-xl my-8">Page Not Found</h3>
          <Link legacyBehavior passHref href="/">
            <a className="text-[#FF4266] text-base md:text-xl underline">
              Home
            </a>
          </Link>
        </div>
      )}
    </DefaultLayout>
  );
};

export default InviteV2;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          name: "kirsten",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params && typeof params.name === "string" ? params.name : "";

  return {
    revalidate: 1,
    props: {
      name,
    },
  };
};
