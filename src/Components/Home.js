import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectName } from "../features/User/userSlice";

function Home() {
  const name = useSelector(selectName);
  const shortend = name ? name.split(" ")[0] : name;

  return (
    <Container>
      Welcome to Hey Sis 
      A safe space for women who 
      have gone through abuse 
      or are going through abuse . 
      Hey Sis is here for you.
      Meet other survivors , 
      talk to psychologists ,report an abuser,
      get moral support from your sponsor. 
       <span></span>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  span {
    padding-left: 10px;
  }
`;