import Countdown from "react-countdown";
import classes from "./Timer.module.css";
import { useEffect, useRef } from "react";
import { timeAction } from "../../store/timeSlice";
import { useDispatch } from "react-redux";

const Timer = (props) => {
  const timeRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.completed) {
      timeRef.current.api.pause();
      const totalSeconds =
        Math.abs(180000 - timeRef.current.state.timeDelta.total) / 1000;
      dispatch(timeAction.setTime({ time: totalSeconds }));
    } else if (!props.completed) {
      timeRef.current.start();
    }
  }, [props.completed]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    // Render a countdown
    // https://www.npmjs.com/package/react-countdown

    if (!completed) {
      return (
        <span className={classes.timer}>
          {minutes}:{String(seconds).padStart(2, "0")}
        </span>
      );
    }
    return <div className={classes.timer}>Times Up!!!</div>;
  };
  return (
    <Countdown
      date={Date.now() + 180000}
      renderer={renderer}
      ref={timeRef}
    ></Countdown>
  );
};
export default Timer;
