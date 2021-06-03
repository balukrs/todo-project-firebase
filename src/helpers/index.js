import moment from "moment";

export const filterDays = (arr) => {
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
