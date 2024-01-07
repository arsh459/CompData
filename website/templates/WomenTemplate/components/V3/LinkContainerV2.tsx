import { useState } from "react";
import { menuIcon } from "@constants/icons/iconURLs";

import SocialModal from "@templates/LandingPage/V2/components/SocialModal";
import AllLinks, { activeLinkType } from "../V2/LandingHeader/AllLinks";

interface Props {
  route?: string;
  btnText?: string;
  activeLink?: activeLinkType;
  finalRef: string;
  btnAction: () => void;
}

const LinksContainerV2: React.FC<Props> = ({
  route,
  btnText,
  activeLink,
  finalRef,
  btnAction,
}) => {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-white flex items-center">
      <div className="hidden lg:flex items-center gap-3">
        <AllLinks
          activeLink={activeLink}
          finalRef={finalRef}
          btnText={route === "/myProgram" ? "My Program" : btnText}
          btnAction={btnAction}
        />
      </div>
      <img
        src={menuIcon}
        alt="arrow to open modal to select about-us and blog"
        className="w-5 aspect-1 object-contain lg:hidden"
        onClick={() => setIsOpen(true)}
      />
      <SocialModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        btnText={btnText}
        btnAction={btnAction}
      />
    </div>
  );
};

export default LinksContainerV2;
