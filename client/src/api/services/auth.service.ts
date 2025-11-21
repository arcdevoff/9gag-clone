import axios from "../axios";
import { setAccessToken, setUserData } from "@/redux/reducers/user/slice";
import { store } from "@/redux/store";
import type {
  EmailConfirmationParams,
  LoginFormValues,
  LoginResponse,
  SignupFormValues,
  SignupResponse,
} from "@/@types/auth";

export const AuthService = {
  async login(values: LoginFormValues) {
    const res = await axios.post("/auth/login", { ...values });
    return res;
  },

  async signup(values: SignupFormValues) {
    const res = await axios.post<SignupResponse>("/auth/signup", values);
    return res;
  },

  async confirm({ token }: EmailConfirmationParams) {
    const res = await axios.post("/auth/confirm", { token });
    return res;
  },

  async refreshToken() {
    const res = await axios.get<LoginResponse>("/auth/refresh");
    return res;
  },

  async logout() {
    const res = await axios.post("/auth/logout");
    store.dispatch(setAccessToken(null));
    store.dispatch(setUserData(null));
    return res;
  },
};
