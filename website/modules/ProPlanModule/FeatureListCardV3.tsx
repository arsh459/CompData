interface Props {
  iconImg: string;
  heading?: string;
  mainText?: string;
  headingColor?: string;
  highlightFirstItem?: boolean;
  showNoTick?: boolean;
  inApp?: boolean;
}
const FeatureListCardV3: React.FC<Props> = ({
  heading,
  iconImg,
  mainText,
  headingColor,
  highlightFirstItem,
  showNoTick,
  inApp,
}) => {
  // const openWhatsApp = () => {
  //   window.open(
  //     `https://api.whatsapp.com/send?text=${encodeURIComponent(
  //       "Hi!\nI want to start my free consultation"
  //     )}`
  //   );
  //   weEventTrack("ProScreen_clickBookConsultation", {});
  // };
  // const uriImg = getImageUri(
  //   highlightFirstItem,
  //   showNoTick,
  //   rightArrowIconBonusList,
  //   rightArrowBowIconPurpleFrame14,
  //   rightArrowIconBonusList
  // );
  return (
    <div className="flex-1   pb-2">
      <div className={`flex flex-row px-4  items-center rounded-[20px] `}>
        <div className="w-12 ">
          <img
            src={iconImg}
            alt="Icon"
            className="w-full aspect-1 rounded-full"
          />
        </div>
        <div className="flex-1 p-2.5">
          {heading && (
            <p
              className={`text-base md:text-lg font-nunitoSB${
                headingColor ? headingColor : "text-white"
              }`}
            >
              {heading}
            </p>
          )}
          {mainText && (
            <p className="text-sm iphoneX:font-nunitoL text-[#FFFFFF]/70">
              {mainText}
            </p>
          )}
        </div>
        <div>
          {/* <img
            src={uriImg}
            alt="Arrow Icon"
            className={`w-5 ${highlightFirstItem ? "w-6" : ""} aspect-1`}
          /> */}
          {inApp ? (
            <a
              href="https://socialboat.app.link/download"
              target="_blank"
              rel="noreferrer"
            >
              <div className="bg-white rounded-lg cursor-pointer">
                <p className="text-sm font-nunitoSB text-[#2c2c2c] px-3 py-2">
                  In App
                </p>
              </div>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeatureListCardV3;
