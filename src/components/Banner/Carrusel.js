import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { Cripto } from '../../ContextCripto';
import { TrendingCoins } from "../../config/api";
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  carrusel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    color: "black",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white"
  }
}));


const Carrusel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(Cripto);
  const classes = useStyles();
  
  

  const fetchTrendingCoins = async () => {
    const response = await fetch(TrendingCoins(currency));
    const data = await response.json();
    console.log(data.Data);
    setTrending(data.Data);

  };
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line 
  }, [currency]);
  

  const items = trending.map((coin) => {
    let profit = coin?.DISPLAY?.[currency]?.CHANGEPCTDAY;


    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.CoinInfo.Name}`}>
          <img
            key={coin.CoinInfo.Id}
            src={`https://www.cryptocompare.com${coin.CoinInfo.ImageUrl}`}
            alt={coin?.CoinInfo?.FullName}
            height="100"
            style={{ marginBottom: 10 }}
          
        />
        <span style={{ fontWeight:"bold", textShadow: "2px 1px 2px rgba(0, 0, 250, 1)",}}  >
          {coin?.CoinInfo?.Name}
          &nbsp;
          <span style={{ fontSize: 22, fontWeight: "bold" }}>
            {coin?.DISPLAY?.[currency]?.PRICE}
          </span>
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: "bold",
              textShadow: "2px 1px 2px rgba(0, 0, 250, 1)"
            }}
          >
            {profit >0 && "+"}
            {(symbol).replace(/[$€]/g, '')}{(coin?.DISPLAY?.[currency]?.CHANGEPCTDAY)}%
          </span>
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };


  return (
    <div className={classes.carrusel}  style={{marginLeft:350,marginRight:350}}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay/>

    </div>
  )
}

export default Carrusel  

 

