let accessToken = null;

const getAccessToken = () => {
  return accessToken;
};

const setAccessToken = (token) => {
  accessToken = token;
};

const clearAccessToken = () => {
  accessToken = null;
};

export { getAccessToken, setAccessToken, clearAccessToken };
