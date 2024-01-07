const gifArr = [
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__6__YKnZ2Drp7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846879880",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__9__xs6BD8x_U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880491",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__8__blhkzn3W-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846884611",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__7__hitPtUBbR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670847017383",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__11__Y3qpAc3bB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880735",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__10__cMAK7NUfIA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846882254",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__12__jPw_R4cfaP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880345",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__13__5SAPCak9O.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880404",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__14__7CqeZOfPTv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880595",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__15__wjRpbOMD1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880140",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__16__l1OT3iXvL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880527",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group__17__a0GvOyeCak.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670846880646",
];

const GridImages = () => {
  return (
    <div className="h-full lg:h-max grid gap-1 lg:gap-2 gifGridArea justify-center auto-rows-[minmax(0,_120px)]">
      {gifArr.map((gif, index) => (
        <div
          key={`gif-area-${index}`}
          className="h-full aspect-[0.85]"
          style={{ gridArea: `gif-area-${index + 1}` }}
        >
          <img
            src={gif}
            alt={`grid image-${index + 1} of fit user`}
            className="w-full h-full rounded-xl md:rounded-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default GridImages;
