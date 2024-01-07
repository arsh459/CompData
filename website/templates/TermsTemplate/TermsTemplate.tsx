//packages

//local
// import Header from '@module/header/header.module';
// import Footer from '@module/footer/Footer.module';
// import FooterV2 from "@module/footer/FooterV2.module";
import clsx from "clsx";
import Terms from "./Terms";
// import Header from "@components/header";
// import FooterV2 from "@modules/footer/Footer";
import { useRef } from "react";
import LandingHeader from "@templates/LandingPage/V2/components/LandingHeader";
import FooterV3 from "@modules/footer/FooterV3";
// import { womenGroupImg } from "@constants/icons/iconURLs";
// import HeaderV2 from "@module/header/headerV2.module";
const TermsTemplate: React.FC = ({}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className={clsx("w-screen", " mx-auto")}>
        <LandingHeader refObj={parentRef} />

        <Terms />

        <div className="h-36" />
      </div>
      <div
        className="bg-[#100F1A]"
        // className="bg-[#FFFFFF1A]"
      >
        <FooterV3 />
      </div>
    </div>
  );
};

export default TermsTemplate;
