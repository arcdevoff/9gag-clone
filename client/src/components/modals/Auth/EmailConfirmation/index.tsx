import Modal from "@/components/ui/Modal";
import { setModal } from "@/redux/reducers/ui/slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

const EmailConfirmationModal = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(
    (state) => state.ui.modal.emailConfirmationModal
  );

  const onRequestClose = () => {
    dispatch(
      setModal({
        modal: "emailConfirmationModal",
        modalState: { isOpen: false },
      })
    );
  };

  return (
    <Modal
      title="Confirm your email"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="text-center">
        <div className="font-semibold text-xl mb-3">
          🎉 Registration successful! 🎉
        </div>
        <div>
          Please check your email and click the confirmation link to activate
          your account.
        </div>
      </div>
    </Modal>
  );
};

export default EmailConfirmationModal;
