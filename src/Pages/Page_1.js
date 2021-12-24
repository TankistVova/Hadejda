import React from "react";
import { useHistory } from "react-router-dom";
import './vid.css'

/////////////////////////////////////////////////

    const Page_1 =()=>{
        const history = useHistory()

            //Функция перехода на Page_2(Регистрация)
            async function perehod1(){
                history.push('/Page_2')
            }

                //Функцтя перехлда на Page_3(Авторизация)
                async function perehod2(){
                    history.push('/Page_3')
                }

//-------------------------------->>>>>ГЛАВНАЯ СТРАНИЦА<<<<<<-------------------------

                return(
                    <div className = "container">
                        <h3>Регистрация/Вход</h3>
                        <button style = {{width:"200px"}} onClick={perehod1}>Регистрация</button>
                        <button style = {{width:'200px'}} onClick={perehod2}>Вход</button>
                    </div>
                )
    }
export default Page_1