const putDataWithFile = async (path, data, token) => {
  try {
    const formData = new FormData();

    for (let name in data) {
      if (Array.isArray(data[name])) {
        data[name].forEach(i => formData.append(name, i));
      } else {
        formData.append(name, data[name]);
      }
    };

    return await fetch(process.env.REACT_APP_API_URL + path, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
  } catch (err) {
    console.log(err);
  }
}

export default putDataWithFile;