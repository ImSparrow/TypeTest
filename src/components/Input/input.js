import { useSelector, useDispatch } from "react-redux";
import { displayAction } from "../../store/displaySlice";
import { timeAction } from "../../store/timeSlice";
import { useState } from "react";
import classes from "./input.module.css";
const Input = (props) => {
  const text = useSelector((state) => state.display.currentWord);
  const userInput = useSelector((state) => state.display.input);
  const current = useSelector((state) => state.display.current);
  const output = useSelector((state) => state.display.output);
  const threshold = useSelector((state) => state.display.wordThreshold);

  const [didBackSpace, setDidBackSpace] = useState(false);
  const [didSpace, setDidSpace] = useState(false);
  const [wordCounter, setWordCounter] = useState(0);
  const dispatch = useDispatch();
  const textArray = output.split(" ");

  dispatch(
    displayAction.setCurrentWord({ currentWord: textArray[wordCounter] })
  );

  // Backspace handler
  const keyHandler = (event) => {
    if (event.keyCode === 8) {
      if (threshold + userInput.trim().length - 1 >= threshold) {
        dispatch(
          displayAction.neutral({
            index: threshold + userInput.trim().length - 1,
          })
        );

        dispatch(displayAction.decreaseCurrentBy({ amount: 1 }));
      }

      setDidBackSpace(true);
      if (userInput.trim().length === 0) {
        setDidBackSpace(false);
      }
    }
    // Spacebar handler
    if (event.keyCode === 32) {
      if (text !== undefined) {
        setDidSpace(true);
        dispatch(
          displayAction.increaseWordThresholdBy({ wordThreshold: text.length })
        );
        // find the difference in characters and skips to the beginning of the next word
        const increaseBy = Math.abs(userInput.length - text.length);
        if (userInput.length === 0) {
          dispatch(displayAction.setCurrent({ current: current + increaseBy }));
        } else if (increaseBy !== 0) {
          dispatch(
            displayAction.setCurrent({ current: current + increaseBy + 1 })
          );
        } else {
          dispatch(
            displayAction.setCurrent({ current: current + increaseBy + 1 })
          );
        }

        dispatch(
          displayAction.setCurrentWord({
            currentWord: textArray[wordCounter + 1],
          })
        );
        setWordCounter((prev) => prev + 1);
        dispatch(displayAction.setInput({ input: "" }));
      } else if (text === undefined) {
        // When the user hits space when they are done this will run
        dispatch(timeAction.setWord({ words: wordCounter }));
        setWordCounter(0);
        setDidBackSpace(false);
        props.completed();
      }
    }
    // tab handler
    if (event.keyCode === 9) {
      event.preventDefault();
      setWordCounter(0);
      setDidBackSpace(false);
      props.onReset();
    }
  };
  const inputHandler = (event) => {
    // Checking the amount of characters to the output minus spaces
    // This completes the typing test when the user is finished writing
    if (current === output.length - textArray.length - 1) {
      dispatch(timeAction.setWord({ words: wordCounter }));
      setWordCounter(0);
      setDidBackSpace(false);
      props.completed();
    }
    if (text !== undefined) {
      if (event.target.value.length <= text.length) {
        const word = event.target.value.trim();
        const currentInputLength = word.length - 1;
        dispatch(displayAction.setInput({ input: word }));
        if (!didBackSpace && !didSpace) {
          dispatch(
            displayAction.setCurrent({
              current: threshold + currentInputLength,
            })
          );
          if (word.trim().length > 0) {
            if (
              word.charAt(currentInputLength) ===
              text.charAt(currentInputLength)
            ) {
              dispatch(
                displayAction.correct({ index: threshold + currentInputLength })
              );
            } else {
              dispatch(
                displayAction.incorrect({
                  index: threshold + currentInputLength,
                })
              );
            }
          }
        }
        setDidSpace(false);
        setDidBackSpace(false);
      }
    }
  };
  return (
    <div className={classes["input--container"]}>
      <input
        value={userInput}
        onChange={inputHandler}
        onKeyDown={keyHandler}
        autoFocus
      ></input>
    </div>
  );
};

export default Input;
