import React from "react";

const GifGrid = () => {
  return (
    <div
      className="flex-1 w-full h-full "
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(5, 1fr)",
        gridColumnGap: "8px",
        gridRowGap: "8px",
      }}
    >
      <div className="div1 bg-red-400" style={{ gridArea: 1 / 1 / 2 / 2 }}>
        {" "}
      </div>
      <div className="div2 bg-red-400" style={{ gridArea: 2 / 1 / 3 / 2 }}>
        {" "}
      </div>
      <div className="div3 bg-red-400" style={{ gridArea: 3 / 1 / 4 / 2 }}>
        <div className="div4 bg-red-400" style={{ gridArea: 2 / 2 / 3 / 3 }}>
          {" "}
        </div>{" "}
      </div>
      <div className="div5 bg-red-400" style={{ gridArea: 2 / 3 / 3 / 4 }}>
        {" "}
      </div>
      <div className="div6 bg-red-400" style={{ gridArea: 3 / 2 / 4 / 3 }}>
        {" "}
      </div>
      <div className="div7 bg-red-400" style={{ gridArea: 3 / 3 / 4 / 4 }}>
        {" "}
      </div>
      <div className="div8 bg-red-400" style={{ gridArea: 3 / 4 / 4 / 5 }}>
        {" "}
      </div>
      <div className="div9 bg-red-400" style={{ gridArea: 4 / 2 / 5 / 3 }}>
        {" "}
      </div>
      <div className="div10 bg-red-400" style={{ gridArea: 4 / 3 / 5 / 4 }}>
        {" "}
      </div>
      <div className="div11 bg-red-400" style={{ gridArea: 4 / 4 / 5 / 5 }}>
        {" "}
      </div>
      <div className="div12 bg-red-400" style={{ gridArea: 5 / 4 / 6 / 5 }}>
        {" "}
      </div>
    </div>
  );
};

export default GifGrid;
