import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import classes from "./CampList.module.css";
import { convertDate } from "../../../util/dates";

export const CampList = ({ camps }) => {
  const campsList = camps.map((camp) => (
    <Row
      className={`m-3 justify-content-center ${classes.campListItem}`}
      key={camp.id}
    >
      <LinkContainer to={`/camps/${camp.id}`}>
        <Col sm={12} lg={9}>
          <Card>
            <Card.Img variant="top" src={camp.image} />
            <Card.Body>
              <Card.Title>{camp.title}</Card.Title>
              <Card.Text> Rating: {camp.rating}/5</Card.Text>
              <Card.Text>
                {" "}
                {camp.createdAt && <strong>Posted: </strong>}
                {camp.createdAt && convertDate(camp.createdAt)}
              </Card.Text>
              <Card.Text>{camp.content.slice(0, 50)} ....</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </LinkContainer>
    </Row>
  ));
  return <Container>{campsList}</Container>;
};
