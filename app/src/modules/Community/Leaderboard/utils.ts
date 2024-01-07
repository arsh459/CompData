export const getNextUpdateTime = () => {
  const date = new Date();
  const mins = date.getMinutes();
  const hours = date.getHours();

  if (mins < 30) {
    return `${date.getHours()}:30`;
  } else {
    return `${hours !== 23 ? hours + 1 : "00"}:00`;
  }
};

export const getBorderColor = (rank: number) => {
  if (rank === 1) {
    return "#E5CE91";
  } else if (rank === 2) {
    return "#D3D3D4";
  } else if (rank === 3) {
    return "#C7867A";
  } else {
    return "";
  }
};
