import clsx from "clsx";
import React from "react";
import Link from "next/link";
import AnchorLink from "react-anchor-link-smooth-scroll";
interface Props {
  switchColor?: boolean;
  heading: string;
  elements: {
    text: string;
    link: string;
    externalLink?: boolean;
    linkType: string;
  }[];
}

const FooterColumn: React.FC<Props> = ({ heading, elements, switchColor }) => {
  return (
    <div>
      <div>
        <p
          className={clsx(
            "text-lg font-medium",
            switchColor ? "text-white" : "text-white"
          )}
        >
          {heading}
        </p>
      </div>
      <div>
        {elements.map((item, index) => {
          if (item.linkType === "external") {
            return (
              <div key={`sub-${heading}-${item.text}`}>
                <a target="_blank" href={item.link} rel="noreferrer">
                  <p
                    className={clsx(
                      "text-sm text-white hover:text-orange-500",
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
              <div key={`sub-${heading}-${item.text}`}>
                <AnchorLink href={item.link}>
                  <p
                    className={clsx(
                      "text-sm text-white hover:text-orange-500",
                      index === 0 ? "pt-1" : "pt-2"
                    )}
                  >
                    {item.text}
                  </p>
                </AnchorLink>
              </div>
            );
          } else {
            return (
              <div key={`sub-${heading}-${item.text}`}>
                <Link href={item.link}>
                  <p
                    className={clsx(
                      "text-sm text-white hover:text-orange-500",
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

export default FooterColumn;
