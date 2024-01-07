import clsx from "clsx";

interface Props {
  heightStr?: string;
  imgSizeStr?: string;
  textSizeStr?: string;
}

const PrivateMedia: React.FC<Props> = ({
  heightStr,
  imgSizeStr,
  textSizeStr,
}) => {
  return (
    <div
      className={clsx(
        heightStr ? heightStr : "h-48 iphoneX:h-60",
        "text-white p-4 flex flex-col justify-center items-center"
      )}
      style={{
        background:
          "linear-gradient(171.23deg, rgba(0, 0, 0) 7.39%, rgba(70, 39, 111, 0.448) 43.77%, rgba(158, 56, 136, 0.446566) 65.12%, rgba(248, 87, 109, 0.7) 97.84%)",
      }}
    >
      <img
        src={`https://ik.imagekit.io/socialboat/Vector_gVZJzSRj5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659356928799`}
        className={clsx(
          imgSizeStr ? imgSizeStr : "w-6 iphoneX:w-8 h-6 iphoneX:h-8",
          "object-contain"
        )}
        alt="locked icon"
      />
      <p
        className={clsx(
          textSizeStr ? textSizeStr : "w-2/3 text-xl iphoneX:text-2xl",
          "font-bold text-center mt-2.5 iphoneX:mt-4"
        )}
      >
        This Media is posted privately.
      </p>
    </div>
  );
};

export default PrivateMedia;
