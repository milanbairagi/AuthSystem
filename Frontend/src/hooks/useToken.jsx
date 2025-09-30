import { useState } from "react";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const useToken = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const setTokens = (access, refresh) => {
    if (access) {
      localStorage.setItem(ACCESS_TOKEN, access);
      setAccessToken(access);
    }
    if (refresh) {
      localStorage.setItem(REFRESH_TOKEN, refresh);
      setRefreshToken(refresh);
    }
  };

  const clearToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);
  };

  return {
    accessToken,
    refreshToken,
    setTokens,
    clearToken,
  };
};

export default useToken;
