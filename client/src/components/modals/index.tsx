"use client";
import EmailConfirmationModal from "./Auth/EmailConfirmation";
import LoginModal from "./Auth/Login";
import SignupModal from "./Auth/Signup";
import PostCreateModal from "./Post/Create";

const Modals = () => {
  return (
    <>
      <LoginModal />
      <SignupModal />
      <EmailConfirmationModal />
      <PostCreateModal />
    </>
  );
};

export default Modals;
