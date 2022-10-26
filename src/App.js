import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Home from './Components/Home';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar'


function App() {
  return (
 <Container>
  <Router>
    <Header/>
    <Side>
    <Sidebar/>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
    </Side>
  </Router>
 </Container>
  );
}

export default App;

const Container=styled.div``;
const Side=styled.div`
display: flex;
`;
