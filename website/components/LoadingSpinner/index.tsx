const LoadingSpinner = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative w-20 aspect-1 rounded-full flex items-center justify-center">
        <img
          src="https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector_FCnyW1k8A.png?updatedAt=1684739567110"
          className="absolute left-0 top-0 right-0 bottom-0 object-contain animate-spin"
          alt="loader outer image"
        />

        <img
          src="https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Vector__1__VgfKcPlMp.png?updatedAt=1684739567112"
          className="w-3/5 h-3/5 object-contain animate-[spin_1s_linear_infinite_reverse]"
          alt="loader inner image"
        />
      </div>

      <p
        className="text-base text-center text-white pt-5"
        style={{ fontFamily: "Nunito-Regular" }}
      >
        Saving
      </p>
    </div>
  );
};

export default LoadingSpinner;
