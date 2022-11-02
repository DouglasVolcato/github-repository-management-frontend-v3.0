import { useState } from "react";
import { Form } from "../components/Form";
import { PageTitle } from "../components/PageTitle";
import { Api } from "../utils/api";

export function Register() {
  const [registrationInfo, setRegistrationInfo] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  async function registrate() {
    await Api.makeRegistration(registrationInfo);
  }

  return (
    <div className="Register">
      <PageTitle name={"Register"} />
      <Form
        state={registrationInfo}
        setStateFunction={setRegistrationInfo}
        buttonName={"Submit"}
        buttonFunction={() => registrate()}
      />
    </div>
  );
}
