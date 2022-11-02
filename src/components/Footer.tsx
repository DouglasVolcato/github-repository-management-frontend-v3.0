import styled from "styled-components";

export function Footer() {
  const StyledFooter = styled.footer`
    font-size: 20px;
    position: fixed;
    padding: 0.25em 1em;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
    background-color: blue;
    color: white;
    font-weight: bold;
  `;

  return <StyledFooter>Made by Douglas Volcato</StyledFooter>;
}
