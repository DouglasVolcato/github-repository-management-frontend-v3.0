import { useEffect, useState } from "react";
import { Form } from "../components/Form";
import { PageTitle } from "../components/PageTitle";
import { useClient } from "../hooks/useClient";
import { LoginUserBody } from "../protocols/loginUserBody";
import { Api } from "../utils/api";

export function Login() {
  const { addAllNotes } = useClient();
  const [loginInfo, setLoginInfo] = useState<LoginUserBody>({
    email: "",
    password: "",
  });

  async function makeLogin() {
    await Api.makeLogin(loginInfo);
  }

  useEffect(() => {
    addAllNotes();
  }, []);

  return (
    <div className="Login">
      <PageTitle name={"Login"} />
      <Form
        state={loginInfo}
        setStateFunction={setLoginInfo}
        buttonName={"Submit"}
        buttonFunction={() => makeLogin()}
      />
    </div>
  );
}
