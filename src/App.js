import React from 'react';
import LoginPage from './Components/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './Components/Searchpage';
import DogTile from './Components/DogTile';
import Favorites from './Components/Favorites';

function App() {
  return (
     <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />}>
        {/* <LoginPage /> */}
        </Route>
        <Route path='/search' element={<SearchPage />}></Route>
        {/* <Route path='/dogTile' element={<DogTile />}></Route> */}
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
      

      {/* <Route path='/searchPage'>
        <SearchPage/>
      </Route> */}
    </div>
     </Router>
  );
}

export default App;
