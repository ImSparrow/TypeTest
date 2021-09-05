import Input from "./components/Input/input";
import classes from "./App.module.css";
import { useDispatch } from "react-redux";
import { displayAction } from "./store/displaySlice";
import MainDisplay from "./components/Display/mainDisplay";
import { useState } from "react";
import Timer from "./components/Timer/Timer";
import Stats from "./components/Display/Stats";

const App = () => {
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const newQuote = () => {
    setReset((prev) => !prev);
    setShowStats(false);
  };
  const completeHandler = () => {
    setShowStats(true);
  };

  return (
    <div className={classes["wordContainer"]}>
      <Timer completed={showStats}></Timer>
      {!showStats && <MainDisplay shouldReset={reset} />}
      {showStats && <Stats></Stats>}
      <Input
        onReset={newQuote}
        completed={completeHandler}
      ></Input>
    </div>
  );
};

export default App;
