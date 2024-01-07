import { statusTypes } from "@hooks/tasks/useIsTaskAllowedV4";
interface Props {
  taskStatus: statusTypes | undefined;
  unlocksIn: string;
}
const ExpireOrUnlockIn: React.FC<Props> = ({ taskStatus, unlocksIn }) => (
  <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
    {taskStatus === "expired" ? (
      <img
        src="https://ik.imagekit.io/socialboat/Group_1277_sNmAugOUA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677237373773"
        className="w-1/2 aspect-[2.8] object-contain"
      />
    ) : unlocksIn ? (
      <p className="text-white text-xs sm:text-sm lg:text-base font-nunitoM text-center">
        Unlocking in <br />{" "}
        <span className="font-nunitoB text-[#FF2D77]">{unlocksIn}</span>
      </p>
    ) : null}
  </div>
);

export default ExpireOrUnlockIn;
