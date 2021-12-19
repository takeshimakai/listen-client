const sanitizeStr = (str) => {
  return str.replace(/[^a-z\s]/gi, '').trim().replace(/\s+/g, ' ');
};

export default sanitizeStr;