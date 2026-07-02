import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PushPinIcon from "@mui/icons-material/PushPin";
import { collection, deleteField, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import db from "../firebase/firebase";

function PinnedMessage({ channelId }) {
  const [pinned, setPinned] = useState(null);

  useEffect(() => {
    if (!channelId) {
      setPinned(null);
      return;
    }
    return onSnapshot(
      query(collection(db, "post", channelId, "message"), where("pinned", "==", true)),
      (snapshot) => setPinned(snapshot.docs[0] || null)
    );
  }, [channelId]);

  const unpin = async () => {
    if (!pinned) return;
    await updateDoc(doc(db, "post", channelId, "message", pinned.id), {
      pinned: deleteField(),
      pinnedBy: deleteField(),
    });
  };

  if (!pinned) {
    return (
      <Card>
        <Header>
          <PushPinIcon fontSize="small" />
          <h4>Pinned Message</h4>
        </Header>
        <Empty>Nothing pinned yet. Hover a message and pin it.</Empty>
      </Card>
    );
  }

  const data = pinned.data();

  return (
    <Card>
      <Header>
        <PushPinIcon fontSize="small" />
        <h4>Pinned Message</h4>
      </Header>
      <Text>{data.input}</Text>
      <Footer>
        <span>Pinned by {data.pinnedBy || data.username}</span>
        <Unpin onClick={unpin}>Unpin</Unpin>
      </Footer>
    </Card>
  );
}

export default PinnedMessage;

const Card = styled.div`
  background: white;
  border: 1px solid #f4d9ee;
  border-radius: 16px;
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  color: #f20fb5;

  h4 {
    font-size: 14px;
    font-weight: 800;
    color: #3a1a38;
  }
`;

const Text = styled.div`
  font-size: 13px;
  color: #3a1a38;
  background: #fff3fb;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 8px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #b98cae;
`;

const Unpin = styled.span`
  cursor: pointer;
  color: #f20fb5;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }
`;

const Empty = styled.div`
  color: #b98cae;
  font-size: 12px;
`;