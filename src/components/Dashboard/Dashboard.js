import React,{ useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Masonry from "react-masonry-css";
import { getDocs, doc, deleteDoc } from "firebase/firestore";
import { MarvelCard } from '../MarvelCard/MarvelCard';
import { auth, db } from '../../firebaseConfig';
import { marvelCollectionRef } from '../pages/Create';
import { 
    makeStyles,
    ListItem,
    ListItemText,
    List
} from '@material-ui/core';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from '../Theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { signOut } from 'firebase/auth';


const useStyles = makeStyles((theme) => {
    return {
        toolbar: theme.mixins.toolbar,
        logo: {
            flexGrow: '1'
        }
    }
})

export const Dashboard = () => {

  const [ characters, setCharacters ] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const classes = useStyles()

const logout = async () => {

    await signOut(auth)
    navigate('/')
    };

const pages = [
    {
        text: 'Create',
        path: '/create'
    },
    {
        text: 'Home',
        path: '/'
    },
    {
        text: <Button variant='contained' onClick={logout}>Logout</Button>,
        path: '/'
    }
];
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
}



const handleDelete = async (id) => {
    const marvelDoc = doc(db, 'marvel',id)
    await deleteDoc(marvelDoc)

    const changeCharacters = characters.filter((char) => char.id != id)
    setCharacters(changeCharacters)
}

useEffect(() => {

    const getCharacter = async () => {
        const data = await getDocs(marvelCollectionRef);
        setCharacters(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }

    getCharacter()

}, [])


  return (
   <ThemeProvider theme={theme}> 
    <Container>
        <AppBar color='primary'>
        <Container >
            <Toolbar  disableGutters>
            <Typography
                variant="h6"
                noWrap
                component="div"
                className={classes.logo}
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                MARVEL Inventory
            </Typography>

            <Typography>
                <Button variant='contained' onClick={() => navigate('/create')}>Create</Button>
            </Typography>
            <Typography>
                <Button variant='contained' onClick={() => navigate('/')}>Home</Button>
            </Typography>
            <Typography>
                <Button variant='contained' onClick={logout}>Logout</Button>
            </Typography>
            </Toolbar>
        </Container>
        </AppBar>
        <div className={classes.toolbar}>
        </div>
        <Container sx={{p:3}}>
            <Masonry
                breakpointCols={breakpoints}
                className = "my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {characters.map((char) => {
                    if(char.author.id === auth.currentUser.uid){
                    return(
                        <div key={char.id}>
                            <MarvelCard char={char} Delete={handleDelete} />
                        </div>
                    )}}
                )}
            </Masonry>
        </Container>    
    </Container> 
</ThemeProvider> 
  );
};
