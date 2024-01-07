import { LocalUser, UserInterface } from "@models/User/User";
import clsx from "clsx";
import ShowBodyType from "./ShowBodyType";

interface Props {
  user: LocalUser | UserInterface | undefined;
  children?: React.ReactNode;
  bgColor?: string;
  margin?: string;
  heading?: string;
}

const TransformationView: React.FC<Props> = ({
  user,
  children,
  bgColor,
  margin,
  heading,
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl overflow-hidden",
        bgColor ? bgColor : "bg-[#262630]",
        margin ? margin : "my-4"
      )}
    >
      {heading ? (
        <h4
          className="text-white text-lg px-6 py-4"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {heading}
        </h4>
      ) : null}
      {user?.currentBodyType && user?.desiredBodyType ? (
        <div className="flex flex-row justify-between p-4">
          <ShowBodyType
            bodyTypeId={user.currentBodyType}
            gender={
              user.gender && user.gender !== "notSpecified"
                ? user.gender
                : "female"
            }
          />
          <div className="w-1/12 max-w-[30px] pb-12 flex justify-center items-center">
            <img
              src="https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_48_z2qabrZ-x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666093402160"
              className="w-full aspect-1 object-contain"
            />
          </div>
          <ShowBodyType
            bodyTypeId={user.desiredBodyType}
            gender={
              user.gender && user.gender !== "notSpecified"
                ? user.gender
                : "female"
            }
          />
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default TransformationView;
