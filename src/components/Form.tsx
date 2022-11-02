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
    width: "270px",
    display: "flex",
    flexWrap: "wrap" as "wrap",
    justifyContent: "center",
    flexDirection: "column" as "column",
    maxWidth: "80vw",
  };
  const inputStyles = {
    width: "250px",
    backgroundColor: "#464646",
    color: "white",
    maxWidth: "80vw",
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
        {fields.map((field, key) => (
          <div key={key}>
            <label style={labelStyles}>{field}</label>
            <br />
            <input
              style={inputStyles}
              onChange={async (event) => {
                modifiedState[field] = event.target.value;
                setStateFunction(modifiedState);
              }}
            />
          </div>
        ))}
        <Button name={buttonName} onClickFunctions={[() => buttonFunction()]} />
      </>
    </form>
  );
}
