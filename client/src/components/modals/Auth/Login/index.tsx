import { LoginFormValues } from "@/@types/auth";
import { AuthService } from "@/api/services/auth.service";
import getApiMessage from "@/api/utils/getApiMessage";
import Modal from "@/components/ui/Modal";
import { setMessage, setModal } from "@/redux/reducers/ui/slice";
import {
  setAccessToken,
  setUserDataRefresh,
} from "@/redux/reducers/user/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Field, Form, Formik } from "formik";

const LoginModal = () => {
  const initialValues: LoginFormValues = { username: "", password: "" };
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.ui.modal.loginModal);

  const onRequestClose = () => {
    dispatch(setModal({ modal: "loginModal", modalState: { isOpen: false } }));
  };

  const onSubmit = (values: LoginFormValues) => {
    if (!values.username || !values.password) return;
    AuthService.login(values)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAccessToken(res.data.accessToken));
          dispatch(setUserDataRefresh(true));

          dispatch(setMessage({ text: "Successfully", status: true }));
          onRequestClose();
        }
      })
      .catch((error) => {
        const msg = getApiMessage(error.response);

        if (msg) {
          dispatch(setMessage(msg));
        }
      });
  };

  return (
    <Modal title="Log in" onRequestClose={onRequestClose} isOpen={isOpen}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="flex flex-col gap-2">
          <Field
            name="username"
            type="text"
            placeholder="Username or email address"
            className="placeholder:text-[16.5px] text-[16.5px] bg-stone-800 focus:outline-none px-5 h-11 w-full rounded-xl"
          />

          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="placeholder:text-[16.5px] text-[16.5px] bg-stone-800 focus:outline-none px-5 h-11 w-full rounded-xl"
          />

          <button className="text-[16.4px] cursor-pointer hover:bg-blue-400 transition-colors bg-blue-500 w-full h-10.5 rounded-xl mt-2 font-medium">
            Log in
          </button>
        </Form>
      </Formik>

      <div className="text-center mt-5 font-bold text-white">
        Don’t have an account?{" "}
        <button
          className="text-blue-400"
          onClick={() =>
            dispatch(
              setModal({ modal: "signupModal", modalState: { isOpen: true } })
            )
          }
        >
          Sign Up
        </button>
      </div>
    </Modal>
  );
};

export default LoginModal;
