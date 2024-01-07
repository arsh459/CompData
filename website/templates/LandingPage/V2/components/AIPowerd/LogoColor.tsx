import clsx from "clsx";

interface Props {
  opacity: number;
}

const LogoColor: React.FC<Props> = ({ opacity }) => {
  return (
    <div
      className="flex flex-col justify-center items-center relative z-0"
      style={{
        opacity,
        transition: "all 500ms cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
    >
      <div
        className={clsx(
          "absolute -top-8 -left-8 -z-10 bg-[#AB41FF]/50 rounded-full filter blur-2xl",
          "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation1"
        )}
      />
      <div
        className={clsx(
          "absolute -top-8 -right-8 -z-10 bg-[#79FFDF]/50 rounded-full filter blur-2xl",
          "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation2"
        )}
      />
      <div
        className={clsx(
          "absolute -bottom-8 -right-8 -z-10 bg-[#5B41FF]/50 rounded-full filter blur-2xl",
          "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation3"
        )}
      />
      <div
        className={clsx(
          "absolute -bottom-8 -left-8 -z-10 bg-[#79BFFF]/75 rounded-full filter blur-2xl",
          "w-full h-full mix-blend-multiply transition-all duration-1000 blobAnimation4"
        )}
      />
      <img
        src={`https://ik.imagekit.io/socialboat/tr:w-400,c-maintain-ratio/Component_1__1__5hQlHRYgx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1659117363799`}
        alt="process icons"
        className="w-2/3 aspect-1"
      />
    </div>
  );
};

export default LogoColor;
