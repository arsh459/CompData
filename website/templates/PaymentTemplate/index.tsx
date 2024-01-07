import WhatsAppChat from "@components/WhatsAppChat";
import { coaches, orgObj } from "@constants/organization";
import { homeSEO } from "@constants/seo";
import { useCTA } from "@hooks/paymentPage/useCTA";
import DefaultLayout from "@layouts/DefaultLayout";
import { Testimonial } from "@models/Testimonial/interface";
import Body from "./Body";
import Header from "./Header";

interface Props {
  orgKey: string;
  subDir: string;
  testimonials?: Testimonial[];
  videoTestimonials?: Testimonial[];
}

const PaymentTemplate: React.FC<Props> = ({
  orgKey,
  subDir,
  testimonials,
  videoTestimonials,
}) => {
  const organization = orgObj[orgKey] ? orgObj[orgKey] : undefined;

  const { ctaHidden } = useCTA();

  return (
    <DefaultLayout
      title={organization ? organization.name : "SocialBoat"}
      link={`https://socialboat.live/${subDir}/${orgKey}`}
      img={homeSEO.img}
      canonical={`https://socialboat.live/${subDir}/${orgKey}`}
      noIndex={false}
      description={
        organization ? `Fit with ${organization.name}` : "Fit with SocialBoat"
      }
    >
      {organization ? (
        <div className="w-screen h-screen flex flex-col  text-[#F5F8FF] relative z-0 font-bair">
          <div className="absolute inset-0 -z-10 flex justify-center items-end overflow-hidden">
            <img
              src={
                "https://ik.imagekit.io/socialboat/tr:w-1000,c-maintain_ratio,fo-auto/Screenshot_2022-09-26_at_6.03_2_-Jr7v7s_5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664528664653"
              }
              className="w-full max-w-4xl object-contain"
              alt=""
            />
          </div>
          <Header
            eventName="invitePage_clickLogo"
            noButton={true}
            orgKey={orgKey}
            ctaLink={coaches[orgKey] ? `/start?origin=${orgKey}` : undefined}
          />
          <Body
            orgKey={orgKey}
            organization={organization}
            ctaHidden={ctaHidden}
            testimonials={testimonials}
            videoTestimonials={videoTestimonials}
            ctaLink={coaches[orgKey] ? `/start?origin=${orgKey}` : undefined}
          />
          <WhatsAppChat
            redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi!"
            popupMsg="Chat with our Health Expert "
            position="right-5 bottom-[5%]"
          />
        </div>
      ) : null}
    </DefaultLayout>
  );
};

export default PaymentTemplate;
