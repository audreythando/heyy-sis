import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GroupIcon from "@mui/icons-material/Group";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase/firebase";
import {
  selectEmail,
  selectName,
  selectPhoto,
} from "../features/User/userSlice";
import Messager from "./Messager";

function Chat({ channelId, channelName }) {
  const [portfo, setPortfo] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const name = useSelector(selectName);
  const shortName = name ? name.split(" ") : name;
  const photo = useSelector(selectPhoto);
  const email = useSelector(selectEmail);
  const scrollref = useRef(null);

  const Submit = async (e) => {
    e.preventDefault();
    if (input.trim().length <= 0 || loading || !channelId) return;
    setLoading(true);

    await addDoc(collection(db, "post", channelId, "message"), {
      input: input.trim(),
      username: shortName[0],
      photo: photo,
      email: email,
      timestamp: serverTimestamp(),
    });

    setInput("");
    setLoading(false);
  };

  useEffect(() => {
    if (scrollref.current) {
      scrollref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [portfo]);

  useEffect(() => {
    if (!channelId) {
      setPortfo([]);
      return;
    }
    return onSnapshot(
      query(
        collection(db, "post", channelId, "message"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => setPortfo(snapshot.docs)
    );
  }, [channelId]);

  if (!channelId) {
    return (
      <Container>
        <EmptyState>
          <h2>Pick a channel to start chatting</h2>
          <p>Choose one from the Channels list, or create a new one.</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <ChatHeader>
        <TitleBlock>
          <h2># {channelName}</h2>
          <p>A safe space to connect and chat</p>
        </TitleBlock>
        <HeaderIcons>
          <IconWithCount>
            <GroupIcon fontSize="small" />
          </IconWithCount>
          <InfoOutlinedIcon fontSize="small" style={{ cursor: "pointer" }} />
          <MoreVertIcon fontSize="small" style={{ cursor: "pointer" }} />
        </HeaderIcons>
      </ChatHeader>

      <Messanger>
        {portfo.map((post) => (
          <Messager
            key={post.id}
            id={post.id}
            channelId={channelId}
            caption={post.data().input}
            username={post.data().username}
            email={post.data().email}
            photo={post.data().photo}
            pinned={post.data().pinned}
            pinnedBy={post.data().pinnedBy}
          />
        ))}
        <SpaceBelow ref={scrollref} />
      </Messanger>

      <InputContainer onSubmit={Submit}>
        <SideIcon fontSize="small" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          type="text"
        />
        <SideIcon as={InsertEmoticonIcon} fontSize="small" />
        <SideIcon as={GifBoxOutlinedIcon} fontSize="small" />
        <SendButton disabled={loading} type="submit">
          <SendIcon fontSize="small" />
        </SendButton>
      </InputContainer>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #f4d9ee;

  h2 {
    font-size: 18px;
    font-weight: 800;
    color: #3a1a38;
  }
  p {
    font-size: 12.5px;
    color: #8a6b87;
    margin-top: 2px;
  }
`;

const TitleBlock = styled.div``;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: #8a6b87;
  padding-top: 4px;
`;

const IconWithCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Messanger = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 4px 90px;
`;

const SpaceBelow = styled.div`
  margin-top: 10px;
`;

const InputContainer = styled.form`
  position: sticky;
  bottom: 0;
  margin: 0 24px 20px;
  padding: 12px 16px;
  border-radius: 999px;
  border: 1.5px solid #f4d9ee;
  background: white;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 24px rgba(242, 15, 181, 0.08);

  input {
    flex: 1;
    border: none;
    font-size: 13.5px;
    color: #3a1a38;
    :focus {
      outline: none;
    }
  }
`;

const SideIcon = styled(AddIcon)`
  color: #b98cae;
  cursor: pointer;
  &:hover {
    color: #f20fb5;
  }
`;

const SendButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  background: #f20fb5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 120ms ease-out;

  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #8a6b87;
  padding: 40px;

  h2 {
    color: #3a1a38;
    margin-bottom: 6px;
  }
`;