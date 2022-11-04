import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CardBody } from "../components/CardBody";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { PageTitle } from "../components/PageTitle";
import { Text } from "../components/Text";
import { UserImage } from "../components/UserImage";
import { useClient } from "../hooks/useClient";
import { LoginUserBody } from "../protocols/loginUserBody";
import { Api } from "../utils/api";

export function Login() {
  const { getUser, setLoggedUser, addAllNotes } = useClient();
  const [loginInfo, setLoginInfo] = useState<LoginUserBody>({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<any>(getUser());
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);

  const [openSecurityModal, setOpenSecurityModal] = useState<boolean>(false);
  const [securityKeys, setSecurityKeys] = useState({
    key_1: "",
    reference_1: "",
    key_2: "",
    reference_2: "",
    key_3: "",
    reference_3: "",
  });

  const [references, setReferences] = useState<string[]>([]);
  const [passwordRecoveryModal, setPasswordRecoveryModal] =
    useState<boolean>(false);
  const [passwordRecoveryEmail, setPasswordRecoveryEmail] = useState({
    email: "",
  });
  const [securityKeyReferences, setSecurityKeyReferences] = useState<string[]>(
    []
  );
  const [receivedKeys, setreceivedKeys] = useState({
    key_1: "",
    key_2: "",
    key_3: "",
    new_password: "",
  });

  useEffect(() => {
    setLoggedUser();
    addAllNotes();
    Api.getUserById().then((data) => {
      setUser({
        name: data.name,
        email: data.email,
        password: "",
        photo: data.photo,
      });
      Api.getKeyReferences(data.email).then((data) => {
        setReferences(data);
      });
    });
  }, []);

  async function setKeyReferences() {
    try {
      const references = await Api.getKeyReferences(
        passwordRecoveryEmail.email
      );
      setSecurityKeyReferences(references);
    } catch (error) {
      setSecurityKeyReferences([]);
    }
  }

  async function makeLogin() {
    if (
      loginInfo.email &&
      loginInfo.password &&
      loginInfo.password.length >= 6
    ) {
      await Api.makeLogin(loginInfo)
        .then(() => {
          Api.getUserById().then((data) =>
            setUser({
              name: data.name,
              email: data.email,
              password: "",
              photo: data.photo,
            })
          );
          setLoggedUser();
          alert("Successfully logged in!");
        })
        .catch((err) => {
          setLoggedUser();
          setUser({ name: "", email: "", password: "", photo: "" });
          alert("There was an error during login.");
        });
    } else {
      alert("Invalid login credentials.");
    }
  }

  async function createSecurityKeys() {
    const response = await Api.createSecurityKeys(user.email, [
      { key: securityKeys.key_1, reference: securityKeys.reference_1 },
      { key: securityKeys.key_2, reference: securityKeys.reference_2 },
      { key: securityKeys.key_3, reference: securityKeys.reference_3 },
    ]);
    if (response) {
      window.location.reload();
    }
  }

  async function recoverPassword() {
    const response = await Api.passwordRecovery(
      passwordRecoveryEmail.email,
      receivedKeys.new_password,
      [receivedKeys.key_1, receivedKeys.key_2, receivedKeys.key_3]
    );
    return response;
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

      {user.name ? (
        <>
          <CardBody>
            <Button
              name={"Logged as " + user?.name}
              onClickFunctions={[() => setOpenUserModal(true)]}
              color={"darkgreen"}
              borderColor={"gold"}
            />
          </CardBody>
          {references.length === 0 ? (
            <CardBody>
              <Button
                name="Enable extra security"
                onClickFunctions={[() => setOpenSecurityModal(true)]}
                color={"blue"}
                borderColor={"gray"}
              />
            </CardBody>
          ) : (
            <CardBody>
              <Button
                name="Extra security enabled"
                onClickFunctions={[() => {}]}
                color={"black"}
                borderColor={"gold"}
              />
            </CardBody>
          )}
        </>
      ) : (
        <CardBody>
          <Button
            name="Forgot your password?"
            onClickFunctions={[() => setPasswordRecoveryModal(true)]}
            color={"blue"}
            borderColor={"yellow"}
          />
          <PageTitle name={"Make login to access the Notes"} />
        </CardBody>
      )}

      {openUserModal && (
        <Modal>
          {user.photo !== "" && <UserImage link={user.photo} />}
          <Form
            state={user}
            setStateFunction={setUser}
            buttonName={"Update"}
            buttonFunction={() => {
              Api.editUser(user).then(() => window.location.reload());
            }}
            secondButtonName={"Delete"}
            secondButtonFunction={() => {
              if (window.confirm("Are you sure to delete your profile?")) {
                Api.deleteUser().then(() => window.location.reload());
              }
            }}
            secondButtonColor={"darkred"}
            thirdButtonName={"X"}
            thirdButtonFunction={() => setOpenUserModal(false)}
            thirdButtonColor={"grey"}
          />
        </Modal>
      )}

      {openSecurityModal && (
        <Modal>
          <Text
            name="This extra security is used in case you forget your password. Submit
  3 keys with references for you to remember them."
          />

          <Form
            state={securityKeys}
            setStateFunction={setSecurityKeys}
            buttonName={"Submit"}
            buttonFunction={() => createSecurityKeys()}
            secondButtonName={"Close"}
            secondButtonFunction={() => setOpenSecurityModal(false)}
            secondButtonColor={"grey"}
          />
        </Modal>
      )}

      {passwordRecoveryModal && (
        <Modal>
          <Form
            state={passwordRecoveryEmail}
            setStateFunction={setPasswordRecoveryEmail}
            buttonName={"Search"}
            buttonFunction={() => setKeyReferences()}
            buttonColor={"blue"}
            secondButtonName={"Close"}
            secondButtonFunction={() => setPasswordRecoveryModal(false)}
            secondButtonColor={"gray"}
          />
          {securityKeyReferences.length > 0 && (
            <>
              <Text
                name={
                  "Your security key references are, respectively: " +
                  securityKeyReferences[0] +
                  ", " +
                  securityKeyReferences[1] +
                  ", " +
                  securityKeyReferences[2] +
                  "."
                }
              />
              <Text name="Enter the correspond keys above:" />
              <Form
                state={receivedKeys}
                setStateFunction={setreceivedKeys}
                buttonName={"Submit"}
                buttonFunction={async () => {
                  await recoverPassword().then((response) => {
                    if (response) {
                      window.location.reload();
                    } else {
                      alert("There was a problem updating the password.");
                    }
                  });
                }}
              />
            </>
          )}
        </Modal>
      )}
    </div>
  );
}
