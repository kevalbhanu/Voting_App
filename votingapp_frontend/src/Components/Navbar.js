import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Navbar() {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup');

    }
  return (
    <div>
       {auth? <ul className='nav-ul'>
            <li><Link to = '/candidate_list'>Candidates</Link></li>
            <li><Link to = '/votecount'>Vote Count</Link></li>
            <li><Link to = '/add_candidate'>Add Candidate</Link></li>
            <li><Link onClick={logout} to ='/signup'>Logout</Link></li>
            </ul>:
            <ul className='nav-ul nav-right'>
            <li><Link to = '/signup'>Sign up</Link></li>
            <li><Link to = '/login'>Login</Link></li>
        </ul>}
      
    </div>
  )
}
