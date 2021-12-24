import React, {useEffect, useState} from "react"
import {useHistory} from 'react-router-dom'
import { UseContext } from "../Contract/Context";


        const Page_4 = () => {
        const {web3, Contract} = UseContext()
        const history = useHistory()
        const login = sessionStorage.getItem('login')
        const address = web3.eth.defaultAccount

        const [value, setValue] = useState()
        const [addressTo, setAddressTo] = useState()
        const [codeWord, setCodeWord] = useState()
        const [description, setDescription] = useState()
        const [balance, setBalance] = useState()
        const [transferId, setTransferId] = useState()

            useEffect(() => {
            getBalance()
            },
            [])

    async function getBalance() {
    let balance = await Contract.methods.getBalance(address).call() / 10**18;
    setBalance(balance);
    }


        async function logOutForInterface() {
            web3.eth.personal.lockAccount(address);
            alert("Вы вышли из аккаунта");
        history.push('/Page_1');
        }


    async function createTransfer(e) {
        e.preventDefault();
            try {
            await Contract.methods.createTransfer(addressTo, codeWord, description).send({from:address, value: value * (10**18)})
                const transferId = await Contract.methods.getTransferID().call();
                e.target.reset()
                alert(`ID перевода: ${transferId};
                Кодовое слово: ${codeWord}`);
                getBalance()
                }
                catch(e) {
                alert(e + 'Ошибка в переводе')
                }
                }

        async function confirmTransfer(e) {
             e.preventDefault()
                try {
                    await Contract.methods.confirmTransfer(transferId, codeWord).send({from: address})
                    e.target.reset()
                    alert(`Перевод от пользователя ${address} принят`)
                    getBalance()
                    }
                    catch(e) {
                    alert(e + 'Ошибка в принятие')
                    }
                    }

                        async function cancelTransfer(e) {
                            e.preventDefault()
                                try {
                                    await Contract.methods.cancelTransfer(transferId).send({from: address})
                                    e.target.reset()
                                    alert(`Перевод ${transferId} отменён`)
                                    getBalance()
                                    }
                                    catch(e) {
                                    alert(e + ' Ошибка в отмене перевода')
                                    }
                                    }

                                        async function getHistoryTransaction(e) {
                                            e.preventDefault()
                                                try {
                                                    const array = await Contract.methods.getTransfer(transferId).call()
                                                    console.log(array)
                                                    e.target.reset()
                                                    alert(array[0]+ ' ' + array[1]+ ' ' + array[2] + ' ' + array[3] + ' ' + array[4] + ' ' + array[5] + ' ' )
                                                    //alert(`Отправитель: ${feVar}; Получатель: ${seVar}; Описание ${thVar}; Кодовое слово: ${foVar}; Денег: ${fiVar}; Время перевода: ${siVar}`)
                                                    }
                                                    catch(e) {
                                                    alert(e)
                                                    }

                                                        }
return (
<>
<h1>Login: {login}</h1>
<h1>Address: {address}</h1>
<h1>Баланс: {balance} ETH</h1>
<button onClick={logOutForInterface}>LogOut</button><br/><br/><br/><br/><br/>


    <form onSubmit={createTransfer}>
    <h2>Создать перевод денег.</h2> <br/>
    <input required placeholder='Адрес получателя' onChange={(e) => setAddressTo(e.target.value)}/> <br/>
    <input required placeholder='Сумма' onChange={(e) => setValue(e.target.value)}/><br/>
    <input required placeholder='Кодовое слово' onChange={(e) => setCodeWord(e.target.value)}/><br/>
    <input required placeholder='Описание' onChange={(e) => setDescription(e.target.value)}/><br/>
    <button>Отправить</button>
    </form>

        <form onSubmit={confirmTransfer}>
        <h2>Принять перевод денег.</h2>
        <input required placeholder='Номер транзакции' onChange={(e) => setTransferId(e.target.value)}/>
        <input required placeholder='Кодовое слово' onChange={(e) => setCodeWord(e.target.value)}/>
        <button>Принять</button>
        </form>

            <form onSubmit={cancelTransfer}>
            <h2>Отменить перевод денег.</h2>
            <input required placeholder='Номер транзакции' onChange={(e) => setTransferId(e.target.value)}/>
            <button>Отменить</button>
            </form>

                <form onSubmit={getHistoryTransaction}>
                <h2>История транзакции.</h2>
                <input required placeholder='Номер транзакции' onChange={(e) => setTransferId(e.target.value)}/>
                <button>Узнать</button><br/>
                </form>
                </>
)
}

export default Page_4

