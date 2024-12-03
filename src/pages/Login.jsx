import { useState } from "react";
import SendOTP from "../components/login/SendOTP";
import VerifyOTP from "../components/login/VerifyOTP";

const Login = () => {
  const [email, setEmail] = useState(null);

  return (
    <div>
      {!email ? (
        <SendOTP onSuccess={(email) => setEmail(email)} />
      ) : (
        <VerifyOTP email={email} />
      )}
    </div>
  );
};

export default Login;
