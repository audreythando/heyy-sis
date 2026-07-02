import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot } from "firebase/firestore";
import { Avatar } from "@mui/material";
import db from "../firebase/firebase";
import { PRESENCE_AWAY_MS, PRESENCE_ONLINE_MS } from "../hooks/usePresence";

const statusFor = (lastActive) => {
  if (!lastActive?.toDate) return "offline";
  const diff = Date.now() - lastActive.toDate().getTime();
  if (diff < PRESENCE_ONLINE_MS) return "online";
  if (diff < PRESENCE_AWAY_MS) return "away";
  return "offline";
};

function OnlineMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    return onSnapshot(collection(db, "presence"), (snapshot) => {
      setMembers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  const visible = members
    .map((m) => ({ ...m, status: statusFor(m.lastActive) }))
    .filter((m) => m.status !== "offline")
    .sort((a, b) => (a.status === "online" ? -1 : 1));

  return (
    <Card>
      <Header>
        <h4>Online members</h4>
        <Count>{visible.length}</Count>
      </Header>
      <List>
        {visible.map((m) => (
          <Item key={m.id}>
            <AvatarWrap>
              <Avatar src={m.photo} alt={m.name} sx={{ width: 32, height: 32 }} />
              <Dot status={m.status} />
            </AvatarWrap>
            <Info>
              <Name>{m.name}</Name>
              <Status status={m.status}>
                {m.status === "online" ? "Online" : "Away"}
              </Status>
            </Info>
          </Item>
        ))}
        {visible.length === 0 && <Empty>No one else is online right now</Empty>}
      </List>
    </Card>
  );
}

export default OnlineMembers;

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
  margin-bottom: 12px;
  h4 {
    font-size: 14px;
    font-weight: 800;
    color: #3a1a38;
  }
`;

const Count = styled.span`
  background: #ffe9f8;
  color: #f20fb5;
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  padding: 1px 8px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AvatarWrap = styled.div`
  position: relative;
`;

const Dot = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 2px solid white;
  background-color: ${(p) =>
    p.status === "online" ? "#22C55E" : "#F59E0B"};
`;

const Info = styled.div``;

const Name = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #3a1a38;
`;

const Status = styled.div`
  font-size: 11px;
  color: ${(p) => (p.status === "online" ? "#22C55E" : "#F59E0B")};
`;

const Empty = styled.div`
  color: #b98cae;
  font-size: 12px;
`;