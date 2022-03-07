const updateTokens = (token, refreshToken, setToken) => {
  localStorage.setItem('listenToken', JSON.stringify(token));
  localStorage.setItem('listenRefreshToken', refreshToken);
  setToken(token);
}

export default updateTokens;