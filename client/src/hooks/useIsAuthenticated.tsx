import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";

export function useIsAuthenticated() {
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  return { isAuthenticated };
}
