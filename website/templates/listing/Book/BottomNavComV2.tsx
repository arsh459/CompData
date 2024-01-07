import { Link } from "@mui/material";
import clsx from "clsx";
import TopStrip from "@templates/listing/Book/TopStrip";
import { useEffect } from "react";
import mixpanel from "@config/mixpanel";

interface Props {
  onClick: () => void;
  cta: string;
  id?: string;
  cta2?: string;
  onClick2?: () => void;
  link?: string;
  topStripText?: string;
  registerBy?: Date;
  icon?: object;
  showIcon?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

const BottomNavComV2: React.FC<Props> = ({
  onClick,
  cta,
  cta2,
  onClick2,
  link,
  topStripText,
  registerBy,
  icon = null,
  id,
  showIcon = true,
  backgroundColor,
  textColor,
}) => {
  useEffect(() => {
    if (cta === "Start Workout") {
      mixpanel.track_links(`#start_workout`, "start_workout_click");
    }
  }, [cta]);

  return (
    <>
      <TopStrip text={topStripText} registerBy={registerBy} />
      <div className="bg-white px-4 py-4 border-t-2 shadow-lg flex justify-around items-center">
        {cta2 && onClick2 ? (
          <div
            className="bg-white px-4 py-2 border rounded-lg cursor-pointer flex items-center"
            onClick={onClick2}
          >
            {/* <img
              className="w-8 h-8 object-cover"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC+ElEQVRoge2YT4hNURzHf8fMyJ+UPyvFTGlS0oiZjSRFKVPsLCzEhoWyUMrGwpCwIEpZzE5RiLJQykzNJINIyCzUSHiMmJnIMObNmPlY3PO47px7z5l3593zRu+zub1zf+d3v993/h+RChX+P4A5wDHgFZDXz6PAbN/anNEmHmDm/rQxo1siiRbfGp3Q3SiJnsnkU6USagPIi8jMhJC8UmqWa74Z6SUVTc7y/t1kkvk0cjnl+9IA7AV6gX7gNtACNAMLYuJn69nJRFfmsxawELiRMGjHgZfARWAf0BAx0wL0EKwjPcARHyY2AjnL7GOiLWzIG0ANcBIYK8JEgVHgLFDjy0Q98ChG3D1gO9AKfHI0dNqHic3AN4OYXwR9vToUWwVsAG5ZjPT5MPLaIOQNsD4mvgZ4YTHSn7UPYeLAvgLMT4g/ZDEBcCFLDwVhzdpMDthtia0FvltM5IE6He+8HckU4KZrawArgRO+NU9At5yNYWCpjr8O9JVVqxAcmEyTQpTzOr6Bv+tRYnfNFOCUg4mfwBIdH+6CT3zrFxERYAXBALZxLlTHdsAqkAOaszJy1UHQELA4VGe/oxGASZ1R0hjpcxBzJlJnLsHWv6yMDFiEjAO1hnpbgQ82E8CWrIxcc/hXO4k5bHkHaNLPety6STd6DSkbgNXAD6BR/14GdDiYeQ+s8q1fRP5s1R9rYR9DLaOAXcBni5mvwCbfPgQ4EBE2AhxHn7kJzvOtJJ8k88C2UgmsA9pxW9yijKBbJpRvHfA8oc7bUhlpL8JAgcMxOauBg8Cgoc6XUhkxfcyFu0CVJfcOQ73OtJrjbhofFpGrV0R2KqXGLHHLDWXPivjeP8QZ2SMibSIy4pBjQEQuichapZTLFmKNoeypQ73ygmCrEaU81hNXgEUGE8NMwSVd1rfxTYaybqXUaNrEWRtpNJSlHugi2RsxDfRpacTUItNyxhqKDPQxYN5U5M66RboivzuUUoMZa0gPwWb0DsFVajuGY2+FChVKw2+YO7VeZv7P5wAAAABJRU5ErkJggg=="
            ></img> */}

            <p
              className={clsx(
                "uppercase text-red-500 text-lg pt-1 pb-1 pl-2",
                "font-semibold"
              )}
            >
              {cta2}
            </p>
          </div>
        ) : null}
        {link && cta ? (
          <Link href={link} id={cta === "Start Workout" ? "start_workout" : ""}>
            <div className="bg-red-500 px-4 py-2 rounded-lg cursor-pointer flex items-center">
              <img
                className="w-8 h-8 object-cover"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC+ElEQVRoge2YT4hNURzHf8fMyJ+UPyvFTGlS0oiZjSRFKVPsLCzEhoWyUMrGwpCwIEpZzE5RiLJQykzNJINIyCzUSHiMmJnIMObNmPlY3PO47px7z5l3593zRu+zub1zf+d3v993/h+RChX+P4A5wDHgFZDXz6PAbN/anNEmHmDm/rQxo1siiRbfGp3Q3SiJnsnkU6USagPIi8jMhJC8UmqWa74Z6SUVTc7y/t1kkvk0cjnl+9IA7AV6gX7gNtACNAMLYuJn69nJRFfmsxawELiRMGjHgZfARWAf0BAx0wL0EKwjPcARHyY2AjnL7GOiLWzIG0ANcBIYK8JEgVHgLFDjy0Q98ChG3D1gO9AKfHI0dNqHic3AN4OYXwR9vToUWwVsAG5ZjPT5MPLaIOQNsD4mvgZ4YTHSn7UPYeLAvgLMT4g/ZDEBcCFLDwVhzdpMDthtia0FvltM5IE6He+8HckU4KZrawArgRO+NU9At5yNYWCpjr8O9JVVqxAcmEyTQpTzOr6Bv+tRYnfNFOCUg4mfwBIdH+6CT3zrFxERYAXBALZxLlTHdsAqkAOaszJy1UHQELA4VGe/oxGASZ1R0hjpcxBzJlJnLsHWv6yMDFiEjAO1hnpbgQ82E8CWrIxcc/hXO4k5bHkHaNLPety6STd6DSkbgNXAD6BR/14GdDiYeQ+s8q1fRP5s1R9rYR9DLaOAXcBni5mvwCbfPgQ4EBE2AhxHn7kJzvOtJJ8k88C2UgmsA9pxW9yijKBbJpRvHfA8oc7bUhlpL8JAgcMxOauBg8Cgoc6XUhkxfcyFu0CVJfcOQ73OtJrjbhofFpGrV0R2KqXGLHHLDWXPivjeP8QZ2SMibSIy4pBjQEQuichapZTLFmKNoeypQ73ygmCrEaU81hNXgEUGE8NMwSVd1rfxTYaybqXUaNrEWRtpNJSlHugi2RsxDfRpacTUItNyxhqKDPQxYN5U5M66RboivzuUUoMZa0gPwWb0DsFVajuGY2+FChVKw2+YO7VeZv7P5wAAAABJRU5ErkJggg=="
                alt="activity icon"
              ></img>

              <p
                className={clsx(
                  "uppercase text-white text-lg pt-1 pb-1 pl-2",
                  "font-semibold"
                )}
              >
                {cta}
              </p>
            </div>
          </Link>
        ) : cta ? (
          <div
            className={clsx(
              "px-4 py-2 rounded-lg cursor-pointer flex items-center",
              backgroundColor ? backgroundColor : "bg-red-500"
            )}
            onClick={onClick}
            id={id ? id : ""}
          >
            {showIcon && icon ? (
              icon
            ) : showIcon ? (
              <img
                className="w-8 h-8 object-cover"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC+ElEQVRoge2YT4hNURzHf8fMyJ+UPyvFTGlS0oiZjSRFKVPsLCzEhoWyUMrGwpCwIEpZzE5RiLJQykzNJINIyCzUSHiMmJnIMObNmPlY3PO47px7z5l3593zRu+zub1zf+d3v993/h+RChX+P4A5wDHgFZDXz6PAbN/anNEmHmDm/rQxo1siiRbfGp3Q3SiJnsnkU6USagPIi8jMhJC8UmqWa74Z6SUVTc7y/t1kkvk0cjnl+9IA7AV6gX7gNtACNAMLYuJn69nJRFfmsxawELiRMGjHgZfARWAf0BAx0wL0EKwjPcARHyY2AjnL7GOiLWzIG0ANcBIYK8JEgVHgLFDjy0Q98ChG3D1gO9AKfHI0dNqHic3AN4OYXwR9vToUWwVsAG5ZjPT5MPLaIOQNsD4mvgZ4YTHSn7UPYeLAvgLMT4g/ZDEBcCFLDwVhzdpMDthtia0FvltM5IE6He+8HckU4KZrawArgRO+NU9At5yNYWCpjr8O9JVVqxAcmEyTQpTzOr6Bv+tRYnfNFOCUg4mfwBIdH+6CT3zrFxERYAXBALZxLlTHdsAqkAOaszJy1UHQELA4VGe/oxGASZ1R0hjpcxBzJlJnLsHWv6yMDFiEjAO1hnpbgQ82E8CWrIxcc/hXO4k5bHkHaNLPety6STd6DSkbgNXAD6BR/14GdDiYeQ+s8q1fRP5s1R9rYR9DLaOAXcBni5mvwCbfPgQ4EBE2AhxHn7kJzvOtJJ8k88C2UgmsA9pxW9yijKBbJpRvHfA8oc7bUhlpL8JAgcMxOauBg8Cgoc6XUhkxfcyFu0CVJfcOQ73OtJrjbhofFpGrV0R2KqXGLHHLDWXPivjeP8QZ2SMibSIy4pBjQEQuichapZTLFmKNoeypQ73ygmCrEaU81hNXgEUGE8NMwSVd1rfxTYaybqXUaNrEWRtpNJSlHugi2RsxDfRpacTUItNyxhqKDPQxYN5U5M66RboivzuUUoMZa0gPwWb0DsFVajuGY2+FChVKw2+YO7VeZv7P5wAAAABJRU5ErkJggg=="
                alt="activity icon"
              ></img>
            ) : (
              <></>
            )}

            <p
              className={clsx(
                "uppercase  text-lg pt-1 pb-1 pl-2",
                "font-semibold",
                textColor ? textColor : "text-white"
              )}
            >
              {cta}
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BottomNavComV2;
