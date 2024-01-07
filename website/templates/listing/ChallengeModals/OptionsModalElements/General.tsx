interface Props {
  // onClick: () => void;
}

const pointers = [
  {
    heading: "Win rewards",
    text: "Access to game & community",
    key: "access",
  },
  //   {
  //     heading: "Connected fitness",
  //     text: "Connect wearables",
  //     key: "wearables",
  //   },
  //   {
  //     heading: "Community",
  //     text: "Consult your coach",
  //     key: "community",
  //   },
  //   {
  //     heading: "Community learning",
  //     text: "Participate in discussions & interact with coach",
  //     key: "community",
  //   },
];

const General: React.FC<Props> = ({}) => {
  return (
    <div>
      <div className="flex flex-wrap pt-0">
        {pointers.map((item) => {
          return (
            <div key={item.key} className="w-full text-center">
              <p className="text-gray-700 text-sm font-semibold">
                {item.heading}
              </p>
              <p className="text-sm text-gray-500">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default General;
