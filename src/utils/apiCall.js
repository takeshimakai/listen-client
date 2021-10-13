const apiCall = async (url, method, data, token) => {
  try {
    const res = await fetch(
      url,
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