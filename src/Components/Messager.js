import { Avatar } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectEmail } from "../features/User/userSlice";
import db from "../firebase/firebase";

function Messager({ caption, username, email, photo, id, channelId, pinned, pinnedBy }) {
  const originalEmail = useSelector(selectEmail);
  const user = originalEmail === email;

  const deleteMessage = async () => {
    if (email !== originalEmail) return;
    await deleteDoc(doc(db, "post", channelId, "message", id));
  };

  const togglePin = async () => {
    const messagesRef = collection(db, "post", channelId, "message");
    if (pinned) {
      await updateDoc(doc(messagesRef, id), {
        pinned: deleteField(),
        pinnedBy: deleteField(),
      });
      return;
    }
    // Only one pinned message per channel: unpin whatever's currently pinned.
    const existing = await getDocs(query(messagesRef, where("pinned", "==", true)));
    const batch = writeBatch(db);
    existing.docs.forEach((d) => {
      batch.update(d.ref, { pinned: deleteField(), pinnedBy: deleteField() });
    });
    batch.update(doc(messagesRef, id), { pinned: true, pinnedBy: username });
    await batch.commit();
  };

  return (
    <MessageContainer>
      <Wrapper user={user}>
        <AvatarContainer user={user}>
          <Avatar src={photo || undefined} alt={username}>
            {!photo && username?.[0]}
          </Avatar>
        </AvatarContainer>

        <BubbleColumn user={user}>
          <MessageWrapper user={user}>
            {pinned && <PinBadge fontSize="inherit" />}
            {caption}
          </MessageWrapper>
          <UserNameWrapper user={user}>{username}</UserNameWrapper>
        </BubbleColumn>

        <Actions user={user}>
          <ActionIcon title={pinned ? "Unpin" : "Pin"} onClick={togglePin}>
            <PushPinIcon fontSize="inherit" />
          </ActionIcon>
          {user && (
            <ActionIcon title="Delete" onClick={deleteMessage}>
              <DeleteOutlineIcon fontSize="inherit" />
            </ActionIcon>
          )}
        </Actions>
      </Wrapper>
    </MessageContainer>
  );
}

export default Messager;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  flex-direction: ${(p) => (p.user ? "row-reverse" : "row")};
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const BubbleColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(p) => (p.user ? "flex-end" : "flex-start")};
  max-width: 60%;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 16px;
  font-weight: 500;
  font-size: 13.5px;
  line-height: 1.4;
  border-bottom-right-radius: ${(p) => (p.user ? "4px" : "16px")};
  border-bottom-left-radius: ${(p) => (p.user ? "16px" : "4px")};
  background-color: ${(p) => (p.user ? "#FFD6F1" : "#F4EBFA")};
  color: #3a1a38;
`;

const PinBadge = styled(PushPinIcon)`
  color: #f20fb5;
  transform: rotate(30deg);
`;

const UserNameWrapper = styled.p`
  font-size: 10.5px;
  color: #b98cae;
  margin-top: 3px;
  padding: 0 4px;
`;

const Actions = styled.div`
  display: none;
  gap: 4px;
  padding-bottom: 22px;
`;

const ActionIcon = styled.div`
  color: #b98cae;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: #f20fb5;
  }
`;

const MessageContainer = styled.div`
  padding: 8px 20px;

  &:hover ${Actions} {
    display: flex;
  }
`;