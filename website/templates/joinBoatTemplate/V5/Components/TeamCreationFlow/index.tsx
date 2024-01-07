import Header from "@templates/PaymentTemplate/Header";

interface Props {
  children: React.ReactNode;
}

const TeamCreationFlow: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full h-full bg-[#100F1A] flex flex-col text-white relative z-0">
      <div className="absolute inset-0 -z-10 flex justify-center items-end overflow-hidden">
        <img
          src={
            "https://ik.imagekit.io/socialboat/tr:w-1000,c-maintain_ratio,fo-auto/Screenshot_2022-09-26_at_6.03_2_-Jr7v7s_5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664528664653"
          }
          className="w-full max-w-4xl object-contain"
          alt=""
        />
      </div>
      <Header noButton={true} orgKey="no header" />
      <div className="h-20" />
      {children}
    </div>
  );
};

export default TeamCreationFlow;
