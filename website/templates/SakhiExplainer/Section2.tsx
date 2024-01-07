const Section2 = () => {
  return (
    <div className="snap-center h-screen flex justify-center items-center relative z-0">
      <div className="absolute left-0 right-0 top-0 bottom-0 -z-10">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-1500,c-maintain_ratio,f-auto/Group_1000001027_VCBQ2yPyXS.png?updatedAt=1689671480740"
          className="w-[1500px] lg:w-full h-full object-cover lg:object-contain"
        />
      </div>

      <div className="relative z-10">
        <p
          className="md:w-2/3 mx-auto text-white text-center text-4xl leading-9 p-4 iphoneX:p-8"
          style={{ fontFamily: "Canela-Light" }}
        >
          Get Curated
          <span style={{ fontFamily: "BaiJamjuree-Bold" }}> Workout </span>and
          <span style={{ fontFamily: "BaiJamjuree-Bold" }}> Diet </span>
          Plan according to your period cycle
        </p>

        <div className="absolute left-0 bottom-full">
          <img
            src="https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,f-auto/unsplash_BKSntHf8oiU__1__N_aCmfH57A.png?updatedAt=1684322342190"
            className="w-48 aspect-[200/160] object-contain"
          />
        </div>
      </div>

      <div className="absolute right-0 bottom-0 flex justify-end">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-500,c-maintain_ratio,f-auto/walter-lee-olivares-de-la-cruz-9S44Zk3pZyc-unsplash_1_2VIQMVoFiq.png?updatedAt=1684322342194"
          className="w-5/12 aspect-[209/369] object-contain"
        />
      </div>
    </div>
  );
};

export default Section2;
