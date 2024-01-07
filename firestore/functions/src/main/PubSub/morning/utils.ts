export const formatWithCommas = (x: string | number | undefined) =>
  typeof x === "number" || typeof x === "string"
    ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
