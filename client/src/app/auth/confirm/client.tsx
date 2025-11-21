"use client";
import { EmailConfirmationParams } from "@/@types/auth";
import { AuthService } from "@/api/services/auth.service";
import {
  setAccessToken,
  setUserDataRefresh,
} from "@/redux/reducers/user/slice";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React from "react";

const AuthConfirmClient = ({ token }: EmailConfirmationParams) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    AuthService.confirm({ token })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAccessToken(res.data.accessToken));
          dispatch(setUserDataRefresh(true));
          router.push("/");
        }
      })
      .catch(() => router.push("/"));
  }, [token, dispatch, router]);

  return "";
};

export default AuthConfirmClient;
