import { BrowserRouter,Routes, Route} from 'react-router-dom';
import './App.css';
import Header from "./components/Header";
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@mui/styles';
import ContextCripto from '../src/ContextCripto';


function App() {
  const useStyles = makeStyles(() => ({
    app: {
      backgroundColor: "rgb(0, 150, 250)",
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();



  return (
    <BrowserRouter>
        <div id="app" className={classes.app}>
          <ContextCripto>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </ContextCripto>
        </div>  
    </BrowserRouter>
  );
}

export default App;
