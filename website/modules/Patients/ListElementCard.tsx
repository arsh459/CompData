import clsx from "clsx";
import React from "react";
interface Props {
  primaryText?: string;
  secondaryText?: string;
  thirdText?: string;
  borderTw?: string;
  flexDirectionTw?: string;
  primaryTextStyleTw?: string;
  secondaryTextStyleTw?: string;
}
const ListElementCard: React.FC<Props> = ({
  primaryText,
  secondaryText,
  borderTw,
  flexDirectionTw,
  primaryTextStyleTw,
  secondaryTextStyleTw,
  thirdText,
}) => {
  return (
    <>
      <div
        className={clsx(
          "flex p-4 border-b border-black/10",
          flexDirectionTw ? flexDirectionTw : "flex-col ",
          borderTw
        )}
      >
        <p
          className={clsx(
            "text-black  font-popM ",
            primaryTextStyleTw ? primaryTextStyleTw : "text-sm"
          )}
        >
          {primaryText}
        </p>
        <p
          className={clsx(
            "text-black/50 whitespace-pre-wrap  font-popR ",
            secondaryTextStyleTw ? secondaryTextStyleTw : "text-xs"
          )}
        >
          {secondaryText}
        </p>
        {thirdText ? (
          <p
            className={clsx(
              "text-black/50   font-popR ",
              secondaryTextStyleTw ? secondaryTextStyleTw : "text-xs"
            )}
          >
            {thirdText}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default ListElementCard;
