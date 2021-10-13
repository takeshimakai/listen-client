const setErrMsgs = (errors) => {
  let errMsgs;
  errors.forEach(err => {
    const { param, msg } = err;
    errMsgs = {
      ...errMsgs,
      [param]: msg
    }
  });
  return errMsgs;
}

export default setErrMsgs;