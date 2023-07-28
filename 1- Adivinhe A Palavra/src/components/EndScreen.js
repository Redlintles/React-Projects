import React from 'react';
import "./EndScreen.css";
import Button from './Button';


const EndScreen = ({changeScreen}) => {
  return (
    <div className='endscreen'>
      <h2 className="endscreen__title">Fim de Jogo!</h2>
      <p className="endscreen__score">A sua pontuação foi de: <span>{sessionStorage.getItem("score")}</span> Pontos</p>
      <Button txt="Jogar de novo?" click = {changeScreen}/>
    </div>
    
  )
}

export default EndScreen