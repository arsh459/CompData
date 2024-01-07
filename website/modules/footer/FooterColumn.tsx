import clsx from "clsx";
import React from "react";
import Link from "next/link";
interface Props {
  heading: string;
  elements: {
    text: string;
    link: string;
    externalLink?: boolean;
    linkType: string;
  }[];
}

const FooterColumn: React.FC<Props> = ({ heading, elements }) => {
  return (
    <div>
      <div>
        <p className={clsx("text-gray-700 text-lg font-medium")}>{heading}</p>
      </div>
      <div>
        {elements.map((item, index) => {
          if (item.linkType === "external") {
            return (
              <div key={`sub-${heading}-${item.text}`}>
                <a target="_blank" href={item.link} rel="noreferrer">
                  <p
                    className={clsx(
                      "text-sm text-gray-700 hover:text-orange-500",
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
                <Link href={item.link}>
                  {/* <a target="_blank"> */}
                  <p
                    className={clsx(
                      "text-sm text-gray-700 hover:text-orange-500",
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
              <div key={`sub-${heading}-${item.text}`}>
                <Link href={item.link}>
                  <p
                    className={clsx(
                      "text-sm text-gray-700 hover:text-orange-500",
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
