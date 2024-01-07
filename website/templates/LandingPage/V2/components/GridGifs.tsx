const gifArr = [
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/ezgif.com-gif-maker__1__7yQLe71Wp.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666340676792",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/10_WSu6am6h9.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666336972624",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/8_D1bgxZvES.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666336965993",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/7_Fpd1n2888.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666336961414",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/5_IabqHG4xQ.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666336960317",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/16_AOYeOfV-E.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666336959638",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/ezgif.com-gif-maker__2__qNQ_hyVgi.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666340883670",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/3_FzFm_TM1E.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666336952005",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/ezgif.com-gif-maker_BXqkxYPCR.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666340335102",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/ezgif.com-gif-maker__3__YYMiaPVZv.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666341021104",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/ezgif.com-gif-maker__5__BEx7bdZ_c.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666341283365",
  "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/ezgif.com-gif-maker__4__Fm8uNKM3S.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1666341138321",
];

const GridGifs = () => {
  return (
    <div className="self-end flex-1 md:flex-[0.5] grid gap-2 gifGridArea justify-center md:justify-end auto-cols-[minmax(0,_120px)]">
      {gifArr.map((gif, index) => (
        <div
          key={`gif-area-${index}`}
          className="aspect-w-1 aspect-h-[1.2]  "
          style={{ gridArea: `gif-area-${index + 1}` }}
        >
          <img src={gif} alt="" className="w-full h-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
};

export default GridGifs;
