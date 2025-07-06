import { createGStore } from 'create-gstore';
import { jwtDecode } from 'jwt-decode';

import { useMemo, useState } from 'react';
import { publicFetchClient } from '@/shared/api/instance';

export type Session = {
  userId: string;
  email: string;
  exp: number;
  iat: number;
};

let refreshTokenPromise: Promise<string | null> | null = null;

const TOKEN_KEY = 'token';

export const useSession = createGStore(() => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const updateToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  const session = useMemo(
    () => (!token ? null : jwtDecode<Session>(token)),
    [token]
  );

  const refreshToken = async () => {
    if (!token) {
      return null;
    }

    const res = jwtDecode<{ exp: number }>(token);

    if (res.exp < Date.now() / 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = publicFetchClient
          .POST('/auth/refresh')
          .then((res) => res.data?.accessToken ?? null)
          .then((newToken) => {
            if (newToken) {
              updateToken(newToken);
              return newToken;
            } else {
              removeToken();
              return null;
            }
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }

      const newToken = await refreshTokenPromise;

      if (newToken) {
        return newToken;
      } else {
        return null;
      }
    }

    return token;
  };

  return {
    session,
    refreshToken,
    logout: removeToken,
    login: updateToken,
  };
});
