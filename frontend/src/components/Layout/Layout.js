import Container from "react-bootstrap/Container";
import { NavBar } from "../UI/Navbar/Navbar";

export const Layout = (props) => {
  return (
    <>
      <NavBar />
      <Container>
        <main>{props.children}</main>
      </Container>
    </>
  );
};
