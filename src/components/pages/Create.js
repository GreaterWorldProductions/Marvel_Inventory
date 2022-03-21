import { 
    Typography, 
    Button, 
    Container, 
    Box,
    makeStyles,
    TextField
} from '@material-ui/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebaseConfig';
import {
    collection,
    addDoc
} from 'firebase/firestore'

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../Theme/theme';


export const marvelCollectionRef = collection(db, 'marvel')

const useStyles = makeStyles({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block' 
    }
})

export const Create = () => {

    const classes = useStyles()
    const navigate = useNavigate()

    // Makes sure the user inputs aren't left blank
    const [ name, setName ] = useState('')
    const [ identity, setIdentity ] = useState('')
    const [ power, setPower ] = useState('')
    const [ description, setDescription ] = useState('')

    const [ nameError, setNameError ] = useState(false)
    const [ identityError, setIdentityError ] = useState(false)
    const [ powerError, setPowerError ] = useState(false)
    const [ descriptionError, setDescriptionError ] = useState(false)

    // This is used to post to the database
    const handleSubmit = async (event) => {
        event.preventDefault()
        setNameError(false)
        setIdentityError(false)
        setPowerError(false)
        setDescriptionError(false)

        if(name && identity && power && description == ''){
            setNameError(false)
            setIdentityError(false)
            setPowerError(false)
            setDescriptionError(false)
    
        }

        if( name && identity && power && description ){
           await addDoc(marvelCollectionRef, {name: name, identity: identity, power: power, 
            description: description, author: {email: auth.currentUser.email, id:auth.currentUser.uid}})
            navigate('/dashboard')

           
        } 
    }


    return (
    <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
           <CssBaseline />
           <Box
             sx={{
               marginTop: 8,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
             }}
           >
             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
               
             </Avatar>
             <Typography component="h1" variant="h5">
               Character Creation
             </Typography>
             <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
             <TextField
                onChange= {(event) => setName(event.target.value)}
                className={classes.field}
                label='Character Name'
                variant='outlined' 
                color='primary'
                required
                fullWidth
                error={nameError}
                />

                <TextField
                onChange= {(event) => setIdentity(event.target.value)}
                className={classes.field}
                label='Character Secret Identity'
                variant='outlined' 
                color='primary'
                required
                fullWidth
                error={identityError}
                />
                
                <TextField
                onChange= {(event) => setDescription(event.target.value)}
                className={classes.field}
                label='Description'
                variant='outlined' 
                color='primary'
                required
                fullWidth
                error={descriptionError}
                />

                <TextField
                onChange= {(event) => setPower(event.target.value)}
                className={classes.field}
                label='Power'
                variant='outlined' 
                color='primary'
                required
                fullWidth
                error={powerError}
                />
                <Button
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
             </Box>
           </Box>
         </Container>
       </ThemeProvider>

     );
}
