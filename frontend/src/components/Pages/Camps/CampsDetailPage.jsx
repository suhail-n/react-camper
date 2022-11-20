import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { convertDate } from "../../../util/dates";
import { CommentList } from "../../UI/Comment/CommentList";

export const CampsDetailPage = () => {
  const { id } = useParams();
  const [camp, setCamp] = useState(null);
  const getCamp = async (campId) => {
    const response = await fetch(`/camps/${campId}`, { method: "GET" });
    const status = await response.status;
    if (status !== 200) {
      console.log(`failed status with code: ${status}`);
      return null;
    }
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    getCamp(id).then((result) => {
      setCamp(result);
    });
  }, [id]);

  if (camp === null) {
    return <></>;
  }
  return (
    <Container>
      <Row className="m-3 justify-content-center">
        <Col sm={12}>
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
              <Card.Text>{camp.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CommentList campId={id} />
    </Container>
  );
};
