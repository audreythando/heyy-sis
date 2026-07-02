import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase/firebase";
import { useSelector } from "react-redux";
import { selectEmail, selectName } from "../features/User/userSlice";
import SidebarList from "./SidebarList";

function ChannelList({ addRequestSignal }) {
  const [channels, setChannels] = useState([]);
  const email = useSelector(selectEmail);
  const name = useSelector(selectName);
  const shortName = name ? name.split(" ")[0] : name;

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "post"), orderBy("timestamp", "desc")),
      (snapshot) => setChannels(snapshot.docs)
    );
  }, []);

  const makeChannel = React.useCallback(async () => {
    const channelName = window.prompt("Enter a channel name");
    if (!channelName || channelName.trim().length < 3) return;
    await addDoc(collection(db, "post"), {
      channelName: channelName.trim(),
      description: "A safe space to connect and chat",
      email,
      name: shortName,
      timestamp: serverTimestamp(),
    });
  }, [email, shortName]);

  useEffect(() => {
    if (addRequestSignal) makeChannel();
  }, [addRequestSignal, makeChannel]);

  return (
    <Container>
      <Header>
        <h3>Channels</h3>
        <PlusButton onClick={makeChannel}>
          <AddIcon fontSize="small" />
        </PlusButton>
      </Header>
      <List>
        {channels.map((post) => (
          <SidebarList
            key={post.id}
            id={post.id}
            title={post.data().channelName}
            description={post.data().description}
            creator={post.data().name}
            sideEmail={post.data().email}
            timestamp={post.data().timestamp}
          />
        ))}
        {channels.length === 0 && (
          <Empty>No channels yet — create the first one!</Empty>
        )}
      </List>
    </Container>
  );
}

export default ChannelList;

const Container = styled.div`
  width: 300px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #f4d9ee;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px 10px;

  h3 {
    font-size: 18px;
    font-weight: 800;
    color: #3a1a38;
  }
`;

const PlusButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: 1.5px solid #f20fb5;
  color: #f20fb5;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 120ms ease-out;

  &:hover {
    background: #f20fb5;
    color: white;
  }
`;

const List = styled.div`
  padding: 4px 10px;
  overflow-y: auto;
  flex: 1;
`;

const Empty = styled.div`
  color: #b98cae;
  font-size: 13px;
  padding: 20px 10px;
  text-align: center;
`;