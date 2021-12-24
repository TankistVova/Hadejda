import React, {useState} from "react"
import {Context} from "./Contract/Context"
import {UserList} from "./Contract/UserList"
import { BrowserRouter as Router} from "react-router-dom"
import Web3 from "web3"
import Routers from "./router"

const App = () => {
  const [web3] = useState (new Web3("http://127.0.0.1:8545"))
  const Addr = "0xf3e37abad2bd1db8613b9e776f09a84548f215ed" // Адрес контракта 
  const [Contract] = useState(new web3.eth.Contract(UserList, Addr))

  return (
    <Router>
        <Context.Provider value= {{web3, Contract}}>
        <Routers/>
      </Context.Provider>
    </Router>
  ) 
}
export default App;
