import postData from './postData';

const clearTokens = async (setToken, userId) => {
  try {
    if (userId) {
      await postData('/auth/signout', { userId });
    }
    
    localStorage.removeItem('listenRefreshToken');
    localStorage.removeItem('listenToken');
    setToken('');
  } catch (err) {
    console.log(err);
  }
}

export default clearTokens;