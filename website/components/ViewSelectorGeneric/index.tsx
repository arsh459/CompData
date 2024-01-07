import clsx from "clsx";
import React from "react";
interface ViewProps {
  label: string;
  onPress: () => void;
}

interface Props {
  selectedViewHighlightColors?: string[];
  views: ViewProps[];
  currView: string;
  containerStyleTw?: string;
  fontSize?: string;
}
const ViewSelectorGeneric: React.FC<Props> = ({
  views,
  currView,
  containerStyleTw,
  fontSize,
  selectedViewHighlightColors,
}) => {
  return (
    <div
      className={clsx(
        `flex flex-row items-center overflow-auto rounded-lg`,
        containerStyleTw
      )}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          overflowX: "auto",
        }}
      >
        {views.map((view, index) => (
          <div
            key={index}
            className="flex-1 flex justify-center items-center mx-2 p-1  text-[#0F0F0F99]"
            onClick={view.onPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: "0 0.5rem",
              cursor: "pointer",
            }}
          >
            <div
              className={clsx(
                "w-full text-center",
                currView === view.label && "bg-[#FEAFD6] rounded-md "
              )}
              style={{
                position: "relative",
                zIndex: 0,
              }}
            >
              <span
                className={`capitalize ${fontSize ? fontSize : "text-sm"}`}
                style={{
                  textAlign: "center",
                  fontFamily: "Nunito-SemiBold",
                }}
              >
                {view.label}
              </span>
              {/* <div
                className="absolute left-0 right-0 bottom-0 h-0.5 rounded-sm"
                style={{
                  display: currView === view.label ? "block" : "none",
                  background:
                    selectedViewHighlightColors &&
                    selectedViewHighlightColors.length
                      ? selectedViewHighlightColors.length > 1
                        ? `linear-gradient(to right, ${selectedViewHighlightColors.join(
                            ","
                          )})`
                        : selectedViewHighlightColors[0]
                      : "#FFFFFF",
                }}
              /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSelectorGeneric;
