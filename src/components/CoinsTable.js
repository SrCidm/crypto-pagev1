import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { Cripto } from '../ContextCripto';
import {
    Container,
    LinearProgress,
    Pagination,
    Table, TableBody,
    TableCell, TableContainer,
    TableHead, TableRow,
    TextField, ThemeProvider,
    Typography, createTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: "#14161a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#131111",
        },
        fontFamily: "monospace",
        fontWeight:"bold",
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color:"rgb(0, 150, 250)"
        }
    },
    container: {
        maxWidth: "100%",
        margin: "auto",
    }
}))

const CoinsTable = () => {
    const navigate = useNavigate();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currency,symbol } = useContext(Cripto);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    

    const fetchCoins = async () => {
        setLoading(true);
        const response = await fetch(CoinList(currency));
        const  data  = await response.json();
        
        setCoins(data.Data);
        setLoading(false);


    };

    console.log(coins);

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line
    }, [currency])
    
    const darkTheme = createTheme({
        palette: {
          mode: "dark",
        },
    });
    
    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                (coin.CoinInfo?.FullName).toLowerCase().includes(search) ||
                (coin.CoinInfo?.Name).toLowerCase().includes(search)
        );
    };

    const classes = useStyles();
    
    return (
        <ThemeProvider theme={darkTheme}>
            <Container className={classes.container} style={{ textAlign: "center" }}>
                <Typography variant="h4" style={{
                    margin: 18,
                    fontFamily: "monospace",
                    color: "rgb(0, 150, 250)",
                    textShadow: "2px 1px 2px rgba(0, 0, 200, 1)"
                }}
                onChange={(e)=>setSearch(e.target.value)}>
                    CryptoCurrency Prices by Market Cap
                </Typography>
                <TextField label="Find you Crypto Currency..." variant="outlined" style={{ marginBottom: 20, width: "100%" }} />
                <TableContainer>
                    {
                        loading ? (
                            <LinearProgress style={{ background: "rgb(0, 150, 250)" }} />)
                            : (
                                <Table>
                                    <TableHead style={{ backgroundColor: "rgb(0, 150, 250)"}}>
                                        <TableRow>
                                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                                <TableCell
                                                style={{
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    fontFamily: "monospace",
                                                }}
                                                key={head}
                                                align={head === "Coin" ? undefined : "right"}>
                                                {head === "Coin" ? (
                                                    <div style={{ marginRight: "66px", paddingRight: "240px" }}>
                                                        {head}
                                                    </div>
                                                ) : (
                                                    head
                                                )}
                                            </TableCell>
                                            ))}
                                        </TableRow>

                                    </TableHead>
                                    <TableBody>
                                        {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                                            const profit = row.DISPLAY?.[currency]?.CHANGEPCTDAY > 0;

                                            return (
                                                <TableRow
                                                    onClick={() => navigate(`/coins/${row.CoinInfo.Name}`)}
                                                    className={classes.row}
                                                    key={row.CoinInfo.Id}>
                                                    <TableCell component="th" scrope="row" style={{
                                                        display: "flex",
                                                        gap:15,
                                                    }}>
                                                        <img
                                                            src={`https://www.cryptocompare.com${row.CoinInfo.ImageUrl}`}
                                                            alt={row.CoinInfo.Name}
                                                            height="50"
                                                            cursor="pointer"
                                                            style={{ marginBottom: 10}}>
                                                        </img>
                                                        <div
                                                            style={{ display: "flex", flexDirection: "column" }}>
                                                            <span
                                                                style={{
                                                                    textTransform: "uppercase",
                                                                    fontSize: 22,
                                                                }}>
                                                                {row.CoinInfo.Name}
                                                            </span>
                                                            <span style={{
                                                                color:"darkgrey"
                                                            }}>{row.CoinInfo.FullName}
                                                            </span>
                                                        </div>

                                                    </TableCell>
                                                    <TableCell
                                                        align="right" style={{fontWeight:"bold"}}>
                                                        {(symbol).replace(/[$€]/g, '')}{(row?.DISPLAY?.[currency]?.PRICE)}

                                                    </TableCell>
                                                    <TableCell
                                                        align="right"
                                                        style={{
                                                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                            fontWeight:"bold",
                                                        }}>
                                                        {profit && "+"}
                                                        {(symbol).replace(/[$€]/g, '')}{(row?.DISPLAY?.[currency]?.CHANGEPCTDAY)}%

                                                    </TableCell>
                                                    <TableCell align='right'>
                                                        {row?.DISPLAY?.[currency]?.MKTCAP}

                                                    </TableCell>

                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            )
                    }
                </TableContainer>
                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent:"center",
                }}
                classes={{ul:classes.pagination}}
                count={parseInt((handleSearch()?.length / 10).toFixed(0))}
                onChange={(_, value)=>{
                    setPage(value);
                    window.scroll(0,450);
                }}    
                />
            </Container>
        </ThemeProvider>
    );
}

export default CoinsTable;




