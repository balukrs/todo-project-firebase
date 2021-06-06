import moment from "moment";

export const filterDays = (arr) => {
  // eslint-disable-next-line
  const filtered = arr.filter((item) => {
    const itemtime = moment(item.date.toDate());
    const currenttime = moment();
    const diff = currenttime.diff(itemtime, "days");
    if (diff >= -6 && diff < 0) {
      return item;
    }
  });
  return filtered;
};

export const filterToday = (arr) => {
  // eslint-disable-next-line
  const filtered = arr.filter((item) => {
    const itemtime = moment(item.date.toDate());
    const currenttime = moment();
    const diff = currenttime.diff(itemtime, "days");
    if (diff === 0) {
      return item;
    }
  });
  return filtered;
};
