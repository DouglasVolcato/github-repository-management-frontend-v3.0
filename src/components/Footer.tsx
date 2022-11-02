export function Footer() {
  const footerStyles = {
    fontSize: "20px",
    position: "fixed" as "fixed",
    padding: "0.25em 1em",
    bottom: "0",
    left: "0",
    textAlign: "center" as "center",
    width: "100%",
    backgroundColor: "blue",
    color: "white",
    fontWeight: "bold",
  };

  return <footer style={footerStyles}>Made by Douglas Volcato</footer>;
}
