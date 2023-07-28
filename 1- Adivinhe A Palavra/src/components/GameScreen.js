import React from "react";

import Button from "./Button";
import Letter from "./Letter";

import "./GameScreen.css";

import { useState } from "react";
import { wordsList } from "../data/words.js"

const GameScreen = ({ changeScreen }) => {

  function chooseRandomWord() {
    const allCats = Object.keys(wordsList);
    const randomCat = allCats[Math.floor(Math.random() * allCats.length)]
    const randomCatList = wordsList[randomCat];
    let randomWord = randomCatList[Math.floor(Math.random() * randomCatList.length)];
    randomWord = randomWord.toLowerCase();
    return [randomCat, randomWord];

  }

  let [randomWord, setRandomWord] = useState(chooseRandomWord());
  let wordLetters = randomWord[1].split("");
  wordLetters = wordLetters.map((i) => i.toLowerCase());

  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(3);

  const [letter, setLetter] = useState("");
  const [word, setWord] = useState("");

  const [usedLetters, setUsedLetters] = useState([]);

  function reset() {
    const display = document.querySelector(".gamescreen__display");
    const children = Array.from(display.children);
    children.forEach((item) => {
      item.classList.add("letter--hidden");
    })
    setRandomWord(chooseRandomWord());
    setUsedLetters([]);
  }


  function revealLetters() {
    const display = document.querySelector(".gamescreen__display");
    const children = Array.from(display.children);
    children.forEach((item)=> {
      item.classList.remove("letter--hidden");
    })
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (usedLetters.includes(letter) || letter === "") {
      return
    } else {
      usedLetters.push(letter);
      setUsedLetters(usedLetters);
    }

    const display = document.querySelector(".gamescreen__display");
    const children = Array.from(display.children);
    const toHit = Array.from(document.querySelectorAll(".letter--hidden")).length - 1;

    let hit = false;
    let multiplier = 0;

    if (toHit) {
      children.forEach((item) => {
        if (item.textContent === letter) {
          item.classList.remove("letter--hidden");
          hit = true;
          multiplier++;
        }
      })
    } else {
      hit = true;
      revealLetters();
      setTimeout(reset,1000);
    }

    if (!hit) {
      setTries((prev) => { return prev - 1 });

      if (tries <= 1) {
        sessionStorage.setItem("score", score.toString());
        changeScreen();
      }
    } else {
      setScore((prev) => { return prev + (100 * multiplier) });
    }

    e.target.firstChild.value = "";
  }

  function handleTry(e) {
    e.preventDefault();
    e.target.firstChild.value = "";
    console.log(word,randomWord[1]);
    if (word === randomWord[1]) {
      setScore((prev) => {return prev + 500});
      revealLetters();
      setTimeout(reset,1000)
    } else {
      setTries((prev) => { return prev - 1 });
    }
  }

  function inputCallback(e) {
    setLetter(e.target.value.toLowerCase());
  }


  return (
    <div className="gamescreen">
      <span className="gamescreen__score">Pontuação: {score}</span>
      <h2 className="gamescreen__title">Adivinhe a Palavra</h2>
      <p className="gamescreen__text">Dica sobre a palavra: <span>{randomWord[0]}</span></p>
      <span className="gamescreen__text">Você ainda tem <span>{tries}</span> tentativa(s)</span>

      <div className="gamescreen__overflow">
        <div className="gamescreen__display">
          {wordLetters.map((item, i) => (
            <Letter key={i} char={item} />
          ))}
        </div>
      </div>



      <div className="gamescreen__controller">

        <div className="controller__container">
          <span className="gamescreen__text">Tente adivinhar uma letra:</span>
          <form action="" className="gamescreen__form" onSubmit={handleSubmit}>
            <input type="text" maxLength="1" className="letter letter--skin" onChange={inputCallback} />
            <button type="submit" className="btn btn--skin">Jogar!</button>
          </form>
        </div>

        <div className="controller__container">
          <span className="gamescreen__text">Tente Adivinhar A Palavra:</span>
          <form action="" className="gamescreen__try" onSubmit={handleTry}>
            <input type="text" name="" id="" className="letter--skin" onChange={(e) => { setWord(e.target.value.toLowerCase()) }} />
            <button type="submit" className="btn btn--skin">Tentar!</button>
          </form>
        </div>


      </div>

      <div className="gamescreen__used-letters">
        <span className="gamescreen__text">Letras Já Utilizadas:</span>
        <ul className="used-letters__list">
          {usedLetters.map((letter, key) => (
            <li key={key}>{letter}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default GameScreen