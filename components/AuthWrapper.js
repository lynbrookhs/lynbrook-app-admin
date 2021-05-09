import { useRouter } from "next/router";
import { AuthCheck } from "reactfire";

const RedirectLogin = () => {
  const router = useRouter();
  router.replace("/login");
  return null;
};

const AuthWrapper = ({ children }) => (
  <AuthCheck fallback={<RedirectLogin />}>{children}</AuthCheck>
);

export default AuthWrapper;
