import './App.css';
import { ThemeProvider } from '@mui/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseAppProvider, useSigninCheck } from 'reactfire';
import { firebaseConfig } from './firebaseConfig';
import { Home } from './components/Home/Home';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { theme } from './components/Theme/theme';
import { Create } from './components/pages/Create';
import { Dashboard } from './components/Dashboard/Dashboard'



function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <ThemeProvider theme={theme}>
                <Router>
                        <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/signin' element={<SignIn />} />
                                <Route path='/signup' element={<SignUp />} />
                                <Route path='/create' element={<Create />} />
                                <Route path='/dashboard' element={<Dashboard />} />
                        </Routes>
                </Router>
        </ThemeProvider>        
    </FirebaseAppProvider>
  );
}

export default App;
