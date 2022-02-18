import formatDate from './formatDate';

const displayTimeOrDate = (date) => {
  const sentDate = new Date(date);
  const today = new Date();

  if (
    sentDate.getFullYear() === today.getFullYear() &&
    sentDate.getMonth() === today.getMonth() &&
    sentDate.getDate() === today.getDate()
  ) {
    return sentDate.toLocaleTimeString()
  } else {
    return formatDate(sentDate);
  }
};

export default displayTimeOrDate;