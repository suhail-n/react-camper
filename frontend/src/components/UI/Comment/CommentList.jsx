import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { createComment, getComments } from "../../../api/comments";
import { useAuth } from "../../../hooks/useAuth";
import { Comment } from "./Comment";

export const CommentList = ({ campId }) => {
  const [comments, setComments] = useState([]);
  const [textarea, setTextarea] = useState("");
  const [buttonVisible, setButtonVisible] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getComments(campId).then((result) => {
      setComments(result);
    });
  }, [campId]);

  function onCommentUpdateHandler(comment) {
    const updatedComments = comments.map((c) => {
      if (c.id === comment.id) {
        c.body = comment.body;
      }
      return c;
    });
    setComments(updatedComments);
  }

  function onCommentTextareaClickHandler() {
    if (auth?.user) {
      setButtonVisible(true);
    } else {
      navigate("/login", { state: { from: location } });
    }
  }

  async function onCommentSubmitHandler(e) {
    e.preventDefault();
    const comment = textarea.trim();
    if (comment.length < 1) {
      setButtonVisible(false);
      return;
    }
    const response = await createComment(
      campId,
      auth.user.id,
      auth.accessToken,
      comment
    );
    const newComment = await response.json();
    console.log(response.status);
    if (response.status === 201) {
      setComments([{ ...newComment, user: auth.user }, ...comments]);
    }
    setButtonVisible(false);
    setTextarea("");
  }

  return (
    <div>
      <h1>Comments</h1>
      <section className="commentSection">
        <Form onSubmit={onCommentSubmitHandler}>
          <Form.Group className="mb-3" controlId="commentInput">
            <Form.Control
              as="textarea"
              placeholder="Add a comment..."
              rows={3}
              onClick={onCommentTextareaClickHandler}
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
            />
          </Form.Group>
          {auth?.user && buttonVisible && (
            <>
              <Button variant="light" type="submit" className="m-10">
                COMMENT
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="m-10"
                onClick={(_) => setButtonVisible(false)}
              >
                CANCEL
              </Button>
            </>
          )}
        </Form>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            isEditing={comment.id === editingComment}
            setEditingComment={setEditingComment}
            comment={comment}
            userId={auth?.user?.id}
            onCommentUpdateHandler={onCommentUpdateHandler}
          />
        ))}
      </section>
    </div>
  );
};
