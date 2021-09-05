import { useSelector } from "react-redux";
import classes from "./Stats.module.css";
import { ReactComponent as TabLogo } from "../../tabLogo.svg";
const Stats = () => {
  const time = useSelector((state) => state.time.time);
  const word = useSelector((state) => state.time.words);
  const accuracy = useSelector((state) => state.display.correct);
  let counter = 0;
  accuracy.forEach((isTrue) => {
    if (isTrue === true) {
      counter++;
    }
  });
  const accuracyStat = ((counter / accuracy.length) * 100).toFixed(2);
  const wpm = Math.floor((60 * word) / time);
  return (
    <div className={classes["stats-container"]}>
      <div className={classes["stats"]}>
        {wpm} Words per minute {accuracyStat}%
      </div>
      <div className={classes["message"]}>
        <p>Hit </p> <TabLogo className={classes["tab"]} />
        <p>to try another quote!</p>
      </div>
    </div>
  );
};

export default Stats;
