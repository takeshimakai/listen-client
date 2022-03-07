import postData from './postData';
import decodeToken from './decodeToken';

const getNewTokensIfExpired = async (token) => {
  try {
    if (decodeToken(token).exp <= Math.floor(Date.now()/1000)) {
      const refreshToken = localStorage.getItem('listenRefreshToken');
    
      const res = await postData('/auth/renew-token', { refreshToken });
  
      if (!res.ok) throw res;

      return await res.json();
    }
  } catch (err) {
    throw err;
  }
}

export default getNewTokensIfExpired;