import { binIcon } from "@constants/icons/iconURLs";

const DeleteHeader = () => {
  return (
    <div className="w-full flex items-end justify-center md:justify-start border-b border-white/20 py-4   ">
      <div className="flex items-center w-fit">
        <img
          src={binIcon}
          className="md:w-6 md:h-6 w-4 h-4 object-contain mr-1"
          alt="bin icon"
        />
        <h1 className=" text-white font-pJSB md:text-2xl text-base">Account Deletion</h1>
      </div>
    </div>
  );
};

export default DeleteHeader;
