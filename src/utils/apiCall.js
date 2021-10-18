const apiCall = async (path, method, data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}${path}`,
      {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    return res;
  } catch (err) {
    console.log(err);
  }
}

export default apiCall;