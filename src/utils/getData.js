const getData = async (path, token) => {
  try {
    return await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
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