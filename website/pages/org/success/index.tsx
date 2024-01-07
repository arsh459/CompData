import { deviceTypes } from "@templates/PaymentTemplate/SelectDevice";
import SuccessTemplate from "@templates/PaymentTemplate/SuccessTemplate";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const platform = router.query.platform as deviceTypes;

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-[#100F1A] text-[#F5F8FF] font-baib"
      style={{ fontFamily: "BaiJamjuree-Regular" }}
    >
      <SuccessTemplate platform={platform} />
    </div>
  );
};

export default Success;
