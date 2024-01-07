import LaunchCourse from "@modules/Banner/LaunchCourse/LaunchCourse";
import MobileInteractive from "@modules/Banner/MobileInteractive/MobileInteractive";
import clsx from "clsx";
// import Heading from "../Heading/Heading";

interface Props {
  textPrefix: string;
  textPrimary: string;
  textSuffix: string;
  kpis: string[];
  //   heading: string;
  //   subtitle: string;
  media?: string;
  rowReverse?: boolean;
}

const MediaDesc: React.FC<Props> = ({
  //   heading,
  //   subtitle,
  media,
  rowReverse,
  textPrefix,
  textPrimary,
  textSuffix,
  kpis,
}) => {
  //   console.log("row", rowReverse);
  return (
    <div
      className={clsx(
        // "bg-red-50",
        "w-full",
        "flex flex-col",
        rowReverse ? "md:flex-row-reverse" : "md:flex-row"
      )}
    >
      <div className="w-full md:w-1/2  flex items-center justify-center">
        {/* <Heading textLeft={true} heading={heading} subtitle={subtitle} />
         */}
        <LaunchCourse
          textPrefix={textPrefix}
          textSuffix={textSuffix}
          textPrimary={textPrimary}
          textCenter={true}
          textWeight="medium"
          textSize="medium"
          kpis={kpis}
          textFlow="flow"
        />
      </div>
      {/* <div className="bg-yellow-50 w-full md:w-1/2  flex items-center justify-center">
        <Heading textLeft={true} heading={heading} subtitle={subtitle} />
      </div> */}

      <div className="w-full md:w-1/2 pt-8 md:pt-0">
        <div className="flex justify-center">
          {media ? (
            <img src={media} className="object-cover rounded-md" alt="media" />
          ) : (
            <MobileInteractive size="small" screen="live" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaDesc;
