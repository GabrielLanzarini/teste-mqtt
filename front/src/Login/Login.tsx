import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const handleCredentials = (e: any) =>
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async () => {
    const { email, password } = credentials;
    try {
      await signIn(email, password);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex-col gap-4 flex items-center justify-center h-[500px] w-[500px] ">
        <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">Login</h2>
        <Input value={credentials.email} id="email" onChange={handleCredentials} />
        <Input value={credentials.password} id="password" onChange={handleCredentials} />
        <Button onClick={handleSubmit} className="w-[300px]">
          Entrar
        </Button>
      </div>
    </div>
  );
};

export default Login;
