import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'

function App() {
  return (
 <Container>
  <Router>
    <Routes>
      <Route path='/' element={<Home/>} />
    </Routes>
  </Router>
 </Container>
  );
}

export default App;

const Container=styled.div``;
