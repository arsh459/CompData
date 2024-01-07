// import { useAuth } from "@hooks/auth/useAuth";
import Loading from "@components/loading/Loading";
import { Testimonial } from "@models/Testimonial/interface";
// import { leadgenTypes } from "@constants/leadgen";
import LeadGenTemplate from "@templates/LandingPage/LeadGenTemplate";
import { getPriorityTestimonialsOnServerSide } from "@utils/testimonials";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
// import HomeTemplateV2 from "@templates/home/HomeTemplateV2";

interface Props {
  leadgen: string;
  testimonials?: Testimonial[];
}

const Landing2: React.FC<Props> = ({ leadgen, testimonials }) => {
  //   const [modalState, setModalState] = useState<"none" | "auth">("none");

  //   useEffect(() => {
  //     if (!leader) {
  //       router.push("/");
  //     }
  //   }, [leader]);

  // const { user } = useAuth(undefined);

  //   const { recaptcha, element } = useRecapcha(
  //     authStatus === "FAILED" && modalState === "auth"
  //   );

  //   const setAuthIsVisible = () => {
  //     setModalState("auth");
  //   };
  // console.log("leadgen", leadgen);
  return leadgen === "404" ? (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-[#100F1A] text-[#F5F8FF]"
      style={{ fontFamily: "BaiJamjuree-Regular" }}
    >
      <h1 className="text-[66px] md:text-[82px] leading-[70px] md:leading-[85px] font-bold">
        404
      </h1>
      <h3 className="text-base md:text-xl my-8">Page Not Found</h3>
      <Link legacyBehavior passHref href="/">
        <a className="text-[#FF4266] text-base md:text-xl underline">Home</a>
      </Link>
    </div>
  ) : leadgen ? (
    <LeadGenTemplate
      leadgenKey={leadgen}
      leaders={[]}
      testimonials={testimonials}
    />
  ) : (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#100F1A] text-[#F5F8FF]">
      <Loading fill="#FF4266" width={100} height={100} />
    </div>
  );
};

export default Landing2;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          lead: "PCOD",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lead = params && typeof params.lead === "string" ? params.lead : "";
  const { videoTestimonials: testimonial } =
    await getPriorityTestimonialsOnServerSide();

  const leadgenTypes: { [leadKey: string]: string } = {
    busyprofessionals: "busyprofessionals",
    PCOD: "PCOD",
    weddingworkouts: "weddingworkouts",
    heartworkouts: "heartworkouts",
    weightloss: "weightloss",
    strenghtenback: "strenghtenback",
  };

  return {
    revalidate: 1,
    props: {
      leadgen: leadgenTypes[lead] ? leadgenTypes[lead] : "404",
      testimonials:
        testimonial.length > 3 ? testimonial.slice(0, 3) : testimonial,
    },
  };
};
