import { AppBar, Container, Typography, Select, Toolbar, MenuItem, createTheme, ThemeProvider} from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Cripto } from '../ContextCripto';

const useStyles = makeStyles(() => ({
  title: {
    flex: "1",
    color: "rgb(0, 150, 250)",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "5rem",
    marginLeft:8
  }
}));

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const {currency, setCurrency} = useContext(Cripto);
  
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate("/")} style={{
              fontWeight: "bold",
              fontFamily: "monospace",
              fontSize: "2rem",
              marginLeft: "-300px"
            }} className={classes.title}>CryptoToday
            </Typography>
            <Select  variant="outlined" value={currency}
              onChange={(e) => setCurrency(e.target.value)} style={{
                width: 100,
                height: 40,
                marginLeft: "1450px"
              }} >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header;