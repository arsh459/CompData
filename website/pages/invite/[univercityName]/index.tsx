import LoadingModal from "@components/loading/LoadingModal";
import { organization } from "@constants/organization";
import { Testimonial } from "@models/Testimonial/interface";
import PaymentTemplate from "@templates/PaymentTemplate";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  univercityName: string;
  testimonials?: Testimonial[];
  videoTestimonials?: Testimonial[];
}

const Payment: React.FC<Props> = ({
  univercityName,
  testimonials,
  videoTestimonials,
}) => {
  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-[#100F1A]  text-[#F5F8FF] font-baib"
      style={{ fontFamily: "BaiJamjuree-Regular" }}
    >
      {univercityName === "404" ? (
        <>
          <h1 className="text-[66px] md:text-[82px] leading-[70px] md:leading-[85px] font-bold">
            404
          </h1>
          <h3 className="text-base md:text-xl my-8">Page Not Found</h3>
          <Link legacyBehavior passHref href="/">
            <a className="text-[#FF4266] text-base md:text-xl underline">
              Home
            </a>
          </Link>
        </>
      ) : univercityName ? (
        <PaymentTemplate
          subDir="invite"
          orgKey={univercityName}
          testimonials={testimonials}
          videoTestimonials={videoTestimonials}
        />
      ) : (
        <LoadingModal fill="#FF4266" width={100} height={100} fixed={true} />
      )}
    </div>
  );
};

export default Payment;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          univercityName: "AIESECDU",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const univercityName =
    params && typeof params.univercityName === "string"
      ? params.univercityName
      : "";

  const universityNameLower = univercityName.toLocaleLowerCase();
  const { testimonials, videoTestimonials } =
    await getPriorityTestimonialsOnServerSide();

  // console.log(
  //   "universityNameLower",
  //   universityNameLower,

  //   organization[universityNameLower]
  // );

  return {
    revalidate: 1,
    props: {
      univercityName: organization[universityNameLower]
        ? organization[universityNameLower]
        : "404",
      testimonials,
      videoTestimonials,
    },
  };
};
