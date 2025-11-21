import type { AccessToken } from "./user";

export type SignupFormValues = {
  email: string;
  username: string;
  password: string;
};

export type SignupResponse = {
  accessToken: AccessToken;
};

export type LoginFormValues = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: AccessToken;
};

export interface EmailConfirmationParams {
  token: string;
}
