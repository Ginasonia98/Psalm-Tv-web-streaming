import Modal from "react-bootstrap/Modal";
import Form from "../components/Form";

const ModalSection = ({
  error,
  show,
  handleClose,
  username,
  password,
  handleSignIn,
  handleUsername,
  handlePassword,
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            username={username}
            password={password}
            handleSignIn={handleSignIn}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
            error={error}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalSection;
