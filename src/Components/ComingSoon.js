import React from "react";
import styled from "styled-components";

function ComingSoon({ title, blurb }) {
  return (
    <Container>
      <Badge>Coming soon</Badge>
      <h1>{title}</h1>
      <p>{blurb}</p>
    </Container>
  );
}

export default ComingSoon;

const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  background: #fff8fc;

  h1 {
    font-size: 26px;
    font-weight: 800;
    color: #3a1a38;
    margin-bottom: 8px;
  }
  p {
    color: #8a6b87;
    max-width: 380px;
  }
`;

const Badge = styled.span`
  background: #ffe9f8;
  color: #f20fb5;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 14px;
`;