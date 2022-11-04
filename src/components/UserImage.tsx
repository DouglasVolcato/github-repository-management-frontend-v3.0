interface Props {
  link: string;
}

export function UserImage({ link }: Props) {
  const imageDivStyles = {
    width: "95%",
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  };
  const imageStyles = {
    width: "250px",
    minWidth: "10%",
    maxWidth: "80%",
    borderRadius: "5%",
  };

  return (
    <div style={imageDivStyles}>
      <img style={imageStyles} src={link} />
    </div>
  );
}
