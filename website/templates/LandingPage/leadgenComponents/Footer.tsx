import Logo from "@components/logo/Logo";

const Footer = () => {
  return (
    <div className="w-full bg-[#1B192B] p-4">
      <div className="flex justify-between items-center flex-col sm:flex-row w-full max-w-screen-xl mx-auto my-2">
        <Logo textColor="text-[#F5F8FF]" />
        <div className="text-[#F5F8FF] text-base pt-4 sm:pt-0">
          <p className="text-center">© SocialBoat. All rights reserved</p>
          <p className="text-center">
            Made with
            <span className="text-[#FF4165] mx-1">❤</span>
            in India
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
