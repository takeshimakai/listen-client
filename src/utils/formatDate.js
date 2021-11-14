const formatDate = (date) => {
  const formatted = new Date(date.replace(/-/g, '/').replace(/T.+/, ''));
  let dd = formatted.getDate().toString();
  let mm = (formatted.getMonth()+1).toString();
  const year = formatted.getFullYear().toString();

  if (dd.length < 2) {
    dd = `0${dd}`;
  }

  if (mm.length < 2) {
    mm = `0${mm}`;
  }
  
  return `${year}-${mm}-${dd}`;
}

export default formatDate;