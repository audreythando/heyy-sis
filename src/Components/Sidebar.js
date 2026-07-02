import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CampaignIcon from "@mui/icons-material/Campaign";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ConstructionIcon from "@mui/icons-material/Construction";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import AddIcon from "@mui/icons-material/Add";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useSelector } from "react-redux";
import { selectName } from "../features/User/userSlice";

const NAV_ITEMS = [
  { to: "/", label: "Home", Icon: HomeIcon, end: true },
  { to: "/chatroom", label: "Chatroom", Icon: PeopleAltIcon },
  { to: "/campaigns", label: "Campaigns", Icon: CampaignIcon },
  { to: "/safe-space", label: "Safe Space", Icon: PsychologyIcon },
  { to: "/resources", label: "Resources", Icon: ConstructionIcon },
  { to: "/about-us", label: "About Us", Icon: InfoIcon },
  { to: "/contacts", label: "Contacts", Icon: ContactPageIcon },
];

function Sidebar({ onAddChannel }) {
  const name = useSelector(selectName);

  return (
    <Container>
      <Brand>
        <LogoImg src="/img/sislogo.jpg" alt="Hey Sis logo" />
        <BrandText>HEY SIS</BrandText>
      </Brand>

      <UserRow>
        <FiberManualRecordIcon />
        <span>{name}</span>
      </UserRow>

      <Nav>
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <NavItem key={to} to={to} end={end}>
            <Icon fontSize="small" />
            <span>{label}</span>
          </NavItem>
        ))}
      </Nav>

      <Spacer />

      <AddChannelButton onClick={onAddChannel}>
        <AddIcon fontSize="small" />
        Add Channel
      </AddChannelButton>
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background-color: #f20fb5;
  min-height: 100vh;
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 18px 14px;
  color: white;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
`;

const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
  background: white;
  padding: 2px;
`;

const BrandText = styled.div`
  font-weight: 800;
  letter-spacing: 0.5px;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 4px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  margin-bottom: 12px;
  .MuiSvgIcon-root {
    font-size: 12px;
    color: #ffe066;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: background-color 120ms ease-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &.active {
    background-color: white;
    color: #f20fb5;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const AddChannelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 1.5px solid white;
  background: transparent;
  color: white;
  font-weight: 700;
  font-size: 13px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 120ms ease-out;

  &:hover {
    opacity: 0.85;
  }
`;