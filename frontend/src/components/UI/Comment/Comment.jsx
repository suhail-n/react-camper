import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { convertDate } from "../../../util/dates";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { updateComment } from "../../../api/comments";
import { useAuth } from "../../../hooks/useAuth";

export const Comment = ({
  comment,
  userId,
  isEditing,
  setEditingComment,
  onCommentUpdateHandler,
}) => {
  const [textarea, setTextarea] = useState(comment.body);
  const { auth } = useAuth();

  async function onCommentSubmitHandler(e) {
    e.preventDefault();
    const commentBody = textarea.trim();
    if (commentBody.length < 1) {
      return;
    }
    try {
      const response = await updateComment(
        comment.id,
        commentBody,
        auth.accessToken
      );
      if (response.status === 200) {
        onCommentUpdateHandler({ ...comment, body: commentBody });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTextarea("");
      setEditingComment(null);
    }
  }

  return (
    <Card className="border-0 border-bottom rounded-0">
      <Row>
        <Card.Body>
          <div>
            <Card.Title>{comment.user.name}</Card.Title>{" "}
            <Card.Subtitle className="mb-2 text-muted">
              {convertDate(comment.createdAt)}
            </Card.Subtitle>
            <span></span>
          </div>
          {isEditing && (
            <Form onSubmit={onCommentSubmitHandler}>
              <Form.Group className="mb-3" controlId="commentInput">
                <Form.Control
                  as="textarea"
                  placeholder="Add a comment..."
                  rows={3}
                  value={textarea}
                  onChange={(e) => setTextarea(e.target.value)}
                />
              </Form.Group>
              {isEditing && (
                <>
                  <Button
                    variant="light"
                    size="sm"
                    type="submit"
                    className="mx-1"
                  >
                    EDIT
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    type="button"
                    className="mx-1"
                    onClick={(_) => {
                      setEditingComment(null);
                      setTextarea(comment.body);
                    }}
                  >
                    CANCEL
                  </Button>
                </>
              )}
            </Form>
          )}
          {!isEditing && (
            <>
              <Card.Text>{comment.body}</Card.Text>
              {comment.userId === userId && (
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => setEditingComment(comment.id)}
                >
                  Edit
                </Button>
              )}{" "}
            </>
          )}
        </Card.Body>
      </Row>
    </Card>
  );
};
