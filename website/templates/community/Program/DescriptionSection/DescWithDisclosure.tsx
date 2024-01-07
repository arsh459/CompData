import DisclosureElement from "@templates/listing/Disclosure/Disclosure";
// import clsx from "clsx";
// import { useState } from "react";
// import NextButton from "../NextButton";
import DescriptionSection from "./DescriptionSection";

interface Props {
  desc?: string;
  preview: boolean;
}

const DescWithDisclosure: React.FC<Props> = ({ desc, preview }) => {
  //   const [showMore, setShowMore] = useState<boolean>(true);

  return (
    <div>
      {preview ? (
        <div>
          <DisclosureElement heading="What's the challenge?">
            <DescriptionSection desc={desc} heading={true} />
          </DisclosureElement>
        </div>
      ) : (
        <div>
          <DescriptionSection desc={desc} />
        </div>
      )}
    </div>
  );
};

export default DescWithDisclosure;
