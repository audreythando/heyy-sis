import { Delete } from "@mui/icons-material";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setChannel } from "../features/Channel/channelSlice";
import db from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { selectEmail } from "../features/User/userSlice";

const ICONS = ["💕", "🤝", "🎯", "💖", "🏆", "🙂", "✨", "🌸"];
const iconFor = (id) => ICONS[Math.abs(hash(id)) % ICONS.length];
const hash = (str) =>
  (str || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);

const timeAgo = (timestamp) => {
  if (!timestamp?.toDate) return "";
  const diffMs = Date.now() - timestamp.toDate().getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
};

function SidebarList({ title, description, creator, id, sideEmail, timestamp }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: activeId } = useParams();
  const email = useSelector(selectEmail);
  const active = activeId === id;

  const SelectChannel = () => {
    dispatch(setChannel({ name: title, id }));
    navigate(`/chatroom/${id}`);
  };

  const deleteSidebarChannel = async (e) => {
    e.stopPropagation();
    if (email === sideEmail) {
      await deleteDoc(doc(db, "post", id));
    }
  };

  return (
    <Container onClick={SelectChannel} active={active}>
      <IconBubble>{iconFor(id)}</IconBubble>
      <Info>
        <Row>
          <Name>#{title}</Name>
          <Time>{timeAgo(timestamp)}</Time>
        </Row>
        <Preview>{description || `by ${creator || "someone"}`}</Preview>
      </Info>
      {email === sideEmail && (
        <DeleteBtn onClick={deleteSidebarChannel} fontSize="small" />
      )}
    </Container>
  );
}

export default SidebarList;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 4px;
  background-color: ${(p) => (p.active ? "#FFE9F8" : "transparent")};
  transition: background-color 120ms ease-out;

  &:hover {
    background-color: #fff3fb;
  }
  &:hover .delete-btn {
    opacity: 1;
  }
`;

const IconBubble = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #ffe9f8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
`;

const Name = styled.span`
  font-weight: 700;
  font-size: 13.5px;
  color: #3a1a38;
`;

const Time = styled.span`
  font-size: 11px;
  color: #b98cae;
  flex-shrink: 0;
`;

const Preview = styled.div`
  font-size: 12px;
  color: #8a6b87;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteBtn = styled(Delete)`
  opacity: 0;
  color: #d69cc6;
  transition: opacity 120ms ease-out;
  &:hover {
    color: #ef4444;
  }
`;