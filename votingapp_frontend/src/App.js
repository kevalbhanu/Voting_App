import './App.css';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import Login from './Components/Login';
import CandidateList from './Components/CandidateList';
import VoteCount from './Components/VoteCount';
import AddCandidate from './Components/AddCandidate';
import UpdateCandidate from './Components/UpdateCandidate';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route element={<PrivateRoute/>}>
          <Route path='/candidate_list' element={<CandidateList/>}/>
          <Route path='/votecount' element={<VoteCount/>}/>
          <Route path='/add_candidate' element={<AddCandidate/>}/>
          <Route path='/delete_candidate' element={<p>Delete Candidate</p>}/>
          <Route path='/update_candidate/:id' element={<UpdateCandidate/>}/>
          </Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
