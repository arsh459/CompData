import clsx from "clsx";

interface Props {
  clsStr?: string;
}

const FlameWaveBg = () => {
  return (
    <img
      src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/runningBg_MhHzrkOu2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674656291224"
      className="absolute left-0 right-0 bottom-1/2 translate-y-1/2 object-contain -z-20"
      alt="women page wave image"
    />
  );
};

export default FlameWaveBg;

export const FlameWaveBgV2: React.FC<Props> = ({ clsStr }) => {
  return (
    <img
      src="https://ik.imagekit.io/socialboat/tr:h-1000,c-maintain_ratio,fo-auto/Group_1036_1_GdC0tINf8.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676882979847"
      className={clsx(
        clsStr
          ? clsStr
          : "absolute left-0 right-0 bottom-1/2 translate-y-1/2 object-contain -z-20"
      )}
      alt="women page wave image"
    />
  );
};
