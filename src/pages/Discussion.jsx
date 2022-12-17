import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Discussion = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
          <br />
          <div className="Text">Let's chat</div>
          <br />
          <Card>
            <Card.Body className="container1">
              <Card.Title style={{ color: "white" }}>Program Tv Update</Card.Title>
              <Card.Text style={{ color: "white" }}>
                What Program Tv Update Now?
              </Card.Text>
              <Button style={{ color: "white", backgroundColor: "#C147E9" }}>
                Let's discuss
              </Button>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Body className="container1">
              <Card.Title style={{ color: "white" }}>
                Best Movie Of The Week
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                What's The Best Movie Of The Week?
              </Card.Text>
              <Button style={{ color: "white", backgroundColor: "#C147E9" }}>
                Let's discuss
              </Button>
            </Card.Body>
          </Card>
          <br />
          <Card>
            <Card.Body className="container1">
              <Card.Title style={{ color: "white" }}>
                Best Video Recommendation{" "}
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                What Video Recommendations Do You Think?
              </Card.Text>
              <Button style={{ color: "white", backgroundColor: "#C147E9 " }}>
                Let's discuss
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
