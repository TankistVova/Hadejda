import React, { useState } from "react";
import {useHistory,Link} from 'react-router-dom'
import { UseContext } from "../Contract/Context";
import "./vid.css"


const Page_3 = () => {

/////////////////////////////////////////////////////////////////////////////////////////////
    const {web3, Contract} = UseContext()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState()
    const history = useHistory()
    sessionStorage.setItem('login', login)
    sessionStorage.setItem('address', address)
/////////////////////////////////////////////////////////////////////////////////////////////

//--------------------------------->>>>>Авторизация<<<<<<-----------------------------------
    async function authorization (e)  {
        e.preventDefault();
        try{
            const address = await Contract.methods.getAddr(login).call()//обращение к контракту (функция getAddr )
                await web3.eth.personal.unlockAccount(address, password, 111111111)//обращение к гэсу (разблокировка аккаунта)
                web3.eth.defaultAccount = address
                setAddress(address)
                history.push('/Page_4')
            }
        catch(e) {
            alert(e) 
        }
    }
//---------------------------->>>>>>Верстка Авторизации<<<<<------------------------------------
        return (
            <div className= "container">
            <h3> Авторизация </h3>
            <input required placeholder='Ваш Логин' value={login} onChange={(e) => setLogin(e.target.value)}/>  <br/>
            <input required placeholder='Ваш Пароль' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br/>
            <button onClick={authorization}>Авторизация</button><br/>
            <Link to ="./Page_1"><button className = "button">Назад</button></Link>
            </div>
        )
}
export default Page_3