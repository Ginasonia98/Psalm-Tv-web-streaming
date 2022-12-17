import Button from "react-bootstrap/Button";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-6 col-lg-3 mb-4">
            <br />
            <div className="text-white1">Psalm Tv</div>
            <div>
              <br />
              <Button className="Langganan">Langganan</Button>
            </div>
          </div>
          <div className="col-6 col-lg-3 mb-4">
            <div>
              <br />
              <h3 className="text-white">Basic</h3>
              <ul className="list">
                <li className="text-white">About Psalm Tv</li>
                <br />
                <li className="text-white">Contact-Us</li>
                <br />
                <li className="text-white">Support Forum</li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-lg-3 mb-4">
            <div>
              <br />
              <h3 className="text-white">Community</h3>
              <ul className="list">
                <li className="text-white">Guideline</li>
                <br />
                <li className="text-white">Support Forum</li>
                <br />
                <li className="text-white">Linkeidn</li>
              </ul>
            </div>
          </div>
          <div className="col-6 col-lg-3 mb-4">
            <div>
              <br />
              <h3 className="text-white">Rule</h3>
              <ul className="list">
                <li className="text-white">Terms of Use</li>
                <br />
                <li className="text-white">Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
