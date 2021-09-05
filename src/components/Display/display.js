import classes from "./display.module.css";
const Display = (props) => {
  let correct = "letter ";
  let active = "";
  if (
    props.correct === null ||
    props.correct === undefined ||
    props.correct === "neutral"
  ) {
    correct = "neutral";
  } else {
    if (props.correct) {
      correct = "true";
    } else {
      correct = "false";
    }
  }

  if (props.isActive) {
    active = "active";
  } else {
    active = "";
  }
  if (props.text === " ") {
    <p className={`${classes[correct]} ${classes[active]}`}>&nbsp</p>;
  }
  return (
    <p className={`${classes[correct]} ${classes[active]}`}>{props.text}</p>
  );
};

export default Display;
