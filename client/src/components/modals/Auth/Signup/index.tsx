import { SignupFormValues } from "@/@types/auth";
import { AuthService } from "@/api/services/auth.service";
import getApiMessage from "@/api/utils/getApiMessage";
import Modal from "@/components/ui/Modal";
import { setMessage, setModal } from "@/redux/reducers/ui/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Field, Form, Formik } from "formik";

const SignupModal = () => {
  const initialValues: SignupFormValues = {
    username: "",
    email: "",
    password: "",
  };
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.ui.modal.signupModal);

  const onRequestClose = () => {
    dispatch(setModal({ modal: "signupModal", modalState: { isOpen: false } }));
  };

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const res = await AuthService.signup(values);

      if (res.status === 201) {
        dispatch(
          setModal({
            modal: "emailConfirmationModal",
            modalState: { isOpen: true },
          })
        );
      }
    } catch (error: any) {
      const msg = getApiMessage(error.response);

      if (msg) {
        dispatch(setMessage(msg));
      }
    }
  };

  return (
    <Modal title="Sign up" onRequestClose={onRequestClose} isOpen={isOpen}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-2">
            <Field
              name="email"
              type="email"
              placeholder="Email address"
              className="placeholder:text-[16.5px] text-[16.5px] bg-stone-800 focus:outline-none px-5 h-11 w-full rounded-xl"
            />

            <Field
              name="username"
              type="text"
              placeholder="Username"
              className="placeholder:text-[16.5px] text-[16.5px] bg-stone-800 focus:outline-none px-5 h-11 w-full rounded-xl"
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="placeholder:text-[16.5px] text-[16.5px] bg-stone-800 focus:outline-none px-5 h-11 w-full rounded-xl"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-2 w-full h-10.5 rounded-xl font-medium ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed!"
                  : "bg-blue-500 hover:bg-blue-400"
              }`}
            >
              {isSubmitting ? "Loading..." : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>

      <div className="text-center mt-5 font-bold text-white">
        Already a member?{" "}
        <button
          className="text-blue-400"
          onClick={() =>
            dispatch(
              setModal({ modal: "loginModal", modalState: { isOpen: true } })
            )
          }
        >
          Log in
        </button>
      </div>
    </Modal>
  );
};

export default SignupModal;
