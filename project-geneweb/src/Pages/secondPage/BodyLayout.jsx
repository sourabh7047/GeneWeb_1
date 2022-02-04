import classes from "./BodyLayout.module.css";
import PaginationComponent from "./PaginationComponent";

export default function BodyLayout(props) {
  // eslint-disable-next-line react/jsx-no-duplicate-props

  return (
    <div className={classes.bodyLayout}>
      {props.children}
    </div>
  );
}

// ss-container className={classes.ssContainer}
