import { useState } from "react";
import { Form } from "../components/Form";
import { PageTitle } from "../components/PageTitle";

export function Register() {
  const [registrationInfo, setRegistrationInfo] = useState({
    Name: "",
    Email: "",
    Password: "",
    Image: "",
  });

  function registrate() {
    alert(
      registrationInfo.Name +
        " " +
        registrationInfo.Email +
        " " +
        registrationInfo.Password +
        " " +
        registrationInfo.Image
    );
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
