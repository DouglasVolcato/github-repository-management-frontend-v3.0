interface Props {
  link: string;
}

export function UserImage({ link }: Props) {
  const imageDivStyles = {
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    borderRadius: "5%",
  };
  const imageStyles = {
    width: "250px",
    maxWidth: "80vw",
    borderRadius: "5%",
  };

  return (
    <div style={imageDivStyles}>
      <img style={imageStyles} src={link} />
    </div>
  );
}
