const convertArrToStr = (arr) => {
  return arr.join().toLowerCase().replace(/,/g, ', ');
}

export default convertArrToStr;