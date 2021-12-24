import React, { useState } from "react";
import {useHistory, Link} from 'react-router-dom'
import { UseContext } from "../Contract/Context";
import "./vid.css"


const Page_2 = () => {

///////////////////////////////////////////////////////////////////////////////////////////
                                                                                            
    const {web3, Contract} = UseContext()                                                      
    const [login, setLogin] = useState('')                                                         
    const [password, setPassword] = useState('')                                                      
    const history = useHistory()                                                                   
    sessionStorage.setItem('login', login)                                                      
                                                                                            
//////////////////////////////////////////////////////////////////////////////////////////


//---------------------------------->>>>>>>Регистрация<<<<<------------------------------
    async function Registration (e)  {
            e.preventDefault();
            const address = await web3.eth.personal.newAccount(password)//обращение к гэсу (создание аккаунта)
            const accounts = await web3.eth.personal.getAccounts()//обращение к гэсу (список аккаунтов)
            await web3.eth.personal.unlockAccount(accounts[0], "123", 11111110)//обращение к гэсу (создание аккаунта)
            try {
                Contract.methods.createUser(address, login, password).send({ from: accounts[0]})//обращение к контракту (обращение к функции createUser)
                await web3.eth.sendTransaction({from: accounts[0], to: address, value: 50 * (10**18) })//обращение к гэсу (создание транзакции)
                web3.eth.defaultAccount = address
                alert('Аккаунт создан')
                history.push('/Page_1')
            
        }
        catch(e) {
            alert(e)
            alert('Аккаунт не создан')
        }

//---------------------------------->>>>>>>>>Верстка Регистрации<<<<<<---------------------

    }
        return (
            <div className="container">
            <h3> Регистрация </h3>
            <input required placeholder='Придумайте Логин' value={login} onChange={(e) => setLogin(e.target.value)}/>  <br/>
            <input required placeholder='Придумайте Пароль' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={Registration}>Зарегистрироваться</button><br/>
            <Link to="./Page_1"><button className="button">Назад</button></Link>

            </div>
        )
}
export default Page_2