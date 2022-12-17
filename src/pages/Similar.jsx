import { useEffect, useState } from "react";
import NavbarSection from "../components/Navbar";
import Footer from "../components/Footer";
import ModalSection from "../components/Modal";
import Carousel from "react-bootstrap/Carousel";
import CardList from "../components/CardList";

import {
  generateRequestToken,
  validateRequestToken,
  generateSessionId,
  getAccount,
  deleteSessionId,
  getsimilarTvList1,
  searchTv,
} from "../api";

const Similar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [similarTv, setSimilarTv] = useState([]);
  const [session, setSession] = useState("");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (session || localStorage.getItem("session")) {
      setSession(session ? session : localStorage.getItem("session"));
    }
  }, [session]);

  useEffect(() => {
    if (account || localStorage.getItem("account")) {
      setAccount(
        account ? account : JSON.parse(localStorage.getItem("account"))
      );
    }
  }, [account]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Input Your Name and Password");
      return;
    }
    const requestToken = await generateRequestToken();
    if (requestToken === undefined) {
      setError("Server Error");
      return;
    }
    if (!requestToken.success) {
      setError("Server Error");
      return;
    }
    const data = {
      username,
      password,
      request_token: requestToken.request_token,
    };
    const validate = await validateRequestToken(data);
    if (validate === undefined) {
      setError("Server Error");
      return;
    }
    if (!validate.success) {
      setError("Server Error");
      return;
    }
    const requestSessionBody = {
      request_token: validate.request_token,
    };
    const session = await generateSessionId(requestSessionBody);
    if (session === undefined) {
      setError("Server Error");
      return;
    }
    if (!session.success) {
      setError("Server Error");
      return;
    }
    const account = await getAccount(session.session_id);

    if (account === undefined) {
      setError("Server Error");
      return;
    }
    localStorage.setItem("session", session.session_id);
    setSession(session.session_id);
    localStorage.setItem("account", JSON.stringify(account));
    setAccount(account);
    handleClose();
    setError("");
  };

  const handleSignOut = async () => {
    const body = {
      session_id: session,
    };
    await deleteSessionId(body);
    localStorage.removeItem("session");
    localStorage.removeItem("account");
    window.location.reload();
  };

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  useEffect(() => {
    getsimilarTvList1().then((result) => {
      setSimilarTv(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchTv(q);
      setSimilarTv(query.results);
    }
  };

  return (
    <>
      <NavbarSection
        session={session}
        handleShow={handleShow}
        handleSignOut={handleSignOut}
        account={account}
      />
      <ModalSection
        error={error}
        show={show}
        handleClose={handleClose}
        username={username}
        password={password}
        handleSignIn={handleSignIn}
        handleUsername={handleUsername}
        handlePassword={handlePassword}
      />
      <div className="App">
        <header className="App-header">
          <div className="Carousel">
            <Carousel>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://flxt.tmsimg.com/assets/p8417029_b_h10_ab.jpg"
                  alt="Only Fools and Horses"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="http://images1.resources.foxtel.com.au/store2/mount1/16/2/bpba7.jpg"
                  alt="Keeping Up Appreanches"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://uk.imageservice.sky.com/pcms/36c43b30-37a3-11ea-9ed9-fba45b709f07/16_9"
                  alt="Everybody Hates Chris"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <input
            placeholder="search your rating tv"
            className="Tv-search"
            onChange={({ target }) => search(target.value)}
          />
          <div className="Container_wrapper">
            <h3 className="Explanation px-2 py-4">Rating</h3>
            <div className="container">
              <div className="row">
                <CardList popularTV={similarTv} />
              </div>
            </div>
          </div>
        </header>
      </div>
      <Footer />
    </>
  );
};

export default Similar;
