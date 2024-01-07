interface Props {
  heading?: string;
  imgUrl?: string;
  title?: string;
  description?: string;
}

const HowToPlay: React.FC<Props> = ({
  heading,
  imgUrl,
  title,
  description,
}) => {
  return (
    <div className="flex-1 flex flex-col p-4 pt-20">
      {heading ? (
        <h2 className="text-xl iphoneX:text-3xl font-bold text-center iphoneX:py-2">
          {heading}
        </h2>
      ) : null}
      {imgUrl ? (
        // <div
        //   className="flex-1 mx-8"
        //   style={{
        //     backgroundImage: `url(${imgUrl})`,
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no-repeat",
        //     backgroundSize: "contain",
        //   }}
        // />
        <div className="flex justify-center items-center">
          <img
            src={imgUrl}
            alt="step image"
            className="max-w-[50%] iphoneX::max-w-max"
          />
        </div>
      ) : null}
      {title ? (
        <h3 className="iphoneX:text-xl text-center font-bold py-2 iphoneX:py-4">
          {title}
        </h3>
      ) : null}
      {description ? (
        <p className="text-xs iphoneX:text-base text-center">{description}</p>
      ) : null}
    </div>
  );
};

export default HowToPlay;
