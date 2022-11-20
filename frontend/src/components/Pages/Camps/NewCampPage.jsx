import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { createCamp } from "../../../api/camps";
import { useAuth } from "../../../hooks/useAuth";

export const NewCampPage = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { auth } = useAuth();

  function canSubmit() {
    return title.length > 0 && url.includes("https") && content.length > 0;
  }

  /**
   * @param {Event} event
   */
  async function handleSubmit(event) {
    event.preventDefault();
    if (canSubmit() === true) {
      try {
        await createCamp(
          title,
          content,
          rating,
          url,
          auth.user.id,
          auth.accessToken
        );
      } catch (error) {
        console.log(error);
      } finally {
        navigate("/");
      }
    } else {
      setError("Fill in all required fields");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error.length !== "" && (
        <Form.Text className="text-danger">{error}</Form.Text>
      )}
      <Form.Group controlId="formCampTitle" className="m-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCampImageUrl" className="m-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          placeholder="URL..."
          value={url}
          required
          onChange={(e) => setUrl(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formCampRating" className="m-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as="select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formCampContent" className="m-3">
        <Form.Label>Content</Form.Label>
        <Form.Control
          placeholder="Content..."
          as="textarea"
          rows={4}
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>

      <Button variant="secondary" type="submit" className="m-3">
        Submit
      </Button>
    </Form>
  );
};
