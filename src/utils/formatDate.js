const formatDate = (date) => {
  const formatted = new Date(date);
  let dd = formatted.getUTCDate();
  let mm = formatted.getMonth() + 1;
  const year = formatted.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  
  return `${year}-${mm}-${dd}`;
}

export default formatDate;