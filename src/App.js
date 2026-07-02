import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import ChannelList from "./Components/ChannelList";
import Chat from "./Components/Chat";
import RightPanel from "./Components/RightPanel";
import Login from "./Components/Login";
import ComingSoon from "./Components/ComingSoon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPhoto,
  selectUid,
  setLogin,
  setLogOut,
} from "./features/User/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import db from "./firebase/firebase";
import usePresence from "./hooks/usePresence";

// Reads :id from the URL and renders the chat window + right panel for it.
function ChatRoute() {
  const { id } = useParams();
  const [channelName, setChannelName] = React.useState("");

  useEffect(() => {
    if (!id) return;
    getDoc(doc(db, "post", id)).then((snap) => {
      if (snap.exists()) setChannelName(snap.data().channelName);
    });
  }, [id]);

  return (
    <>
      <Chat channelId={id} channelName={channelName} />
      <RightPanel channelId={id} channelName={channelName} />
    </>
  );
}

const COMING_SOON = {
  campaigns: {
    title: "Campaigns",
    blurb: "Organize and follow awareness campaigns and drives — coming in a future update.",
  },
  "safe-space": {
    title: "Safe Space",
    blurb: "A private, moderated space for support conversations — coming in a future update.",
  },
  resources: {
    title: "Resources",
    blurb: "A library of helplines, guides, and support resources — coming in a future update.",
  },
  "about-us": {
    title: "About Us",
    blurb: "Learn more about the mission behind Hey Sis — coming in a future update.",
  },
  contacts: {
    title: "Contacts",
    blurb: "Reach the Hey Sis team and moderators directly — coming in a future update.",
  },
};

function App() {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const photo = useSelector(selectPhoto);
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();
  const [addSignal, setAddSignal] = React.useState(0);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
          })
        );
      } else {
        dispatch(setLogOut());
      }
    });
  }, [dispatch]);

  usePresence(uid, name, photo, email);

  if (!name) {
    return (
      <Container>
        <Login />
      </Container>
    );
  }

  return (
    <Container>
      <Router>
        <Shell>
          <Sidebar onAddChannel={() => setAddSignal((n) => n + 1)} />
          <ContentColumn>
            <Header />
            <BodyRow>
              <ChannelList addRequestSignal={addSignal} />
              <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/chatroom" element={<Chat />} />
                <Route path="/chatroom/:id" element={<ChatRoute />} />
                {Object.entries(COMING_SOON).map(([path, props]) => (
                  <Route
                    key={path}
                    path={`/${path}`}
                    element={<ComingSoon {...props} />}
                  />
                ))}
              </Routes>
            </BodyRow>
          </ContentColumn>
        </Shell>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div``;

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const BodyRow = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;