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
  const modifiedState = { ...state };

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
    padding: "5px",
  };
  const labelStyles = {
    color: "white",
    fontWeight: "bold",
  };

  function setFirstLetterToUpperCase(text: string) {
    return text.replace(/^[a-z]/, text[0].toUpperCase());
  }

  function setInputType(field: string) {
    if (field === "deadline") {
      return "date";
    } else {
      return "text";
    }
  }

  return (
    <form style={formStyles}>
      <>
        {fields.map((field, key) => (
          <div key={key}>
            <label style={labelStyles}>
              {setFirstLetterToUpperCase(field)}
            </label>
            <br />
            {field === "note" ? (
              <textarea
                rows={5}
                value={modifiedState[field]}
                style={inputStyles}
                onChange={async (event) => {
                  modifiedState[field] = event.target.value;
                  setStateFunction(modifiedState);
                }}
              />
            ) : field === "priority" ? (
              <select
                value={modifiedState[field]}
                style={inputStyles}
                onChange={async (event) => {
                  modifiedState[field] = event.target.value;
                  setStateFunction(modifiedState);
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            ) : (
              <input
                type={setInputType(field)}
                value={modifiedState[field]}
                style={inputStyles}
                onChange={async (event) => {
                  modifiedState[field] = event.target.value;
                  setStateFunction(modifiedState);
                }}
              />
            )}
          </div>
        ))}
        <Button name={buttonName} onClickFunctions={[() => buttonFunction()]} />
      </>
    </form>
  );
}
