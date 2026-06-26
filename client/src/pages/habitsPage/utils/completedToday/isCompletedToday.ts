const isCompletedToday = (lastCompletedAt: string | null) => {
  if (!lastCompletedAt) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const last = new Date(lastCompletedAt);
  last.setHours(0, 0, 0, 0);

  return today.getTime() === last.getTime();
};

export default isCompletedToday;
