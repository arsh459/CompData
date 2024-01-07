import DefaultLayout from "@layouts/DefaultLayout";
import { companySEO, homeSEO } from "@constants/seo";
import AimingFor from "./Components/AimingFor";
import BuiltBy from "./Components/BuiltBy";
import { useRef } from "react";
import FooterV3 from "@modules/footer/FooterV3";
import BackedByV2 from "./Components/BackedByV2";
import { Background } from "@templates/WomenTemplate/components/Background";
import LandingHeaderV2 from "@templates/WomenTemplate/components/V3/LandingHeaderV2";
import { useCoachAtt } from "@hooks/attribution/useCoachAtt";
import { womenGroupImg } from "@constants/icons/iconURLs";
import { OrganizationJsonLd } from "next-seo";
import { companyDetails } from "@templates/LandingPage/components/Footer/constants";

const CompanyLayout: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { coachRef } = useCoachAtt();

  return (
    <DefaultLayout
      title={companySEO.title}
      link={companySEO.link}
      img={companySEO.img}
      canonical={companySEO.link}
      noIndex={companySEO.noIndex}
      description={companySEO.description}
    >
      <>
        <OrganizationJsonLd
          id={companySEO.link}
          logo={companyDetails.logo}
          legalName={companyDetails.name}
          name={"SocialBoat"}
          address={{
            streetAddress: companyDetails.address,
            addressLocality: companyDetails.city,
            addressRegion: companyDetails.state,
            postalCode: companyDetails.pin,
            addressCountry: companyDetails.country,
          }}
          sameAs={[
            "https://play.google.com/store/apps/details?id=com.socialboat.socialboat&hl=en_IN&gl=US",
            "https://apps.apple.com/us/app/socialboat-weightloss-pcos/id1635586100",
            "https://www.facebook.com/socialboat.live",
            "https://www.linkedin.com/company/socialboat-live",
            "https://www.instagram.com/socialboat.live",
            "https://www.youtube.com/channel/UCa93FaRReHYXDqL3-IvDocg",
          ]}
          contactPoints={[
            {
              telephone: "+91 9599014590",
              contactType: "Customer Service",
              availableLanguage: ["English", "Hindi"],
            },
          ]}
          // contactPoints={[
          //   {
          //     telephone: '+1-401-555-1212',
          //     contactType: 'customer service',

          //     availableLanguage: ['English'],
          //   },

          // ]}

          url={homeSEO.link}
        />
        <div ref={ref} className=" min-h-screen  relative z-0">
          {/* <div
            className="fixed inset-0 -z-10"
            style={{
              background: `linear-gradient(180deg, #300F86 0%, #6C26B7 25%, #B354DE 56%, #E997F3 81%, #F3BBF3 99%)`,
            }}
          ></div> */}
          <Background imgUrl="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/about_us_GypmnC62v.png?updatedAt=1689836646520" />

          <LandingHeaderV2
            route="/start?origin=company"
            btnText="Start Journey"
            coachRef={coachRef}
            activeLink="link_4"
          />
          <div className="h-40" />
          <AimingFor />
          <div className="h-40" />
          <BuiltBy />
          <div className="h-40" />
          <BackedByV2 />
          <div className="h-40 " />
          <div className="bg-[#FFFFFF1A] border-t border-white/30">
            <FooterV3 footerImg={womenGroupImg} />
          </div>
        </div>
      </>
    </DefaultLayout>
  );
};

export default CompanyLayout;
