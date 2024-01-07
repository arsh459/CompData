import Button from "@components/button";
// TODO
// import { homeDomain } from "@constants/seo";
import clsx from "clsx";
import Link from "next/link";
import LiveURL from "../LiveURL";
// import clsx from "clsx";

interface Props {
  live: boolean;
  liveHeading: string;
  inDraftHeading: string;
  buttonText: string;
  leftButtonText: string;
  rightButtonText: string;
  urlPath?: string;
  onButtonPress: () => void;
  onLeftButtonPress?: () => void;
  liveHelperText: string;
  inDraftHelperText: string;
  subdomain?: string;
  subtitle?: string;
  center?: boolean;
  buttonPath?: string;
  hideURL?: boolean;
  leftType?: "control" | "contained";
  rightType?: "control" | "contained";
}

const Welcome: React.FC<Props> = ({
  live,
  urlPath,
  liveHeading,
  inDraftHeading,
  buttonText,
  leftButtonText,
  rightButtonText,
  onButtonPress,
  onLeftButtonPress,
  liveHelperText,
  inDraftHelperText,
  subdomain,
  subtitle,
  center,
  buttonPath,
  hideURL,
  leftType,
  rightType,
}) => {
  // console.log("urlPath", urlPath);
  return (
    <div className="">
      <div className="pb-4">
        <p
          className={clsx(
            "text-4xl text-gray-600 font-medium",
            center ? "text-center" : ""
          )}
        >
          {live ? liveHeading : inDraftHeading}
        </p>
        {subtitle ? (
          <p
            className={clsx(
              "text-lg pb-2  text-gray-500 pt-2",
              center ? "text-center" : ""
            )}
          >
            {subtitle}
          </p>
        ) : null}
        {live && !hideURL ? (
          <div className={clsx("pt-1 flex ", center ? "justify-center" : "")}>
            <LiveURL urlPath={urlPath} subdomain={subdomain} />
          </div>
        ) : null}
      </div>

      <div className={clsx("flex", center ? "justify-center" : "")}>
        {!live ? (
          <Button appearance="contained" onClick={onButtonPress}>
            <div className="pl-2 pr-2">
              <p className="capitalize">{buttonText}</p>
            </div>
          </Button>
        ) : urlPath ? (
          <div className="flex">
            {onLeftButtonPress ? (
              <Button
                appearance={leftType ? leftType : "contained"}
                onClick={onLeftButtonPress}
              >
                <div className="pl-2 pr-2">
                  <p
                    className={clsx(
                      leftType === "contained" ? "text-white" : "text-gray-600",
                      "capitalize"
                    )}
                  >
                    {leftButtonText}
                  </p>
                </div>
              </Button>
            ) : (
              <Link
                //TODO
                href={
                  buttonPath
                    ? buttonPath
                    : // : subdomain
                      // ? `https://${subdomain}.${homeDomain}/${urlPath}`
                      urlPath
                }
              >
                <Button appearance={leftType ? leftType : "contained"}>
                  <div className="pl-2 pr-2">
                    <p
                      className={clsx(
                        leftType === "contained"
                          ? "text-white"
                          : "text-gray-600",
                        "capitalize"
                      )}
                    >
                      {leftButtonText}
                    </p>
                  </div>
                </Button>
              </Link>
            )}
            <div className="pl-2">
              <Button
                appearance={rightType ? rightType : "control"}
                onClick={onButtonPress}
              >
                <div className="pl-2 pr-2">
                  <p
                    className={clsx(
                      rightType === "contained"
                        ? "text-white"
                        : "text-gray-600",
                      "capitalize font-semibold"
                    )}
                  >
                    {rightButtonText}
                  </p>
                </div>
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <p
        className={clsx(
          "text-sm text-gray-600 font-light pt-1",
          center ? "text-center" : ""
        )}
      >
        {live ? liveHelperText : inDraftHelperText}
      </p>
    </div>
  );
};

export default Welcome;
