import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TagIcon from "@mui/icons-material/Tag";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase/firebase";
import OnlineMembers from "./OnlineMembers";
import PinnedMessage from "./PinnedMessage";

const formatDate = (timestamp) => {
  if (!timestamp?.toDate) return "—";
  return timestamp.toDate().toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

function RightPanel({ channelId, channelName }) {
  const [channelData, setChannelData] = useState(null);
  const [memberCount, setMemberCount] = useState(0);

  useEffect(() => {
    if (!channelId) return setChannelData(null);
    getDoc(doc(db, "post", channelId)).then((snap) => {
      if (snap.exists()) setChannelData(snap.data());
    });
  }, [channelId]);

  useEffect(() => {
    return onSnapshot(collection(db, "presence"), (snap) =>
      setMemberCount(snap.size)
    );
  }, []);

  return (
    <Container>
      <Card>
        <Header>
          <TagIcon fontSize="small" />
          <h4>About #{channelName || "channel"}</h4>
        </Header>
        <Description>
          {channelData?.description || "A safe space to connect and chat"}
        </Description>
        <InfoRow>
          <span>Created by</span>
          <strong>{channelData?.name || "—"}</strong>
        </InfoRow>
        <InfoRow>
          <span>Created on</span>
          <strong>{formatDate(channelData?.timestamp)}</strong>
        </InfoRow>
        <InfoRow>
          <span>Members</span>
          <strong>{memberCount}</strong>
        </InfoRow>
      </Card>

      <OnlineMembers />
      <PinnedMessage channelId={channelId} />
    </Container>
  );
}

export default RightPanel;

const Container = styled.div`
  width: 280px;
  flex-shrink: 0;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff8fc;
  min-height: 100vh;

  @media (max-width: 1100px) {
    display: none;
  }
`;

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
  color: #f20fb5;
  margin-bottom: 8px;

  h4 {
    font-size: 14px;
    font-weight: 800;
    color: #3a1a38;
  }
`;

const Description = styled.p`
  font-size: 12.5px;
  color: #8a6b87;
  margin-bottom: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #8a6b87;
  padding: 4px 0;

  strong {
    color: #3a1a38;
  }
`;