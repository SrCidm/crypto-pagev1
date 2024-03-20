import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Cripto } from '../ContextCripto';
import { SingleCoin } from "../config/api";
import { useParams } from 'react-router-dom';
import InfoCoin from '../components/InfoCoin';
import { LinearProgress, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  sidebar: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey"
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "monospace",
  },
  description: {
    width: "100%",
    fontFamily: "monospace",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
  },
}));

const formatNumber = (number) => {
  if (Math.abs(number) >= 1.0e+9) {
    return (Math.abs(number) / 1.0e+9).toFixed(2) + 'B';
  } else if (Math.abs(number) >= 1.0e+6) {
    return (Math.abs(number) / 1.0e+6).toFixed(2) + 'M';
  } else {
    return (number);
  }
};

const CoinPage = () => {
  const { id } = useParams();
  const [coinL, setCoin] = useState([]);
  const { symbol } = useContext(Cripto);
  const classes = useStyles();

  useEffect(() => {
    const fetchSingleCoin = async () => {
      const response = await fetch(SingleCoin(id));
      const data = await response.json();
      console.log(data);
      setCoin(data.Data);
    };

    fetchSingleCoin();
    // eslint-disable-next-line 
  }, []);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  console.log("Ejecutando la API...");
  if (!coinL) {
    console.log("API es undefined. Mostrando LinearProgress...");
    return <LinearProgress style={{ backgroundColor: "rgb(0, 150, 250)" }} />;
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            key={coinL.ID_LEGACY}
            src={`${coinL.LOGO_URL}`}
            alt={coinL.NAME}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coinL?.NAME}
          </Typography>
          <Typography variant="subtitle1" style={{ paddingLeft: '20px' }} className={classes.description}>
            {`${coinL?.ASSET_DESCRIPTION_SUMMARY}`}
          </Typography>
          <div className={classes.marketData}>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Rank:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "monospace" }}>
                {coinL.ID}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Current Price:
              </Typography>
              <Typography variant='h5' style={{ fontFamily: "monospace" }}>
                {symbol}{coinL.PRICE_USD && coinL.PRICE_USD.toFixed(2)}
              </Typography>
              &nbsp; &nbsp;
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className={classes.heading}>
                Market Cap:
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "monospace" }}>
                {symbol}{formatNumber(coinL.CIRCULATING_MKT_CAP_USD)}
              </Typography>
            </span>
          </div>
        </div>
        <InfoCoin coin={coinL} />
      </div>
    </ThemeProvider>
  );
};

export default CoinPage;