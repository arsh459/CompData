import { LocalUser } from "@hooks/joinBoat/V6/interface";
import JoinBoatWrapper from "./JoinBoatWrapper";

interface Props {
  localUser?: LocalUser;
  onEmailUpdate: (val: string) => void;
  onEmailSave: (val?: string) => void;
  progress?: number;
}

const EnterEmail: React.FC<Props> = ({
  localUser,
  onEmailUpdate,
  onEmailSave,
  progress,
}) => {
  const onNext = () => {
    if (localUser?.email?.trim()) {
      onEmailSave(localUser?.email);
    }
  };

  return (
    <JoinBoatWrapper
      title={"Let's Start with your email?"}
      onNext={onNext}
      disabled={!localUser?.email?.trim()}
      progress={progress}
    >
      <div className="p-4 flex justify-center ">
        <input
          className="w-full px-4 bg-[#232136] text-white text-base iphoneX:text-xl border-b border-[#757575] font-baim"
          value={localUser?.email ? localUser?.email : ""}
          onChange={(e) => onEmailUpdate(e.target.value)}
          placeholder="your@email.com"
        />
      </div>
    </JoinBoatWrapper>
  );
};

export default EnterEmail;
