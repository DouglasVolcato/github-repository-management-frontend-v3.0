interface Props {
  name: string;
}

export function PageTitle({ name }: Props) {
  const h1Styles = {
    color: "#ffffff",
    width: "100%",
    textAlign: "center" as "center",
    padding: "30px 10px 10px 10px",
  };

  return <h1 style={h1Styles}>{name}</h1>;
}
