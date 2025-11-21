"use client";

import { useEffect, useState } from "react";

export function useCookies() {
  const [cookies, setCookies] = useState<Record<string, string>>({});

  useEffect(() => {
    const cookieObj: Record<string, string> = {};
    document.cookie.split(";").forEach((cookie) => {
      const [key, value] = cookie.split("=").map((c) => c.trim());
      if (key && value) cookieObj[key] = decodeURIComponent(value);
    });
    setCookies(cookieObj);
  }, []);

  return cookies;
}
