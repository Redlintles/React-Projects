import Button from "./Button";
import "./StartScreen.css";


const StartScreen = ({changeScreen}) => {

  return (
    <div className="startscreen">
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      <Button txt="Começar o Jogo" click={changeScreen} />
    </div>
  )
}

export default StartScreen