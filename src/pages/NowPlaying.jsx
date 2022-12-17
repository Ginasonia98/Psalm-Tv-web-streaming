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
  getpopularTvList1,
  searchTv,
} from "../api";

const Popular = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [popularTV, setPopularTV] = useState([]);
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
    getpopularTvList1().then((result) => {
      setPopularTV(result);
    });
  }, []);

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchTv(q);
      setPopularTV(query.results);
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
                  src="https://i0.wp.com/portalaltadefinicao.com/wp-content/uploads/2022/06/Resumo-semanal-Poliana-Moca.jpg?fit=1920%2C1080&ssl=1"
                  alt="Poliana Mocaw"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://m.media-amazon.com/images/M/MV5BNWZhMTY0ZDItNTNkMC00NTAxLTg5ODctMDE5MTEzMGI4ZDkxXkEyXkFqcGdeQWFsZWxvZw@@._V1_.jpg"
                  alt="Wednesday"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="carousel"
                  src="https://6.vikiplatform.com/image/5d84f0fa38dd40a4b222c2fc182f6b5b/dummy.jpg?x=b&a=0x0"
                  alt="The Love In Your Eyes"
                />
              </Carousel.Item>
            </Carousel>
          </div>
          <input
            placeholder="search your popular tv"
            className="Tv-search"
            onChange={({ target }) => search(target.value)}
          />
          <div className="Container_wrapper">
            <h3 className="Explanation px-2 py-4">Popular</h3>
            <div className="container">
              <div className="row">
                <CardList popularTV={popularTV} />
              </div>
            </div>
          </div>
        </header>
      </div>
      <Footer />
    </>
  );
};

export default Popular;
