
import React from 'react';
import styled from 'styled-components';


function Sidebar() {
  return (
    <Container>
      <Header>
        <Heading></Heading>
        <Circle> <Adds/></Circle>
      </Header>
    </Container>
  )
}

export default Sidebar;

const Container=styled.div``;
const Header=styled.div``;
const Circle=styled.div``;
const Heading=styled.div``;
const Adds=styled.div``;