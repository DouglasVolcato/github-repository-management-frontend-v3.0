interface Props {
  name: string;
}

export function Text({ name }: Props) {
  const h1Styles = {
    color: "white",
    width: "270px",
    textAlign: "center" as "center",
    padding: "30px 10px 10px 10px",
    fontSize: "15px",
  };

  return <h1 style={h1Styles}>{name}</h1>;
}
