import clsx from "clsx";

interface Props {
  size?: "small" | "medium" | "large";
  textColor?: string;
}

const Logo: React.FC<Props> = ({ size, textColor }) => {
  return (
    <div className="flex items-center">
      <img
        src={
          "https://ik.imagekit.io/socialboat/Component_6__1__CgPWY-2O0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663242315232"
        }
        className={clsx(
          "aspect-1 object-contain",
          size === "large"
            ? "w-7 md:w-9 mr-3"
            : size === "medium"
            ? "w-5 md:w-7 mr-2.5"
            : "w-3 md:w-5 mr-2"
        )}
        alt="socialboat icon"
      />
      <p
        className={clsx(
          "font-baib",
          textColor ? textColor : "text-white",
          size === "large"
            ? "text-3xl md:text-4xl"
            : size === "medium"
            ? "text-2xl md:text-3xl"
            : "text-xl md:text-2xl"
        )}
        style={{ fontFamily: "BaiJamjuree-Bold" }}
      >
        SocialBoat
      </p>
    </div>
  );
};

export default Logo;
