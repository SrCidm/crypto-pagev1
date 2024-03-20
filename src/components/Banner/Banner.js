import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography } from '@mui/material';
import './../../App.css'
import Carrusel from './Carrusel';


const useStyles = makeStyles(() => ({
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent:"space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign:"center",
    },
}));



const Banner = () => {
    const classes = useStyles();
    return (
        <div id="banner">
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant="h2" style={{
                        fontWeight: "bold",
                        marginBottom: -40,
                        fontFamily: "monospace",
                        textShadow: "2px 1px 2px rgba(0, 150, 250, 1)",
                    }}>
                        CryptoToday
                    </Typography>
                    <Typography variant="subtitle2" style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        fontFamily: "monospace",
                        color: "rgb(0, 150, 250)",
                        fontSize: "1rem",
                        textShadow: "2px 1px 2px rgba(0, 0, 200, 1)",
                    }}>
                        The future of finance is in your hands.
                    </Typography>
                </div>
            </Container>
            <Carrusel />
        </div>);
}

export default Banner