import { useState } from "react";
import { Form } from "../components/Form";
import { PageTitle } from "../components/PageTitle";
import { LoginUserBody } from "../protocols/loginUserBody";
import { Api } from "../utils/api";

export function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginUserBody>({
    email: "",
    password: "",
  });

  async function makeLogin() {
    await Api.makeLogin(loginInfo);
  }

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
