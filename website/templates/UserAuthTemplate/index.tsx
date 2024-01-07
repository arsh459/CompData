import Header from "@templates/PaymentTemplate/Header";
import Login from "@templates/PaymentTemplate/Login";
import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";

interface Props {
  deviceType: deviceTypes | undefined;
  setDeviceType: (val: deviceTypes) => void;
  org?: string;
}

const UserAuthTemplate: React.FC<Props> = ({
  deviceType,
  org,
  setDeviceType,
}) => {
  return (
    <div className="fixed inset-0 z-0 bg-[#100F1A] flex flex-col text-white">
      <div className="absolute inset-0 -z-10 flex justify-center items-end overflow-hidden">
        <img
          src={
            "https://ik.imagekit.io/socialboat/tr:w-1000,c-maintain_ratio,fo-auto/login_ydh2ifAMq.png?updatedAt=1679297298641"
          }
          className="w-full max-w-4xl object-contain"
          alt="image of two people with doing exercise holding weight"
        />
      </div>
      <Header noButton={true} orgKey={org} />
      <div className="h-20" />
      <Login deviceType={deviceType} setDeviceType={setDeviceType} />
      {deviceType === "ios" ? (
        <div className="bg-gradient-to-b from-transparent to-black h-2/3 hidden md:block -z-10 absolute left-0 right-0 bottom-0" />
      ) : null}
    </div>
  );
};

export default UserAuthTemplate;
