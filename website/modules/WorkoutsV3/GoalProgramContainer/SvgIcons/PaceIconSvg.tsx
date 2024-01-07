import * as React from "react";
interface Props {
  color?: string;
}
const PaceIconSvg: React.FC<Props> = ({ color }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 23 23"
      fill={color ? color : "#F19B38"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={2.556} cy={2.556} r={2.556} />
      <path d="M.32 10.541c0-.251.274-.517.554-.714.253-.18.565-.244.876-.244h.562c1.105 0 2.227-.866 2.516-1.932.227-.836.443-1.674.443-1.901 0-.269.366-.71.713-1.06.255-.257.47-.566.729-.82.709-.7 2.372-1.664 3.564-2.293.378-.198.81-.26 1.231-.188 1.633.28 4.033.687 4.145.687.16 0 1.118.48.958 1.278-.128.639-.905.692-1.278.639-1.437-.16-4.376-.448-4.632-.32-.08.04-.182.164-.292.33-.472.715-.244 1.66.403 2.222.813.708 1.857 1.58 2.764 2.24 1.255.912 1.16 2.231.899 2.959-.058.16-.156.3-.268.428-.79.905-2.15 2.486-2.388 2.842-.266.4.07.799.55.799h4.562c1.11 0 .947.67.53 1.282-.298.438-.827.635-1.357.635h-7.32c-1.15 0-.904-1.278-.638-1.917l1.049-2.517a1.96 1.96 0 00-.529-2.252c-.882-.748-1.798-1.477-1.798-1.3 0 .17-.425.821-.85 1.426-.362.515-.958.81-1.587.81H1.118c-.48 0-.799-.64-.799-1.119zM13.785 20.786l-1.506-1.883a.996.996 0 00-.778-.374c-.862 0-1.317 1.022-.74 1.663l1.243 1.38c.09.1.198.182.322.235 1.58.676 1.756-.1 1.618-.71a.777.777 0 00-.159-.311z" />
      <path d="M14.377 5.75h5.796l.958.958H15.7l-1.324-.958zM22.408 11.18h-5.795l-.958.958h5.43l1.323-.958zM16.612 8.305h6.389v.958h-6.389z" />
    </svg>
  );
};

export default PaceIconSvg;
