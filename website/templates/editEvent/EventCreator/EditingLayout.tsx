import MobileInteractive, {
  MobileViewProps,
} from "@modules/Banner/MobileInteractive/MobileInteractive";
import clsx from "clsx";
import BottomNav from "../BottomNav/BottomNav";

interface Props {
  navVisible: boolean;
  mobileViewProps: MobileViewProps;
  viewState: "edit" | "live";
  setViewState: (vs: "edit" | "live") => void;
  onBack: () => void;
  noBack?: boolean;
  hideMobile?: boolean;
}

const EditingLayout: React.FC<Props> = ({
  children,
  navVisible,
  mobileViewProps,
  viewState,
  setViewState,
  onBack,
  noBack,
  hideMobile,
}) => {
  return (
    <div className={clsx("flex", "h-full", "relative")}>
      <div
        // className="m-4 md:m-8 flex-1 justify-center"
        className={clsx(
          viewState === "edit" ? "block" : "hidden sm:flex",
          "m-4 md:m-8 flex flex-1 items-center justify-center"
        )}
      >
        {children}
      </div>

      {hideMobile ? null : (
        <div
          className={clsx(
            viewState === "live" ? "" : "hidden sm:flex",
            "pb-20 sm:pb-0",
            // "bg-red-50",
            "mt-24 flex-1 flex justify-center sm:items-center sm:mt-0"
          )}
        >
          <MobileInteractive {...mobileViewProps} />
        </div>
      )}
      <div className="h-40 sm:hidden" />
      {!navVisible ? null : (
        <div className="fixed left-0 right-0 bottom-0 sm:hidden">
          <BottomNav
            elements={[
              {
                name: "Edit",
                icon: "https://img.icons8.com/material-outlined/96/000000/edit--v3.png",
                onClick: () => setViewState("edit"),
                selected: viewState === "edit",
              },
              {
                name: "View",
                icon: "https://img.icons8.com/color/96/000000/youtube-live.png",
                onClick: () => setViewState("live"),
                selected: viewState === "live",
              },
            ]}
          />
        </div>
      )}

      <div className="fixed left-4 md:left-8 top-24 lg:hidden">
        {viewState === "edit" && !noBack ? (
          <div className="cursor-pointer" onClick={onBack}>
            <p className="text-gray-700 text-lg underline">Go Back</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditingLayout;
