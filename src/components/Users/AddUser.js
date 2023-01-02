import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "./AddUser.module.css";

import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [errorText, setErrorText] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = Object.fromEntries(data.entries());
    newUser.age = +newUser.age;
    // validation
    if (newUser.username.trim().length === 0) {
      setErrorText("Please input a username");
      return;
    }
    if (isNaN(newUser.age) || newUser.age <= 0) {
      setErrorText("Please input a positive integeric age");
      return;
    }
    props.submit(newUser);
    event.target.reset();
  };

  return (
    <>
      {!!errorText && (
        <ErrorModal text={errorText} hide={() => setErrorText("")} />
      )}
      <Card className={`${styles.input} ${!!errorText && styles.invalid}`}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" />
          <label htmlFor="age">Age (Years)</label>
          <input type="number" name="age" id="age" />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
