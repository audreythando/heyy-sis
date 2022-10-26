import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';

function Header() {
  return (
    <Wrapper>
        <Container>
            <Nav>
                <LeftContainer>
                    <Link to='/'>
                        <img src='/img/sislogo.jpg' alt='logo'></img>
                    </Link>
                </LeftContainer>
                <CenterContainer>
                <InputContainer>
                <Search/>
                <input placeholder='Search'/>
                </InputContainer>
                </CenterContainer>
                <RightContainer>
                    <Avatars/>
                </RightContainer>

            </Nav>

        </Container>
    </Wrapper>
  )
}

export default Header;

const Wrapper=styled.div`
background-color: rgb(242, 15, 181);
padding:10px 0;
`;

const Container=styled.div`
max-width:1124px;
margin:0 auto;
`;

const CenterContainer=styled.div`
display:none;
@media screen {min-width: 1124px} {
    display: inline-flex;
    align-items:center;
    width:100%;
    
}

`;

const LeftContainer=styled.div`
width:2.2rem;
cursor: pointer;
img{

    animation: rotate 2s linear infinite;
}

@media screen (min-width:765px){
  margin:0 15px;  
}
`;


const InputContainer=styled.div`
display:flex;
align-items:center;
width:30%;
margin:0 auto;
border-radius:30px;
background-color: plum;
 input {
    flex:1;
    margin:0 2px;
    border:none;
    background-color:transparent;
font-weight:700;
color:white;
}
:focus {
    outline:none ;
}

`;
const RightContainer=styled.div``;

const Nav=styled.div`
display:flex;
justify-content: space-between;
align-items: center;
`;

const Search=styled(SearchIcon)`
pointer-events:none;
color: rgba(187, 114, 128, 1);
margin-left:2px;
`;

const Avatars=styled(Avatar)`
transition:opacity 150ms ease-out;
cursor: pointer;
:hover{
    opacity:0.75 ;
}
`;