import { useState } from "react";
import { Form } from "../components/Form";
import { PageTitle } from "../components/PageTitle";

export function Login() {
  const [loginInfo, setLoginInfo] = useState({
    Email: "",
    Password: "",
  });

  function makeLogin() {
    alert(loginInfo.Email + " " + loginInfo.Password);
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
