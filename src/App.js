import './App.css';
import Login from './Login';
import TapahtumaList from './TapahtumaList';
import BookList from './BookList';
import SelectedBook from './SelectedBook';
import DeleteBook from './DeleteBook';
import AddTapahtuma from './AddTapahtuma';
import SelectedTapahtuma from './SelectedTapahtuma';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li> <Link to="/login">Login</Link>  </li>
          <li> <Link to="/tapahtuma">Tapahtumat</Link>  </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/tapahtuma" element={<TapahtumaList/>} />
        <Route exact path="/booklist/selectedbook/:id" element={<SelectedBook/>} />
        <Route exact path="/tapahtuma/selectedtapahtuma/:id" element={<SelectedTapahtuma/>} />
        <Route exact path="/booklist/deletebook/:id" element={<DeleteBook/>} />
        <Route exact path="/addtapahtuma" element={<AddTapahtuma/>} />
      </Routes>
    </Router>

  );
}

export default App;