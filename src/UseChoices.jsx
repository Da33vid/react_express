import { useState, useEffect } from "react";
import options from "./Options";
import getResult from "./Results";
function useChoices() {
    const [userChoice, setUserChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [userMessage, setUserMessage] = useState(null);
    const [computerMessage, setComputerMessage] = useState(null);
    const [result, setResult] = useState(null);
    const [disabled, setDisabled] = useState(false);
  
    useEffect(() => {
      if (userChoice !== null) {
        setUserMessage(
          `Has elegido ${options[userChoice]?.emoji} - ${options[userChoice]?.name}`
        );
      }
    }, [userChoice]);
  
    useEffect(() => {
      if (computerChoice !== null) {
        setComputerMessage(
          `El ordenador ha elegido ${options[computerChoice]?.emoji} - ${options[computerChoice]?.name}`
        );
      }
    }, [computerChoice]);
  
    const handlePlay = (choice) => {
      setUserChoice(choice);
      setDisabled(true);
      const randomChoice = Math.floor(Math.random() * 5);
  
      setTimeout(() => {
        setComputerChoice(randomChoice);
      }, 1500);
  
      setTimeout(() => {
        setResult(getResult(choice, randomChoice));
      }, 3000);
  
      clearTimeout();
    };
  
    const reset = () => {
      setUserChoice(null);
      setComputerChoice(null);
      setUserMessage(null);
      setComputerMessage(null);
      setResult(null);
      setDisabled(false);
    };
  
    return {
      userChoice,
      computerChoice,
      userMessage,
      computerMessage,
      result,
      disabled,
      handlePlay,
      reset,
    };
  }
  export default useChoices;