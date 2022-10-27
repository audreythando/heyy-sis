import React,{useState,useEffect} from 'react';
import db from '../firebase/firebase';
import { Link } from 'react-router-dom';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore'
import styled from 'styled-components'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import HomeIcon from '@mui/icons-material/Home';
import CampaignIcon from '@mui/icons-material/Campaign';
import InfoIcon from '@mui/icons-material/Info';
import ConstructionIcon from '@mui/icons-material/Construction';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarList from './SidebarList';


function Sidebar() {
  const [sidebardata, setSidebarData]=useState([]);

  useEffect(() => {
    return onSnapshot (
      query(collection(db,'post'), orderBy('timestamp','desc')),
    (snapshot) =>setSidebarData(snapshot.docs) 
    );
    
  }, [setSidebarData]);

  return (
    <Container>

        <SidebarHeader>
<SidebarInfo>
<h2> HEY SIS</h2>

<h3>
    <FiberManualRecordIcon/>
    Audrey Thando
</h3>
</SidebarInfo>
<Circle>
  <Adds/>
</Circle>

        </SidebarHeader>
        <Link style={{color:'rgba(119, 84, 119, 255)'}}>
        <SidebarList Icon={HomeIcon} title='Home'/>
        </Link>


<SidebarList Icon={PeopleAltIcon} title='Chatroom'/>
<SidebarList Icon={CampaignIcon} title='Campaigns'/>
<SidebarList Icon={PsychologyIcon} title='Safe Space'/>
<SidebarList Icon={ConstructionIcon} title='Resources'/>
<SidebarList Icon={InfoIcon} title='About Us'/>
<SidebarList Icon={ContactPageIcon} title='Contacts'/>
<SidebarList Icon={ExpandLessIcon} title='Show less'/>
<hr/>
<SidebarList Icon={ExpandMoreIcon} title='Show more'/>
<hr/>
<SidebarList Icon={AddIcon} addChannelOption title='Add Channel'/>
    
    <SidebarContainer>
    {sidebardata.map((post) =>(
      <SidebarList key={post.id} id={post.id} title={post?.data().channelName}
       creator={post?.data().name} 
       sideEmail={post?.data().email}/>
  ))}
    </SidebarContainer>
    </Container>
    );
    }

  
 

export default Sidebar



const Container=styled.div`
color:rgba(119, 84, 119, 255);
background-color:rgb(242, 15, 181) ;
height:120.8vh;
display:flex;;
flex-direction:column;
border-top:1px solid #49274b;

>hr {
  margin-top:10px;
  margin-bottom:10px;
  border:1px solid #49274b;  
}
`;

const SidebarContainer = styled.div`
  overflow-y: auto;
  margin-top: 10px;
`;

const Adds = styled.div`
  background-color: white;
  height: 10px;
  width: 10px;
  border-radius: 20px;
  border: 1px solid black;
`;

const SidebarHeader=styled.div`
display:flex;
border-bottom: 1px solid #49274b;
padding:13px;

>.MuiSvgIcon-root{
    padding:8px;
    color: #49274b;
    font-size:18px;
    background-color:white;
    border-radius:999px;
}
`;

const SidebarInfo=styled.div`
flex: 1;
>h2{
    font-size:15px;
    font-weight:900;
    margin-bottom:5px;
}

>h3{
    display:flex;
    font-size:13;
    font-weight:400;
    align-items:center;
}

> h3 >.MuiSvgIcon-root{
    font-size:14px;
    margin-top:1px;
    margin-right:2px;
    color:orange;
}
`;

const Circle = styled.div`
  background-color: white;
  height: 30px;
  cursor: pointer;
  width: 30px;
  border-radius:500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

