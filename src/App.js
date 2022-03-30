import './App.css';
import MyFunction from './MyFunction';
import MyClass from './MyClass';
import MyHook from './MyHook';
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
          <li> <Link to="/myfunction">MyFunction</Link> </li>
          <li> <Link to="/myclass">MyClass</Link> </li>
          <li> <Link to="/myhook">MyHook</Link>  </li>
          <li> <Link to="/login">Login</Link>  </li>
          <li> <Link to="/tapahtuma">Tapahtumat</Link>  </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/myfunction" element={<MyFunction fname="Teppo"/>} />
        <Route exact path="/myclass" element={<MyClass fname="Teppo"/>} />
        <Route exact path="/myhook" element={<MyHook fname="Teppo"/>} />
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