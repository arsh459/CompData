import clsx from "clsx";
import React from "react";
import Link from "next/link";
import { weEventTrack } from "@analytics/webengage/user/userLog";
interface Props {
  heading: string;
  elements: {
    text: string;
    link: string;
    externalLink?: boolean;
    linkType: string;
  }[];
}

const FooterColumnV2: React.FC<Props> = ({ heading, elements }) => {
  const footerEvent = () => {
    weEventTrack("landing_footerClick", {});
  };

  return (
    <div>
      <div>
        <p className={clsx("text-white text-lg md:text-xl font-baim")}>
          {heading}
        </p>
      </div>
      <div>
        {elements.map((item, index) => {
          if (item.linkType === "external") {
            return (
              <div key={`sub-${heading}-${item.text}`} onClick={footerEvent}>
                <a target="_blank" rel="noreferrer" href={item.link}>
                  <p
                    className={clsx(
                      "text-sm md:text-base text-white/75 font-bair hover:text-white",
                      index === 0 ? "pt-1" : "pt-2"
                    )}
                  >
                    {item.text}
                  </p>
                </a>
              </div>
            );
          } else if (item.linkType === "anchor") {
            return (
              <div key={`sub-${heading}-${item.text}`} onClick={footerEvent}>
                <Link href={item.link} passHref>
                  {/* <a target="_blank"> */}
                  <p
                    className={clsx(
                      "text-sm md:text-base text-white/75 font-bair hover:text-white",
                      index === 0 ? "pt-1" : "pt-2"
                    )}
                  >
                    {item.text}
                  </p>
                  {/* </a> */}
                </Link>
              </div>
            );
          } else {
            return (
              <div key={`sub-${heading}-${item.text}`} onClick={footerEvent}>
                <Link href={item.link}>
                  <p
                    className={clsx(
                      "text-sm md:text-base text-white/75 font-bair hover:text-white",
                      index === 0 ? "pt-1" : "pt-2"
                    )}
                  >
                    {item.text}
                  </p>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default FooterColumnV2;
