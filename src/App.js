import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Home from './Components/Home';
import Header from './Components/Header';


function App() {
  return (
 <Container>
  <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
  </Router>
 </Container>
  );
}

export default App;

const Container=styled.div``;
