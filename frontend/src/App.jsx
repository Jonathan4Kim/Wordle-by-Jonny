import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Game from './components/Game/Game.jsx'
import LetterBox from './components/Game/LetterBox.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login"></Route>
          <Route path="/register"></Route>
          <Route path="/wordle" element={<Game></Game>}></Route>
          <Route path="/letterbox" element={<LetterBox></LetterBox>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
