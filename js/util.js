export const WEEKEND_TIMES = generateTimes(12, 22);
export const WEEK_TIMES = generateTimes(10, 20);

export const getTimesForDay = (day) => {
  if (day == "saturday" || day == "sunday") {
    return WEEKEND_TIMES;
  } else {
    return WEEK_TIMES;
  }
};

function generateTimes(from, to) {
  const times = [];
  for (let i = from; i < to; i += 2) {
    times.push({
      label: `${i}:00 - ${i + 2}:00`,
      value: i,
    });
  }
  return times;
}

function formatTimes(times) {
  return times.map((time) => `${time}:00 - ${time + 2}:00`);
}
