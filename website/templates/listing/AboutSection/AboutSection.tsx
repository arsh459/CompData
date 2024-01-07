import clsx from "clsx";
import React from "react";
import Divider from "@components/divider/Divider";
import TextLayout from "../Layout/TextLayout";
import Linkify from "react-linkify";

interface Props {
  about?: string;
  editing: boolean | undefined;
  active: boolean;
  heading: string;
  editingHeading: string;
  placeholderText: string;
  noMinHeight?: boolean;
  noDivider?: boolean;
  textCenter?: boolean;
  // link?: string;
}
const AboutSection: React.FC<Props> = ({
  about,
  active,
  editing,
  heading,
  editingHeading,
  placeholderText,
  noMinHeight,
  noDivider,
  textCenter,
  // link,
}) => {
  // console.log("link", link);
  return (
    <TextLayout active={active} editing={editing}>
      <div className={clsx(noMinHeight ? "" : "min-h-[50vh]")}>
        {editing || noDivider ? null : (
          <div className="pb-4">
            <Divider />
          </div>
        )}

        <div className="">
          <p
            className={clsx(
              editing && !active ? "text-gray-400" : "text-gray-700",
              "text-xl font-medium"
            )}
          >
            {editing ? editingHeading : heading}
          </p>
        </div>

        <div className={clsx(heading ? "pt-1" : "", "")}>
          <p
            className={clsx(
              "break-words",
              "whitespace-pre-wrap",
              "prose-2xl",
              editing && !active ? "text-gray-400" : "text-gray-600",
              "text-base md:text-base",
              // "line-clamp-4",
              textCenter ? "text-center" : ""
            )}
          >
            <Linkify>
              {about ? about : editing && !about ? placeholderText : ""}
            </Linkify>
          </p>
        </div>
      </div>
    </TextLayout>
  );
};

export default AboutSection;
