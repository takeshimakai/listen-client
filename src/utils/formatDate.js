const formatDate = (date) => {
  const formatted = new Date(date);
  let dd = formatted.getDate().toString();
  let mm = (formatted.getMonth()+1).toString();
  const year = formatted.getFullYear().toString();

  if (dd.length < 2) {
    dd = `0${dd}`;
  }

  if (mm.length < 2) {
    mm = `0${mm}`;
  }
  
  return `${dd}-${mm}-${year}`;
}

export default formatDate;