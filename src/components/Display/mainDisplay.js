import { useSelector, useDispatch } from "react-redux";
import { displayAction } from "../../store/displaySlice";
import { useEffect } from "react";
import classes from "./mainDisplay.module.css";
import Display from "./display";
import Texts from "../../quotes.json";
const MainDisplay = (props) => {
  const output = useSelector((state) => state.display.output);
  const isCorrect = useSelector((state) => state.display.correct);
  const active = useSelector((state) => state.display.current);
  let counter = -1;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(displayAction.setDefault());
    const randomNumber = Math.floor(Math.random() * Texts.quotes.length + 1);
    const randomText = Texts.quotes[randomNumber].quote;
    dispatch(displayAction.setOutput({ output: randomText }));
  }, [props.shouldReset]);
  const textArray = output.split(" ");
  return (
    <div className={classes["words"]}>
      {textArray.map((word, index) => (
        <div className={classes["word"]} key={index}>
          {word.split("").map((letter) => {
            counter++;
            return (
              <Display
                key={counter}
                text={letter}
                correct={isCorrect[counter]}
                isActive={active === counter}
              ></Display>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MainDisplay;
