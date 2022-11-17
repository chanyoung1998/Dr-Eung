import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Input.module.css";

function Input(props) {
    const handleInput = (field, input) => {
      let copy = {...props.input.state};
      copy[field] = input
      props.input["func"](copy);
    };
  
    const handleFocusBorder = (border) => {
      props.border["func"]({
        ...props.border["state"],
        [border]: true,
      });
    };
  
    const handleBlurBorder = (border, field) => {
      if (!field) {
        props.border["func"]({
          ...props.border["state"],
          [border]: false,
        });
      }
    };
  
    return (
      <div
        className={
          props.border["field"]
            ? `${styles.inputdiv} ${styles.focus}`
            : styles.inputdiv
        }
      >
        <FontAwesomeIcon icon={props.icon} className={styles.i} />
        <div className={styles.div}>
          <h5>{props.name}</h5>
          <input
            type={props.type}
            onChange={(e) => handleInput(props.input["name"], e.target.value)}
            onFocus={() => handleFocusBorder(props.border["name"])}
            onBlur={(e) => handleBlurBorder(props.border["name"], e.target.value)}
          />
        </div>
      </div>
    );
  }

  export default Input;