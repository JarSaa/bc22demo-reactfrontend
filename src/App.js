import './App.css';
//import MyFunction from './MyFunction';
import MyClass from './MyClass';
import Login from './Login';
import TapahtumaList from './TapahtumaList';
import BookList from './BookList';
import SelectedBook from './SelectedBook';
import DeleteBook from './DeleteBook';
import AddTapahtuma from './AddTapahtuma';
import SelectedTapahtuma from './SelectedTapahtuma';
import PreYearTapahtumaList from './PreYearTapahtumaList';
import CurYearTapahtumaList from './CurYearTapahtumaList';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  let vuosi = '2022'

  return (
    <Router>
      <div>
      
        <ul>
          <li> <Link to="/login">Login</Link>  </li>
          <li> <Link to="/curyeartapahtuma">Tämän vuoden tapahtumat</Link>  </li>
          <li> <Link to="/preyeartapahtuma">Edellisen vuoden tapahtumat</Link>  </li>
          <li> <Link to="/tapahtuma">Kaikki tapahtumat</Link>  </li>                 
          </ul>
        <hr />
      </div>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/tapahtuma/" element={<TapahtumaList/>} />
        <Route exact path="/preyeartapahtuma/" element={<PreYearTapahtumaList/>} />
        <Route exact path="/curyeartapahtuma/" element={<CurYearTapahtumaList/>} />
        <Route exact path="/booklist/selectedbook/:id" element={<SelectedBook/>} />
        <Route exact path="/tapahtuma/selectedtapahtuma/:id" element={<SelectedTapahtuma/>} />
        <Route exact path="/booklist/deletebook/:id" element={<DeleteBook/>} />
        <Route exact path="/addtapahtuma" element={<AddTapahtuma/>} />
        </Routes>
    </Router>

  );
}

export default App;



