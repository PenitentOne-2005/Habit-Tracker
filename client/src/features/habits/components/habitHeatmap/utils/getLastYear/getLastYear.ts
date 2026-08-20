export const getLastYear = () => {
  const days = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);

    d.setDate(today.getDate() - i);
    days.push(d);
  }

  return days;
};
