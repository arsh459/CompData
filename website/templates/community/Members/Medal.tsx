import clsx from "clsx";

interface Props {
  position: number;
  text: string;
  textBold?: boolean;
}

const Medal: React.FC<Props> = ({ text, position, textBold }) => {
  return (
    <div className="flex justify-center items-center">
      {/* <img
        className="w-6 h-6 object-cover"
        src={
          position === 1
            ? "https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/32/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto.png"
            : position === 2
            ? "https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/32/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-2.png"
            : "https://img.icons8.com/external-yogi-aprelliyanto-flat-yogi-aprelliyanto/32/000000/external-medal-award-yogi-aprelliyanto-flat-yogi-aprelliyanto-13.png"
        }
      />
       */}

      <div className="flex items-center">
        <img
          className="w-8 h-8 object-cover"
          src={
            position === 1
              ? "https://img.icons8.com/color-glass/96/000000/trophy.png"
              : position === 2
              ? "data:image/png;base64,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"
              : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADCElEQVRoge2YT0gUURzHv7+3rm4XtVt/b/2hJNpmNywJqoOnCPHUtUPuISSii0ngPq0QOnhIutghiJBAEAw6G0F/kB3HBCPLU6HYwVg9WOu68/NiNLvtm915M2rBfG7vze877/edeTPv9x4QEhISspOQ6oKZNlipmt2SXICj6kuJ3smyuYotSmXbCA3sNDXVBjrnoOv34QOdMf77NxAa2ArG5YXSqb2uinUzsOZszMimWj9JeaER2QNFHYTvqlg3A4vOxs9CzGWZCRbbFpecbWL+oop1MzBZ1Iqgw19a1WHJeCMEupx9NomXqnilAWIeLWqDr5s9Rrv/FNVYMt5oQ4yCcdDRvSpgD6s0SgP2ongOwp9Xx4hAYMRMG4PBpFtmTIhpMC46+xg0YEhrQaVRGkgOmXkbIgVC3nG3CIDOIJItS/GTBxG/2UW/7rpJXH+jp2XmFYGvFZnYPl7nc9G2Jjmz5hZUcR0wpPWUCtzKoM/B5ebKKoPuxSjX2tw/sVQpWLkfKCWTSkRpH18Box2EdnD12qogrDOoW8Aedpvzf8s0yKQTswQ+oqN14VOid/KYV5FWKUHgjzq6CmjdU68WYrzQ0rlAxGM6Oi0DOVE3BsKyjlZBlsBaD0XLQIt89wPAAx1tWQj9p+RUVkeqXU6voH4AQEZX/xsCT6yg/qG+3gdTd07uX6+peU/g4vJXdexSWs8SvhH4jJffZim+NjTx+x/mBdnNBJ7wLCZYDDrnJ3kggB2ZIa2FZWo4z0TdVX7YWRC66pdWzial+dXv+IGuptO3T+zOx6JtmMcTrAEobF6IAKgFeC9djYjCmO4HW45gy4FNVEciquNBP/yTm3ovhAZKYZdpyTL48QKdk6Y0DgEYKt0WOnhLxB2GtAIrBgMxkEklomKPfYsF9YJRV2HEPIMGGpaW04cH53J+x/ZtwJLxFpvFYwDHPUrnmCmV7DPH/YyvbSDTlWgQMbuPQZ3QL8sZAs9yqLu5WSB6RsuA2WNchsCj0lMEHywy041knzkS0P1CQkJCtokNvCnsPr+8UXEAAAAASUVORK5CYII="
          }
        />

        {/* <div
          className={clsx(
            "flex  justify-center items-center",
            "rounded-full w-6 h-6 shadow-md",
            position === 1
              ? "bg-[#FFD700] "
              : position === 2
              ? "bg-gray-400 "
              : "bg-[#CD7F32]"
          )}
        >
          <p
            className={clsx(
              "font-serif",
              position === 1
                ? "text-gray-500"
                : position === 2
                ? "text-white"
                : "text-white",
              "text-center text-xs font-semibold"
            )}
          >
            {position === 1 ? `1` : position === 2 ? `2` : `3`}
          </p>
        </div> */}

        <div className="pl-1">
          {/* <p className="text-center font-serif italic font-semibold text-orange-500 text-sm">
            {position === 1 ? `1st` : position === 2 ? `2nd` : `3rd`}
          </p> */}
          <p
            className={clsx(
              "text-center font-serif font-semibold ",
              textBold ? " text-gray-700 text-sm" : " text-gray-500 text-xs"
            )}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Medal;
