import React, { createContext, useContext, useEffect, useState } from 'react'

export const Cripto = createContext()


const ContextCripto = ({children}) => {
  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("$")

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if(currency === "EUR") setSymbol("€")
  },[currency])
  
  return (
      <Cripto.Provider value={{currency, symbol, setCurrency}}>
          {children}
    </Cripto.Provider>
  )
}

export default ContextCripto


export const CriptoState = () => {
  useContext(Cripto)
}