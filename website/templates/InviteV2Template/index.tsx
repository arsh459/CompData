import WhatsAppChat from "@components/WhatsAppChat";
import { womenGroupImg } from "@constants/icons/iconURLs";
import { dataTypes } from "@constants/inviteV2";
import FooterV3 from "@modules/footer/FooterV3";
import AppDetails from "@templates/LandingPage/V2/AppDetails";
import JoinRevolution from "@templates/LandingPage/V2/components/JoinRevolution";
import LandingHeader from "@templates/LandingPage/V2/components/LandingHeader";
import { Background } from "@templates/WomenTemplate/components/Background";
import { useRef } from "react";
import Challenge from "./Challenge";
import DailySteps from "./DailySteps";
import Hero from "./Hero";
import WhatYouGet from "./WhatYouGet";

interface Props {
  data: dataTypes;
}

const InviteV2Template: React.FC<Props> = ({ data }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const link = `/joinBoatV5?origin=${data.name}${
    data.teamId ? `&teamId=${data.teamId}` : ""
  }${data.noPayment ? `&noPayment=true` : ""}${
    data.noSlot ? `&noSlot=true` : ""
  }`;

  return (
    <div
      ref={parentRef}
      className="bg-[#100F1A] text-white w-screen scrollbar-hide relative z-0"
    >
      <Background />
      <LandingHeader refObj={parentRef} route={link} />
      <Hero data={data} link={link} />
      <Challenge data={data} />
      <DailySteps steps={data.steps} />
      <WhatYouGet whatYouGet={data.whatYouGet} />
      <AppDetails bgColor="bg-[#FFFFFF26]" />
      <JoinRevolution origin="teams" />
      <div className="bg-[#FFFFFF1A]">
        <FooterV3 footerImg={womenGroupImg} />
      </div>
      <WhatsAppChat
        redirectLink="https://api.whatsapp.com/send?phone=919958730020&text=Hi! I have a question"
        position="right-5 bottom-20"
      />
    </div>
  );
};

export default InviteV2Template;
