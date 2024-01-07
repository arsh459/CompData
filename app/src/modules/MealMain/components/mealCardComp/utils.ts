export const getInitialArr = (
  qty: number,
  defaultValue: number,
  setQtyArr: (qtyArr: number[]) => void,
  qtyStep: number
) => {
  const result: number[] = [];
  let index = 0;
  for (let i = 0; i < Math.ceil(qty / qtyStep); i++) {
    result.push(i * qtyStep);
    if (i * qtyStep <= defaultValue) {
      index = i;
    }
  }

  for (
    let i = Math.ceil(qty / qtyStep);
    i < 6 + Math.ceil(qty / qtyStep);
    i++
  ) {
    result.push(i * qtyStep);
  }

  if (result[index] !== defaultValue && result[index + 1] !== defaultValue) {
    result.splice(index + 1, 0, defaultValue);
  }

  setQtyArr(result);
};
