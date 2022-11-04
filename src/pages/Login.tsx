import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { CardBody } from "../components/CardBody";
import { Form } from "../components/Form";
import { Modal } from "../components/Modal";
import { PageTitle } from "../components/PageTitle";
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
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setLoggedUser();
    addAllNotes();
  }, []);

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

  useEffect(() => {
    Api.getUserById().then((data) =>
      setUser({
        name: data.name,
        email: data.email,
        password: "",
        photo: data.photo,
      })
    );
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

      {user.name ? (
        <CardBody>
          <Button
            name={"Logged as " + user?.name}
            onClickFunctions={[() => setOpenModal(true)]}
            color={"darkgreen"}
            borderColor={"gold"}
          />
        </CardBody>
      ) : (
        <PageTitle name={"Make login to access the Notes"} />
      )}

      {openModal && (
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
            thirdButtonFunction={() => setOpenModal(false)}
            thirdButtonColor={"grey"}
          />
        </Modal>
      )}
    </div>
  );
}
