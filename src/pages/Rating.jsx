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
  getratingTvList1,
  searchTv,
} from "../api";

const Rating = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [ratingTv, setRatingTv] = useState([]);
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
    getratingTvList1().then((result) => {
      setRatingTv(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchTv(q);
      setRatingTv(query.results);
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
                  src="https://flxt.tmsimg.com/assets/p20441694_b_h8_aa.jpg"
                  alt="The Damelia Show"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://p4.wallpaperbetter.com/wallpaper/875/623/733/arcane-league-of-legends-riot-games-jinx-league-of-legends-jayce-league-of-legends-hd-wallpaper-preview.jpg"
                  alt="Arcane"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/1116/1421116-h-2390e9f5d6fd"
                  alt="The Kardashian"
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
                <CardList popularTV={ratingTv} />
              </div>
            </div>
          </div>
        </header>
      </div>
      <Footer />
    </>
  );
};

export default Rating;
