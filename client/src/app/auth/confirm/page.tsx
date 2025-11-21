import AuthConfirmClient from "./client";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

const AuthConfirmPage = async ({ searchParams }: Props) => {
  const token = (await searchParams).token;

  if (!token) {
    return <div>Invalid confirmation link.</div>;
  }

  return <AuthConfirmClient token={token} />;
};

export default AuthConfirmPage;
