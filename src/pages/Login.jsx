import { useState } from "react";
import SendOTP from "../components/login/SendOTP";
import VerifyOTP from "../components/login/VerifyOTP";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(null);
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  return (
    <div>
      {!email ? (
        <SendOTP onSuccess={(email) => setEmail(email)} redirectPath={redirectPath} />
      ) : (
        <VerifyOTP email={email} redirectPath={redirectPath} />
      )}
    </div>
  );
};

export default Login;
