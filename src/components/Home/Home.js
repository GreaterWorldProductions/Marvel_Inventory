import { styled } from '@mui/system';
import marvel_image from '../../assets/images/marvel_image.jpg';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebaseConfig';

const Root = styled("div")({
    padding: 0,
    margin: 0,
    fontFamily: 'roboto',
})
const NavbarContainer = styled('div')( {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
})
const Logo = styled('h1')({
    margin: '0 0 0 0.45em'
})
const LogoA = styled('a')( {
    color: 'white',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none'
})
const LogoNavigation = styled('ul')( {
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'white',
    textDecoration: 'none',
    "&:hover": {
        backgroundColor: 'rgb(225,225,225, 0.42)',
        borderRadius: '20px',
      }
})

const Main = styled('main')( {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${marvel_image});`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
    fontFamily: 'Quicksand'

})

export const Home = () => {

       
const [ user, setUser ] = useState({})

onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
})

const loggedUser =()=>{
    if(user){
        return(
        <li>
            <NavA to="/dashboard">Inventory</NavA>
        </li>)
    }else if(!user){
        return(
        <>
            <li>
                <NavA to="/signup">Sign Up</NavA>
            </li>
            <li>
                <NavA to="/signin">Sign In</NavA>
            </li>
        </>)
    }
}


    return (
        <Root>
            <Main>
                <NavbarContainer>
                    <Logo>
                        <LogoA href="#">Marvel Inventory</LogoA>
                    </Logo>
                    
                    <LogoNavigation>
                        {loggedUser()}
                        
                    </LogoNavigation>
                </NavbarContainer>
            </Main>
        </Root>
    )
}
