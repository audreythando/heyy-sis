import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectName, selectPhoto } from "../features/User/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { setLogOut } from "../features/User/userSlice";

// Top bar: search, notifications, theme toggle (placeholder), account menu.
function Header() {
  const name = useSelector(selectName);
  const photo = useSelector(selectPhoto);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(setLogOut());
  };

  return (
    <Wrapper>
      <SearchBox>
        <SearchIcon fontSize="small" />
        <input placeholder="Search..." />
      </SearchBox>

      <Right>
        <IconButton title="Notifications">
          <NotificationsNoneIcon />
        </IconButton>
        <IconButton title="Toggle theme (coming soon)">
          <DarkModeOutlinedIcon />
        </IconButton>
        <Account onClick={() => setMenuOpen((v) => !v)}>
          <Avatar src={photo} alt={name} sx={{ width: 34, height: 34 }} />
          <span>{name}</span>
          <ExpandMoreIcon fontSize="small" />
          {menuOpen && (
            <Menu>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          )}
        </Account>
      </Right>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #f4d9ee;
`;

const SearchBox = styled.div`
  flex: 1;
  max-width: 420px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fdf1fa;
  border-radius: 999px;
  padding: 9px 16px;
  color: #b98cae;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: #3a1a38;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const IconButton = styled.div`
  color: #b98cae;
  cursor: pointer;
  display: flex;
  &:hover {
    color: #f20fb5;
  }
`;

const Account = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  color: #3a1a38;
`;

const Menu = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  background: white;
  border: 1px solid #f4d9ee;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(242, 15, 181, 0.15);
  min-width: 130px;
  overflow: hidden;
  z-index: 50;
`;

const MenuItem = styled.div`
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #3a1a38;
  &:hover {
    background: #fff3fb;
  }
`;