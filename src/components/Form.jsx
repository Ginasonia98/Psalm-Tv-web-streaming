import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function FormSection({
  error,
  username,
  password,
  handleSignIn,
  handleUsername,
  handlePassword,
}) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={username}
          onChange={(e) => handleUsername(e.target.value)}
          type="username"
          placeholder="Enter username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>

      <Button onClick={(e) => handleSignIn(e)} variant="primary" type="submit">
        Submit
      </Button>
      <div>{error}</div>
    </Form>
  );
}

export default FormSection;
