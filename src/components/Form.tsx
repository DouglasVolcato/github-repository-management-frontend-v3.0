import { Button } from "./Button";

interface Props {
  state: any;
  setStateFunction: (param: any) => void;
  buttonName: string;
  buttonFunction: () => void;
}

export function Form({
  state,
  setStateFunction,
  buttonName,
  buttonFunction,
}: Props) {
  const fields = Object.keys(state);
  const modifiedState = state;

  const formStyles = {
    margin: "auto",
    padding: "10px",
    width: "fit-content",
    display: "flex",
    flexWrap: "wrap" as "wrap",
    justifyContent: "center",
    flexDirection: "column" as "column",
    maxWidth: "98%",
  };
  const inputStyles = {
    width: "280px",
    backgroundColor: "#464646",
    color: "white",
    maxWidth: "98%",
    margin: "5px",
    boxShadow: "1px 2px 2px 1px #353535",
  };
  const labelStyles = {
    color: "white",
    fontWeight: "bold",
  };

  return (
    <form style={formStyles}>
      <>
        {fields.map((field) => (
          <>
            <label style={labelStyles}>{field}</label>
            <input
              style={inputStyles}
              onChange={async (event) => {
                modifiedState[field] = event.target.value;
                setStateFunction(modifiedState);
              }}
            />
          </>
        ))}
        <Button name={buttonName} onClickFunctions={[() => buttonFunction()]} />
      </>
    </form>
  );
}
