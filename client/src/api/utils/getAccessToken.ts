import { setAccessToken } from "@/redux/reducers/user/slice";
import { store } from "@/redux/store";
import { AuthService } from "../services/auth.service";
import type { AccessToken } from "@/@types/user";

function isTokenExpired(token: AccessToken): boolean {
  const LIFE_TIME_TO_UPDATE_MULTIPLIER = 0.5;
  if (!token) {
    return true;
  }

  try {
    const tokenInfo = token.split(".")[1];
    const tokenInfoDecoded = window.atob(tokenInfo);
    const { exp, iat }: { exp: number; iat: number } =
      JSON.parse(tokenInfoDecoded);
    const tokenLeftTime = exp - Math.round(+new Date() / 1000);
    const minLifeTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE_MULTIPLIER;
    return tokenLeftTime < minLifeTimeForUpdate;
  } catch (e: any) {
    return true;
  }
}

let cachedAccessToken: AccessToken = null;
let isRefreshingToken = false;

type TokenQueueItem = {
  resolve: (token: AccessToken) => void;
  reject: (error: unknown) => void;
};

const tokenRefreshQueue: TokenQueueItem[] = [];

async function refreshAccessToken(): Promise<AccessToken> {
  if (isRefreshingToken) {
    return new Promise((resolve, reject) => {
      tokenRefreshQueue.push({ resolve, reject });
    });
  }

  isRefreshingToken = true;

  try {
    const { data } = await AuthService.refreshToken();
    cachedAccessToken = data.accessToken;
    store.dispatch(setAccessToken(data.accessToken));

    while (tokenRefreshQueue.length) {
      const { resolve } = tokenRefreshQueue.shift()!;
      resolve(cachedAccessToken);
    }
  } catch (error) {
    while (tokenRefreshQueue.length) {
      const { reject } = tokenRefreshQueue.shift()!;
      reject(error);
    }
  } finally {
    isRefreshingToken = false;
  }

  return cachedAccessToken;
}

export default async function getAccessToken(): Promise<AccessToken> {
  try {
    const accessToken: AccessToken = store.getState().user.accessToken;
    if (!accessToken || isTokenExpired(accessToken)) {
      return refreshAccessToken();
    }
    return accessToken;
  } catch (e: any) {
    return null;
  }
}
