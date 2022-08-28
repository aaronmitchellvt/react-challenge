import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import MovieShowPage from "./components/MovieShowPage";

function App() {
  return (
<>
    <Router>
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/movies/:id" element={<MovieShowPage />} />
        </Routes>
  </Router>
    </>
  );
}

export default App;
