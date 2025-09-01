export const translateDate = (orderDate: Date) : string => {
  const date = new Date(orderDate);

  const fullDate = `${date.toLocaleDateString()} г. в ${date.toLocaleTimeString().slice(0, -3)}`;

  return fullDate;
};
