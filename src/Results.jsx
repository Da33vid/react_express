import options from "./Options";
const getResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      return 0;
    }
  
    if (options[userChoice].beats.includes(computerChoice)) {
      return 1;
    }
  
    return 2;
  };
  export default getResult;