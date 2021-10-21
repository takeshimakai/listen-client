const getData = async (path, token) => {
  try {
    return await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  } catch (err) {
    console.log(err);
  }
}

export default getData;