import AndroidLogin from "./AndroidLogin";
import IOSLogin from "./IOSLogin";
import SelectDevice, { deviceTypes } from "./SelectDevice";

interface Props {
  deviceType: deviceTypes | undefined;
  setDeviceType: (val: deviceTypes) => void;
}

const Login: React.FC<Props> = ({ deviceType, setDeviceType }) => {
  return (
    <>
      {deviceType === "android" ? (
        <AndroidLogin />
      ) : deviceType === "ios" ? (
        <IOSLogin />
      ) : (
        <SelectDevice onProceed={setDeviceType} />
      )}
    </>
  );
};

export default Login;
