import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./Components/Chat";
import Header from "./Components/Header";
import Sidebar from './Components/Sidebar';
import { useDispatch, useSelector } from "react-redux";
import { selectName, setLogin, setLogOut } from "./features/User/userSlice";
import Login from './Components/Login';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Home from './Components/Home';

function App() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      } else {
        dispatch(
          setLogOut({
            name: null,
            email: null,
            photo: null,
          })
        );
      }
    });
  }, [dispatch]);
  return (
    <Container>
      {name ? (
        <Router>
          <Header />
          <Column>
            <Sidebar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Chat />
                  </>
                }
              />
              <Route path="/chat/:id" element={<Chat />} />
            </Routes>
          </Column>
        </Router>
      ) : (
        <Login />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div``;

const Column = styled.div`
  display: flex;
`;
