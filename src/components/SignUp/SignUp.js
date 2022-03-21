import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        marvelinv.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const SignUp = () => {

    const navigate = useNavigate()

    const [ emailError, setEmailError ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const [ firstNameError, setFirstNameError ] = useState(false)
    const [ lastNameError, setLastNameError ] = useState(false)

    const [ registerEmail, setRegisterEmail ] = useState('')
    const [ registerPassword, setRegisterPassword ] = useState('')
    const [ registerFirst, setRegisterFirst ] = useState('')
    const [ registerLast, setRegisterLast ] = useState('')
   

    const register = async (event) => {
        event.preventDefault()
        
        setFirstNameError(false)
        setLastNameError(false)
        setEmailError(false)
        setPasswordError(false)

        if (registerFirst == ''){setFirstNameError(true)};
        if (registerLast == ''){setLastNameError(true)};
        if (registerEmail == ''){setEmailError(true)};
        if (registerLast == ''){setPasswordError(true)};
        
        if(registerEmail && registerPassword && registerFirst && registerLast){
            try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            navigate('/dashboard')
        } catch (error) {
            console.log(error)
        }
            
        };
   
    };


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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                    onChange={(event) => setRegisterFirst(event.target.value)}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={firstNameError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                    onChange={(event) => setRegisterLast(event.target.value)}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={lastNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    onChange={(event) => setRegisterEmail(event.target.value)}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    onChange={(event) => setRegisterPassword(event.target.value)}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordError}
                />
              </Grid>
            </Grid>
            <Button
                onClick={register}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}