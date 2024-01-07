interface Props {
  dos?: string[];
  donts?: string[];
}

const DosDonts: React.FC<Props> = ({ donts, dos }) => {
  return (
    <>
      {donts && dos ? (
        <div className="bg-[#343150] rounded-2xl mx-4">
          <p className="text-white p-4">✅Do’s and ❌ don’t</p>
          <div className="h-px w-full bg-[#FFFFFF33]" />
          <div className="p-4">
            {dos?.map((i, index) => (
              <p className="text-xs pb-2.5 " key={`${i}_${index}`}>
                ✅{" "}
                <p
                  className="text-[#FFFFFF99] "
                  style={{ fontFamily: "Nunito-Bold" }}
                >
                  {i}
                </p>
              </p>
            ))}
          </div>
          <div className="h-px w-full bg-[#FFFFFF33]" />
          <div className="p-4">
            {donts?.map((i, index) => (
              <p
                className="text-xs pb-2.5 text-[#FFFFFF99]"
                key={`${i}_${index}`}
              >
                ❌ <p className="text-[#FFFFFF99]">{i}</p>
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DosDonts;
