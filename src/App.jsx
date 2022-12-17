import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Popular from "./pages/NowPlaying";
import Rating from "./pages/Rating";
import Discussion from "./pages/Discussion";
import Upcoming from "./pages/Upcoming";
import Recommendation from "./pages/Recommendation";
import Similar from "./pages/Similar";
import SimilarMovie from "./pages/SimilarMovie";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/rating" element={<Rating />} />
        <Route path="/similar" element={<Similar />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/similarmovie" element={<SimilarMovie />} />
      </Routes>
    </Router>
  );
};

export default App;
