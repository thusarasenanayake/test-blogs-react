import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Technology from './pages/Technology';
import World from './pages/World';
import Home from './pages/Home';
import Post from './components/Post';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/technology" element={<Technology />} />
            <Route path="/world" element={<World />} />
            <Route path="/:category/:slug" element={<Post />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
